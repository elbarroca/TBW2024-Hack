import { baseApi, handleResponse } from '../client';
import type { Course } from '@/types/course';

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query<Course, string>({
      query: (id) => `courses/${id}`,
      transformResponse: handleResponse,
      providesTags: ['Course'],
    }),

    getInstructorCourses: builder.query<Course[], string>({
      query: (instructorId) => `courses/instructor/${instructorId}`,
      transformResponse: handleResponse,
      providesTags: ['Course'],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useGetInstructorCoursesQuery,
} = coursesApi; 