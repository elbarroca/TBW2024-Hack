import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { config } from '@/lib/config';

interface ApiErrorResponse {
  statusCode: number;
  error: string;
  details?: any;
}

interface ApiSuccessResponse<T> {
  statusCode: number;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQueryFn = fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQueryFn(args, api, extraOptions);

  // Handle 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // Clear local storage
    localStorage.removeItem('token');
    // You might want to trigger a logout action here
    // api.dispatch(logout());
  }

  return result;
};

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
  if ('error' in response) {
    throw new Error(response.error);
  }
  return response.data;
};

// Helper types for endpoints
export type EndpointBuilder = typeof baseApi.endpoints;

export interface QueryHooks<T> {
  useQuery: () => { data?: T; isLoading: boolean; error?: FetchBaseQueryError };
  useLazyQuery: () => [(trigger: void) => void, { data?: T; isLoading: boolean }];
}

export interface MutationHooks<T, A> {
  useMutation: () => [(arg: A) => Promise<T>, { isLoading: boolean }];
} 