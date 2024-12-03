import { baseApi, handleResponse } from '../client';

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query<any[], void>({
      query: () => 'enrollments',
      transformResponse: handleResponse,
      providesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
} = enrollmentsApi; 