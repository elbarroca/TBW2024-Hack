import { baseApi } from '../client';

interface CourseData {
  title: string;
  description: string;
  // Add other course fields
}

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<any, CourseData>({
      query: (body) => ({
        url: '/courses',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation<any, { id: string; data: Partial<CourseData> }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Course'],
    }),
    publishCourse: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/courses/${id}/publish`,
        method: 'POST',
      }),
      invalidatesTags: ['Course'],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  usePublishCourseMutation,
} = courseApi; 