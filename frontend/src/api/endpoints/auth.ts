import { baseApi } from '../client';
import type { User } from '@/types/user';
import type { ApiResponse, NonceResponse } from '@/types/api';

interface NonceRequest {
  address: string;
}

interface VerifyRequest {
  address: string;
  nonce: string;
  signature: string;
}

interface AuthResponse {
  user: User;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestNonce: builder.mutation<ApiResponse<NonceResponse>, NonceRequest>({
      query: (body) => ({
        url: '/auth/nonce',
        method: 'POST',
        body,
      }),
    }),
    
    verifySignature: builder.mutation<ApiResponse<AuthResponse>, VerifyRequest>({
      query: (body) => ({
        url: '/auth/verify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    logout: builder.mutation<ApiResponse<{ message: string }>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useRequestNonceMutation,
  useVerifySignatureMutation,
  useLogoutMutation,
} = authApi; 