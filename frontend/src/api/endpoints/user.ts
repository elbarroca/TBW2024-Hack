import { baseApi } from '../client';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
} = userApi; 