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

// Response types for specific endpoints
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