import { VersionedTransaction } from "@solana/web3.js";
import { config } from "../config";

export async function confirmTransaction(transaction: string): Promise<string> {
  const transactionBuffer = Buffer.from(transaction, 'base64');
  const deserializedTransaction = VersionedTransaction.deserialize(transactionBuffer);
  const serializedTransaction = deserializedTransaction.serialize();
  
  const maxRetries = 5;
  let retries = 0;
  let signature: string;

  while (retries <= maxRetries) {
    signature = await config.RPC_LANDER.sendRawTransaction(serializedTransaction, {
      skipPreflight: true,
      maxRetries: 0,
    });

    try {
      const confirmedSignature = await Promise.race([
        confirmSignature(signature),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
      ]);
      console.log(`${new Date().toISOString()} Transaction successfully confirmed: ${confirmedSignature}`);
      return confirmedSignature;
    } catch (error: any) {
      if (error.message === "Timeout") {
        console.log(`${new Date().toISOString()} Transaction confirmation timed out, retrying...`);
      } else if (retries >= maxRetries) {
        console.error(`${new Date().toISOString()} Transaction confirmation failed after ${maxRetries + 1} attempts: ${signature}`);
        throw error;
      } else {
        console.log(`${new Date().toISOString()} Transaction failed, retrying...`);
      }
      retries++;
    }
  }

  throw new Error("Transaction confirmation failed");
}

async function confirmSignature(signature: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const handleResult = (result: any, context: any) => {
      if (result.err) {
        reject(new Error(`Transaction failed: ${result.err.toString()}`));
      } else {
        resolve(signature);
      }
    };

    config.RPC_LANDER.onSignature(signature, handleResult, 'confirmed');
  });
}