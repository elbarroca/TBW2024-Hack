import { baseApi, handleResponse } from '../client';

export const enrollmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollments: builder.query<{id: string; course_id: string; user_id: string; status: string; created_at: string; updated_at: string}[], void>({
      query: () => 'enrollments',
      transformResponse: handleResponse,
      providesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useGetEnrollmentsQuery,
} = enrollmentsApi; 