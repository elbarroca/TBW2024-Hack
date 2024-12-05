import { User } from '@/types/user';

// Base response interface
export interface BaseResponse {
  statusCode: number;
}

// Success response with generic data type
export interface SuccessResponse<T> extends BaseResponse {
  status: 'success';
  data: T;
}

// Error response
export interface ErrorResponse extends BaseResponse {
  status: 'error';
  error: string;
  details?: any;
}

// Union type for API responses
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Type guard functions
export const isSuccessResponse = <T>(
  response: ApiResponse<T>
): response is SuccessResponse<T> => {
  return response.status === 'success';
};

export const isErrorResponse = <T>(
  response: ApiResponse<T>
): response is ErrorResponse => {
  return response.status === 'error';
};

export interface AuthResponse {
  user: User;
  token: string;
}

export interface NonceResponse {
  nonce: string;
}

export interface VerifyRequest {
  address: string;
  signature: string;
}

export type TokenInfo = {
  mint: string;
  address: string;
  amount: string;
  value: string;
  decimals: number;
  metadata: TokenMetadata;
};

export type TokenMetadata = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
};

export interface Payment {
  id: string;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  transaction_hash?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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