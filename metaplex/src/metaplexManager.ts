import { Keypair, PublicKey } from "@solana/web3.js";
import { Elysia } from "elysia";
import { config } from "./config";
import { confirmTransaction } from "./solana/confirmTransaction";
import { prepareTransaction } from "./solana/prepareTransaction";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-core-candy-machine";
import { toWeb3JsInstruction, fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { generateSigner, publicKey, GenericFile, signerIdentity, createNoopSigner, createSignerFromKeypair } from '@metaplex-foundation/umi';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { createGenericFile } from '@metaplex-foundation/umi';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { create, createCollection, fetchCollection, mplCore, transfer } from "@metaplex-foundation/mpl-core";
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';

const base64ToGenericFile = (base64String: string, fileName: string): GenericFile => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return createGenericFile(bytes, fileName, {
    contentType: 'image/png',
    extension: 'png',
  });
};

const umi = createUmi(config.RPC.rpcEndpoint)
  .use(mplCore())
  .use(dasApi())
  .use(irysUploader())

  const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(config.FILES_KEYPAIR));
  umi.use(signerIdentity(signer));

export const metaplexManager = new Elysia({
  prefix: '/metaplex',
})
  .get('/getAssets', async ({ query }: { query: { user: string } }) => {
    try {
      const user = new PublicKey(query.user!);
      const userInfo = await config.RPC.getAccountInfo(user);
      if (!userInfo) return { error: 'Ensure you have SOL and USDC on your wallet', status: 404 };
      
      const assets = await umi.rpc.getAssetsByOwner({
        owner: publicKey(user)
      });

      const simplifiedAssets = assets.items.map(asset => ({
        id: asset.id.toString(),
        owner: asset.ownership.owner.toString(),
        content: {
          json_uri: asset.content.json_uri,
          metadata: {
            name: asset.content.metadata.name,
            description: asset.content.metadata.description || '',
            image: asset.content.files?.[0]?.uri || '',
          }
        }
      }));

      return { 
        data: { 
          assets: simplifiedAssets 
        }, 
        statusCode: 200 
      };
    } catch (e: any) {
      console.error(e.message);
      return { error: e.message, status: 500 };
    }
  })

  .post('/create', async ({ body }: { 
    body: { 
      imageFile: string,
      name: string,
      description: string,
      owner: string
    }
  }) => {
    try {
      const { imageFile, name, description, owner } = body;
      const ownerPubkey = new PublicKey(owner);

      // Convert base64 image to GenericFile
      const genericFile = base64ToGenericFile(imageFile, `${name}.png`);
      const [imageUri] = await umi.uploader.upload([genericFile]);
      
      const uri = await umi.uploader.uploadJson({
        name,
        description,
        image: imageUri,
      });

      // Create a signer from the owner public key
      const collectionSigner = generateSigner(umi);
      
      const createCollectionInstructions = createCollection(umi, {
        collection: collectionSigner,
        name,
        uri,
        payer: createNoopSigner(publicKey(ownerPubkey))
        
        /*
export type AuthorityManagedPluginArgsV2 = ({
    type: 'Royalties';
} & RoyaltiesArgs) | ({
    type: 'UpdateDelegate';
} & UpdateDelegateArgs) | ({
    type: 'Attributes';
} & AttributesArgs) | ({
    type: 'MasterEdition';
} & MasterEditionArgs) | {
    type: 'ImmutableMetadata';
    type: 'VerifiedCreators';
} & VerifiedCreatorsArgs);
        */
      }).getInstructions().map(ix => toWeb3JsInstruction(ix));

      // Prepare transaction with instructions
      const transaction = await prepareTransaction(
        createCollectionInstructions, 
        ownerPubkey
      );

      return { 
        data: {
          transaction, 
          collectionMint: collectionSigner.publicKey, 
        },
        statusCode: 200 
      };

    } catch (error: any) {
      console.error('Error creating collection:', error);
      return { message: 'error', error: error.message, statusCode: 500 };
    }
  })

  .post('/mint', async ({ body }: { 
    body: { 
      candyMachineId: string,
      signer: string,
    }
  }) => {
    try {
      const { candyMachineId, signer } = body;
      const signerPubkey = new PublicKey(signer);
      const collection = await fetchCollection(
        umi, 
        publicKey(candyMachineId)
      );
      const nftMint = generateSigner(umi);

      const instructions = create(umi, {
        asset: nftMint,
        collection,
        name: collection.name,
        uri: collection.uri,
      }).add(transfer(umi, {
        collection,
        newOwner: publicKey(signerPubkey),
        payer: createNoopSigner(publicKey(signerPubkey)),
        authority: createSignerFromKeypair(umi, owner)
      })).getInstructions().map(ix => toWeb3JsInstruction(ix));

      const transaction = await prepareTransaction(
        instructions,
        signerPubkey
      );

      return { 
        data: {
          transaction, 
          mintAddress: base58.serialize(nftMint.publicKey),
        },
        statusCode: 200 
      };

    } catch (error: any) {
      console.error('Error creating mint transaction:', error);
      return { message: 'error', error: error.message, statusCode: 500 };
    }
  })

  .post('/sendTransaction', async ({ body }: { body: { transaction: string } }) => {
    try {
      const signature = await confirmTransaction(body.transaction);
      return { data: { signature }, statusCode: 200 };
    } catch (error: any) {
      console.error('Error sending transaction:', error);
      return { error: error.message, statusCode: 500 };
    }
  })
  
  /*.post('/accountsListener', async ({ body, headers }) => {
    try {
        const authToken = headers['authorization'];
        if (!authToken || authToken !== process.env.RPC_KEY) {
            console.error(`Unauthorized request`);
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const signatures = (body as any).flatMap((x: any) => x.transaction.signatures);
        const confirmationPromises = signatures.map((signature: string) => getConfirmation(signature));
        const confirmationResults = await Promise.all(confirmationPromises);
        const confirmedSignatures = signatures.filter((_: string, index: number) => confirmationResults[index] !== null);
    
        if (confirmedSignatures.length === 0) {
          console.log('No transactions were confirmed');
          return { success: false, message: 'No transactions were confirmed' };
        }
    
        console.log(`Confirmed signatures: ${confirmedSignatures}`);
        for (const signature of signatures) {
          const response = await fetchTransaction(signature);
          if (!response) throw new Error('Transaction not found');
      
          const { transaction: { message }, meta, blockTime } = response;
          if (!message || !meta) throw new Error('Transaction data not found');
      
          const versionedTransaction = new VersionedTransaction(message);    
          const mangoEvents = parseTransaction(versionedTransaction, signature, blockTime);
      
          for (const mangoEvent of mangoEvents) {
            console.log('mangoEvent from accountListener', mangoEvent)
            saveMangoEvent(mangoEvent);
            broadcastUpdate(mangoEvent);
          }
        }

        return { success: true, message: 'Transactions processed successfully' };
    } catch (error) {
        console.error('Failed to process transactions:', error);
        return { success: false, message: 'Failed to process transactions' };

});
    }*/
async function getConfirmation(
  signature: string,
  maxRetries: number = 10,
  retryDelay: number = 2000
): Promise<string | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
      const result = await config.RPC.getSignatureStatus(signature, {
          searchTransactionHistory: true,
      });
      const status = result.value?.confirmationStatus;
  
      if (status === 'confirmed' || status === 'finalized') {
          return status;
      }
  
      console.log(`Attempt ${attempt + 1}: Transaction not yet confirmed. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
  }

  console.error(`Transaction not confirmed after ${maxRetries} attempts.`);
  return null;
}