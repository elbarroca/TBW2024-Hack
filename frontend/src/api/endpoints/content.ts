import { baseApi, handleResponse } from '../client';
import type { Content, CreateContentInput } from '@/types/content';
import type { ApiResponse } from '@/types/api';

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContent: builder.mutation<Content, FormData>({
      query: (data) => ({
        url: 'content/upload',
        method: 'POST',
        body: data,
        formData: true,
      }),
      transformResponse: (response: ApiResponse<Content>) => 
        handleResponse(response),
      invalidatesTags: ['Content'],
    }),

    getContent: builder.query<Content, string>({
      query: (id) => `content/${id}`,
      transformResponse: (response: ApiResponse<Content>) => 
        handleResponse(response),
      providesTags: ['Content'],
    }),

    getCreatorContent: builder.query<Content[], string>({
      query: (creatorId) => `content/creator/${creatorId}`,
      transformResponse: (response: ApiResponse<Content[]>) => 
        handleResponse(response),
      providesTags: ['Content'],
    }),
  }),
});

export const {
  useCreateContentMutation,
  useGetContentQuery,
  useGetCreatorContentQuery,
} = contentApi; 