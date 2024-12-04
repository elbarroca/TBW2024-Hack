import { baseApi } from '../client';

interface CreateContentRequest {
  title: string;
  description: string;
  type: 'video' | 'text' | 'article' | 'ebook' | 'research_paper' | 'file';
  price: number;
  currency: string;
  file: File;
  thumbnail?: File;
  categories?: string[];
  metadata?: Record<string, any>;
}

export const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadContent: builder.mutation<any, CreateContentRequest>({
      query: (body) => {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        });

        return {
          url: '/content/upload',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Content'],
    }),
    getContent: builder.query<any, string>({
      query: (id) => `/content/${id}`,
      providesTags: ['Content'],
    }),
    deleteContent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/content/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Content'],
    }),
  }),
});

export const {
  useUploadContentMutation,
  useGetContentQuery,
  useDeleteContentMutation,
} = contentApi; 