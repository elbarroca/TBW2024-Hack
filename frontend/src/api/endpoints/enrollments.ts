import { baseApi, handleResponse } from '../client';
import type { Enrollment } from '@/types/course';

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query<Enrollment[], void>({
      query: () => 'enrollments',
      transformResponse: handleResponse,
      providesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
} = enrollmentsApi; 