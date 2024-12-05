import { type Address } from '@solana/addresses';

export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'expired';

export interface PaymentValidation {
  signature: string;
  signer: Address;
  recipient: Address;
  amount: bigint;
  currency: Address;
  status: PaymentStatus;
  timestamp: Date;
  user_id?: string;
  course_id?: string;
}

export interface ValidatedPayment {
  signature: string;
  signer: string;
  recipient: string;
  amount: string;
  currency: string;
  hoursBooked: number;
} 