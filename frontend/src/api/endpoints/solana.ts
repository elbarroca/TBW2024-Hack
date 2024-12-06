import { baseApi } from '../client';
import type { ApiResponse } from '@/types/api';
import type { TokenInfo, TransactionData } from '@/types/api';

// Response types
interface GetBalancesResponse {
  balances: TokenInfo[];
}

interface GetTransactionsResponse {
  transactions: TransactionData[];
}

interface BuildTransactionResponse {
  transaction: string;
}

interface SendTransactionResponse {
  signature: string;
}

// Request types
interface BuildTransactionRequest {
  transaction: string;
}

interface SendTransactionRequest {
  transaction: string;
  userId: string;
  courseId: string;
}

export const solanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalances: builder.query<GetBalancesResponse, string>({
      query: (user) => ({
        url: '/api/solana/getBalances',
        params: { user },
      }),
      transformResponse: (response: ApiResponse<GetBalancesResponse>) => response.data,
      providesTags: ['Token'],
    }),

    getTransactions: builder.query<GetTransactionsResponse, string>({
      query: (address) => ({
        url: '/api/solana/getTransactions',
        params: { address },
      }),
      transformResponse: (response: ApiResponse<GetTransactionsResponse>) => response.data,
      providesTags: ['Transaction'],
    }),

    buildTransaction: builder.mutation<BuildTransactionResponse, BuildTransactionRequest>({
      query: (body) => ({
        url: '/api/solana/buildTransaction',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<BuildTransactionResponse>) => response.data,
    }),

    sendTransaction: builder.mutation<SendTransactionResponse, SendTransactionRequest>({
      query: (body) => ({
        url: '/api/solana/sendTransaction',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ApiResponse<SendTransactionResponse>) => response.data,
      invalidatesTags: ['Transaction', 'Token'],
    }),
  }),
});

export const {
  useGetBalancesQuery,
  useLazyGetBalancesQuery,
  useGetTransactionsQuery,
  useBuildTransactionMutation,
  useSendTransactionMutation,
} = solanaApi; 