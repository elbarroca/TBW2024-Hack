import { baseApi } from '../client';

interface EnrollmentProgress {
  progress: number;
}

interface EnrollmentStatus {
  status: 'active' | 'completed' | 'cancelled';
}

interface CreateEnrollment {
  course_id: string;
  payment_id?: string;
}

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollment: builder.query<any, string>({
      query: (id) => `/enrollments/${id}`,
      providesTags: ['Enrollment'],
    }),
    getUserEnrollments: builder.query<any[], string>({
      query: (userId) => `/users/${userId}/enrollments`,
      providesTags: ['Enrollment'],
    }),
    createEnrollment: builder.mutation<any, CreateEnrollment>({
      query: (body) => ({
        url: '/enrollments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Enrollment'],
    }),
    updateProgress: builder.mutation<void, { id: string; progress: number }>({
      query: ({ id, progress }) => ({
        url: `/enrollments/${id}/progress`,
        method: 'PATCH',
        body: { progress },
      }),
      invalidatesTags: ['Enrollment'],
    }),
    updateStatus: builder.mutation<void, { id: string; status: EnrollmentStatus['status'] }>({
      query: ({ id, status }) => ({
        url: `/enrollments/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Enrollment'],
    }),
  }),
});

export const {
  useGetEnrollmentQuery,
  useGetUserEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useUpdateProgressMutation,
  useUpdateStatusMutation,
} = enrollmentApi; 