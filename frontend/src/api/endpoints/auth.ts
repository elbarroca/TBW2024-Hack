import { baseApi } from '../client';
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';

// Response types
interface NonceResponse {
  nonce: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Request types
interface NonceRequest {
  address: string;
}

interface VerifyRequest {
  address: string;
  nonce: string;
  signature: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestNonce: builder.mutation<NonceResponse, NonceRequest>({
      query: (body) => ({
        url: '/auth/nonce',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<NonceResponse>) => response.data,
    }),
    
    verifySignature: builder.mutation<AuthResponse, VerifyRequest>({
      query: (body) => ({
        url: '/auth/verify',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<AuthResponse>) => response.data,
      invalidatesTags: ['Auth'],
    }),
    
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<{ message: string }>) => response.data,
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRequestNonceMutation,
  useVerifySignatureMutation,
  useLogoutMutation,
} = authApi; 