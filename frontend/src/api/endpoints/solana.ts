import { baseApi, handleResponse } from '../client';
import type { TokenInfo, Payment } from '@/types/api';

export const solanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalances: builder.query<TokenInfo[], string>({
      query: (address) => `getBalances?user=${address}`,
      transformResponse: handleResponse,
      providesTags: ['Token'],
    }),

    sendTransaction: builder.mutation<{ signature: string }, { transaction: string }>({
      query: (body) => ({
        url: 'sendTransaction',
        method: 'POST',
        body,
      }),
      transformResponse: handleResponse,
      invalidatesTags: ['Token', 'Transaction'],
    }),
  }),
});

export const {
  useGetBalancesQuery,
  useSendTransactionMutation,
} = solanaApi; 