import { 
  type FullySignedTransaction, 
  type TransactionWithBlockhashLifetime,
  getBase64Encoder,
  getTransactionDecoder
} from '@solana/web3.js';
import { updatePaymentStatus } from '../../db/payment';
import { sendAndConfirmTransaction } from './confirm';

export async function sendTransaction(transaction: string): Promise<string> {
  try {
    // First decode base64 to bytes
    const base64Encoder = getBase64Encoder();
    const transactionBytes = base64Encoder.encode(transaction);

    const transactionDecoder = getTransactionDecoder();
    const decodedTx = transactionDecoder.decode(transactionBytes) as FullySignedTransaction & TransactionWithBlockhashLifetime;

    // Get signature from transaction before sending
    const signature = Object.entries(decodedTx.signatures)[0]?.[1]?.toString();
    if (!signature) throw new Error('No signature found');

    // Send and confirm transaction
    await sendAndConfirmTransaction(
      decodedTx,
      {
        commitment: 'confirmed',
        maxRetries: 3n
      }
    );

    // Update payment status on success
    await updatePaymentStatus(signature, 'confirmed', signature);
    
    return signature;

  } catch (error) {
    console.error('Transaction failed:', error);
    
    // If we have a signature from error object
    if (error && typeof error === 'object' && 'signature' in error) {
      const signature = (error as { signature: string }).signature;
      await updatePaymentStatus(signature, 'failed');
    }
    
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Transaction failed'
    );
  }
}