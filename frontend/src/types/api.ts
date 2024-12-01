import { User } from '@/types/user';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface AuthResponse {
  user: User;
  token: string;
  status: number;
}

export interface ChallengeResponse {
  nonce: string;
  status: number;
}

export interface VerifyRequest {
  address: string;
  signature: string;
}

export interface TokenInfo {
  mint: string;
  symbol: string;
  balance: string;
  decimals: number;
  price?: number;
}

export interface Payment {
  id: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  transaction_hash?: string;
} 