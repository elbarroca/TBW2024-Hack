import { baseApi } from '../client';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{id: string; email: string; name: string; created_at: string; updated_at: string}, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
} = userApi; 