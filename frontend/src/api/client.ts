import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { config } from '@/lib/config';
import { parseCookies } from 'nookies';
import type { ApiResponse, ApiError } from '@/types/api';

// Custom error handler
export class ApiException extends Error {
  constructor(
    public statusCode: number,
    public error: string,
    public details?: unknown
  ) {
    super(error);
    this.name = 'ApiException';
  }
}

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQueryFn = fetchBaseQuery({
    baseUrl: config.API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      const token = cookies.auth_token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQueryFn(args, api, extraOptions);

  // Handle errors
  if (result.error) {
    if (result.error.status === 401) {
      // Handle unauthorized
      // api.dispatch(logout());
    }
    
    // Transform error response
    const error = result.error.data as ApiError;
    throw new ApiException(
      error.statusCode,
      error.error,
      error.details
    );
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
    'Transaction',
    'Metaplex'
  ] as const,
  endpoints: () => ({}),
});

// Type-safe response handler
export function handleResponse<T>(response: unknown): T {
  const apiResponse = response as ApiResponse<T>;
  return apiResponse.data;
}

// Helper types
export type EndpointBuilder = typeof baseApi.endpoints;

export interface QueryHooks<T> {
  useQuery: () => {
    data?: T;
    isLoading: boolean;
    error?: ApiException;
  };
  useLazyQuery: () => [
    (trigger: void) => void,
    {
      data?: T;
      isLoading: boolean;
      error?: ApiException;
    }
  ];
}

export interface MutationHooks<T, A> {
  useMutation: () => [
    (arg: A) => Promise<T>,
    {
      isLoading: boolean;
      error?: ApiException;
    }
  ];
} 