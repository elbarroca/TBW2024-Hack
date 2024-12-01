import { Base64EncodedWireTransaction } from '@solana/transactions';
import { config } from '../config';

export async function sendTransaction(transaction: string): Promise<string> {
    return await config.RPC
        .sendTransaction(transaction as Base64EncodedWireTransaction, {
            encoding: 'base64',
            preflightCommitment: 'processed',
            skipPreflight: false,
        })
        .send();
}