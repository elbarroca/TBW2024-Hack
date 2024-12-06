import { User } from '@/types/user';

// Base response interface
export interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

// Error response type
export interface ApiError {
  statusCode: number;
  error: string;
  details?: unknown;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Specific response types
export interface NonceResponse {
  nonce: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  daily_volume: number;
  address: string;
  decimals: number;
  created_at: string;
  freeze_authority: string | null;
  mint_authority: string | null;
  permanent_delegate: string | null;
  minted_at: string;
  extensions?: {
    coingeckoId?: string;
  };
}

export interface TokenInfo {
  mint: string;
  address: string;
  amount: string;
  value: string;
  price: number;
  decimals: number;
  metadata: TokenMetadata;
}

export interface TransactionData {
  signature: string;
  timestamp: number;
  slot: number;
  status: 'confirmed' | 'finalized' | 'failed';
  type: string;
  amount?: string;
  token?: string;
}

// Request/Response types for Solana endpoints
export interface GetBalancesResponse {
  balances: TokenInfo[];
}

export interface GetTransactionsResponse {
  transactions: TransactionData[];
}

export interface BuildTransactionRequest {
  transaction: string;
}

export interface SendTransactionRequest {
  transaction: string;
  userId: string;
  courseId: string;
}

export interface SendTransactionResponse {
  signature: string;
}

export interface Payment {
  id: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  transaction_hash?: string;
}