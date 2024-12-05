import { baseApi } from '../client';
import type {
  GetBalancesResponse,
  GetTransactionsResponse,
  BuildTransactionRequest,
  SendTransactionRequest,
  SendTransactionResponse
} from '@/types/api';

export const solanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalances: builder.query<GetBalancesResponse, string>({
      query: (user) => ({
        url: '/solana/getBalances',
        params: { user },
      }),
      providesTags: ['Token'],
    }),

    getTransactions: builder.query<GetTransactionsResponse, string>({
      query: (address) => ({
        url: '/solana/getTransactions',
        params: { address },
      }),
      providesTags: ['Transaction'],
    }),

    buildTransaction: builder.mutation<{ transaction: string }, BuildTransactionRequest>({
      query: (body) => ({
        url: '/solana/buildTransaction',
        method: 'POST',
        body,
      }),
    }),

    sendTransaction: builder.mutation<SendTransactionResponse, SendTransactionRequest>({
      query: (body) => ({
        url: '/solana/sendTransaction',
        method: 'POST',
        body,
      }),
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