import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { config } from '@/lib/config';
import type { ApiResponse } from '@/types/api';

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: config.API_URL,
  credentials: 'include',
  prepareHeaders: (headers: Headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: [
    'Auth',
    'User',
    'Content',
    'Course',
    'Enrollment',
    'Token',
    'Transaction'
  ] as const,
  endpoints: () => ({}),
});

export const handleResponse = <T>(response: ApiResponse<T>): T => {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data as T;
}; 