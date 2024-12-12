import { config } from '@/lib/config';
import { baseApi, handleResponse } from '../client';
import type { ApiResponse } from '@/types/api';

interface CreateNFTParams {
  imageFile: string;
  name: string;
  description: string;
  owner: string;
}

interface MintNFTParams {
  candyMachineId: string;
  signer: string;
}

interface NFTAsset {
  // Add specific asset properties based on your needs
  id: string;
  owner: string;
  content: {
    json_uri: string;
    metadata: {
      name: string;
      description: string;
      image: string;
    };
  };
}

interface TransactionResponse {
  transaction: string;
  collectionMint?: string;
  mintAddress?: string;
  status: number;
}

const metaplexUrl = `${config.METAPLEX_API_URL}/metaplex`;

export const metaplexApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<any[], string>({
      query: (user) => ({
        url: `${metaplexUrl}/getAssets?user=${user}`,
        method: 'GET',
      }),
      transformResponse: (response: ApiResponse<any[]>) => handleResponse(response),
    }),

    createNFT: builder.mutation<TransactionResponse, CreateNFTParams>({
      query: (params) => ({
        url: `${metaplexUrl}/create`,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: ApiResponse<TransactionResponse>) => handleResponse(response),
    }),

    mintNFT: builder.mutation<TransactionResponse, MintNFTParams>({
      query: (params) => ({
        url: `${metaplexUrl}/mint`,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: ApiResponse<TransactionResponse>) => handleResponse(response),
    }),

    sendTransaction: builder.mutation<any, { transaction: string }>({
      query: (params) => ({
        url: `${metaplexUrl}/sendTransaction`,
        method: 'POST',
        body: params,
      }),
      transformResponse: (response: ApiResponse<any>) => handleResponse(response),
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useLazyGetAssetsQuery,
  useCreateNFTMutation,
  useMintNFTMutation,
  useSendTransactionMutation,
} = metaplexApi; 