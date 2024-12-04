import { baseApi } from '../client';

interface GetBalancesResponse {
  balances: any[];
}

export const solanaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBalances: builder.query<GetBalancesResponse, string>({
      query: (user) => ({
        url: '/solana/getBalances',
        params: { user },
      }),
      providesTags: ['Token'],
    }),
    sendTransaction: builder.mutation<{ signature: string }, { transaction: string }>({
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
  useSendTransactionMutation,
} = solanaApi; 