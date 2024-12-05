import { address } from '@solana/addresses';
import { pipe } from '@solana/functional';
import { 
  getBase64EncodedWireTransaction,
  createTransactionMessage,
  setTransactionMessageFeePayer, 
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  compileTransaction,
} from '@solana/web3.js';
import { prepareComputeBudget } from '../prepare';
import { TransactionData } from '../types';
import { getTransactionInstructions } from './instructions';
import { rpc } from '../../rpc';

export async function buildTransaction(
  data: TransactionData, 
  priorityLevel?: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH"
): Promise<string> {
  try {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const instructions = await getTransactionInstructions(data);
    const finalInstructions = await prepareComputeBudget(
      instructions, 
      data.signer,
      priorityLevel
    );
    const fromPubkey = address(data.signer);

    const message = pipe(
      createTransactionMessage({ version: 0 }),
      tx => setTransactionMessageFeePayer(fromPubkey, tx),
      tx => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      tx => appendTransactionMessageInstructions(finalInstructions, tx)
    );
    
    const compiledMessage = compileTransaction(message);
    return getBase64EncodedWireTransaction(compiledMessage);

  } catch (error) {
    console.error("Error building transaction:", error);
    throw error;
  }
}