import { User } from '@/types/user';
import { baseApi, handleResponse } from '../client';
import type { AuthResponse, ChallengeResponse, VerifyRequest } from '@/types/api';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestNonce: builder.mutation<ChallengeResponse, { address: string }>({
      query: (body) => ({
        url: 'auth/nonce',
        method: 'POST',
        body,
      }),
      transformResponse: handleResponse,
    }),

    verifySignature: builder.mutation<AuthResponse, VerifyRequest>({
      query: (body) => ({
        url: 'auth/verify',
        method: 'POST',
        body,
      }),
      transformResponse: handleResponse,
      invalidatesTags: ['Auth', 'User'],
    }),

    getMe: builder.query<User, void>({
      query: () => 'auth/me',
      transformResponse: handleResponse,
      providesTags: ['User', 'Auth'],
    }),
  }),
});

export const {
  useRequestNonceMutation,
  useVerifySignatureMutation,
  useGetMeQuery,
} = authApi; 