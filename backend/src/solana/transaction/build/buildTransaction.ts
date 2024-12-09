import { Address, address } from '@solana/addresses';
import { pipe } from '@solana/functional';
import { 
  getBase64EncodedWireTransaction,
  createTransactionMessage,
  setTransactionMessageFeePayer, 
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  compileTransaction,
  compressTransactionMessageUsingAddressLookupTables,
  Rpc,
  AddressesByLookupTableAddress,
  GetMultipleAccountsApi,
  fetchJsonParsedAccounts,
} from '@solana/web3.js';
import { prepareComputeBudget } from './prepare';
import { TransactionData } from '../types';
import { getTransactionInstructions } from './instructions';
import { rpc } from '../../rpc';

export async function buildTransaction(
  data: TransactionData, 
  priorityLevel?: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH"
): Promise<string> {
  try {
    const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
    const { instructions, lookupTableAddresses } = await getTransactionInstructions(data);
    const lookupTableAccounts = await fetchLookupTables(lookupTableAddresses as Address[], rpc);

    const finalInstructions = await prepareComputeBudget(
      instructions, 
      data.signer,
      lookupTableAccounts,
      priorityLevel
    );

    const fromPubkey = address(data.signer);
    const message = pipe(
      createTransactionMessage({ version: 0 }),
      tx => setTransactionMessageFeePayer(fromPubkey, tx),
      tx => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      tx => appendTransactionMessageInstructions(finalInstructions, tx),
    );

    const messageWithLookupTables = compressTransactionMessageUsingAddressLookupTables(message, lookupTableAccounts);
    const compiledMessage = compileTransaction(messageWithLookupTables);
    
    return getBase64EncodedWireTransaction(compiledMessage).toString();

  } catch (error) {
    console.error("Error building transaction:", error);
    throw error;
  }
}

type FetchedAddressLookup = {
  addresses: Address[];
};

async function fetchLookupTables(
  lookupTableAddresses: Address[],
  rpc: Rpc<GetMultipleAccountsApi>,
): Promise<AddressesByLookupTableAddress> {
  if (lookupTableAddresses.length === 0) {
    return {};
  }

  const fetchedLookupTables = await fetchJsonParsedAccounts<FetchedAddressLookup[]>(
      rpc,
      lookupTableAddresses,
  );

  return fetchedLookupTables.reduce<AddressesByLookupTableAddress>((acc, lookup: any) => {
      return {
          ...acc,
          [lookup.address]: lookup.data.addresses,
      };
  }, {});
}