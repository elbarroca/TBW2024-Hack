import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@/lib/config';
import type { User, TokenInfo, Payment } from './types';

interface AuthResponse {
    token: string;
    user: User;
}

export interface ChallengeResponse {
    address: string;
    chain: string;
    valid_til: number;
    challenge: string;
}

interface CreateTransactionParams {
    pubkey: string;
    quantity: string;
    currency: string;
    decimals: number;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['User', 'Token', 'Transaction'],
    endpoints: (builder) => ({
        // Auth endpoints
        requestChallenge: builder.mutation<ChallengeResponse, { address: string }>({
            query: (body) => ({
                url: 'auth/challenge',
                method: 'POST',
                body,
            }),
        }),

        solveChallenge: builder.mutation<AuthResponse, { address: string; signature: string }>({
            query: (body) => ({
                url: 'auth/verify',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        getMe: builder.query<User, { address: string }>({
            query: () => 'auth/me',
            providesTags: ['User'],
        }),

        // Data endpoints
        getBalances: builder.query<TokenInfo[], string>({
            query: (address) => `tokens/${address}`,
            providesTags: ['Token'],
        }),
        // Transaction endpoints
        getTransactions: builder.query<
            Payment[],
            { address: string; limit?: number; before?: string }
        >({
            query: ({ address, ...params }) => ({
                url: `transactions/${address}`,
                params,
            }),
            providesTags: ['Transaction'],
        }),

        createTransaction: builder.mutation<string, CreateTransactionParams>({
            query: (body) => ({
                url: 'transactions/create',
                method: 'POST',
                body,
            }),
        }),

        sendTransaction: builder.mutation<{ signature: string }, { signedTransaction: string }>({
            query: (body) => ({
                url: 'transactions/send',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Transaction', 'Token'],
        }),
    }),
});

export const {
    useRequestChallengeMutation,
    useSolveChallengeMutation,
    useGetMeQuery,
    useGetBalancesQuery,
    useLazyGetBalancesQuery,
    useGetTransactionsQuery,
    useLazyGetTransactionsQuery,
    useCreateTransactionMutation,
    useSendTransactionMutation,
} = api;
