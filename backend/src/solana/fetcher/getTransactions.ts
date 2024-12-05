import { address as PublicKey } from '@solana/addresses';
import { Transaction } from '@solana/transactions';
import { config } from "../../lib/config";

type TransactionType = 'payment' | 'unknown' | 'failed';

export async function getTransactions(userAddress: string, transactionType?: TransactionType): Promise<any[]> {
  try {
    // get db payments
    return Promise.resolve([]);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}