import { ApiError } from '@/lib/api-client';
import { apiClient as defaultApiClient } from '@/lib/http-client';
import { ApiRequestOptions, BaseServiceOptions } from '@/types/api';

export type BaseService = {
  request<T = unknown>(path: string, options?: ApiRequestOptions): Promise<T>;
  get<T = unknown>(
    path: string,
    options?: Omit<ApiRequestOptions, 'method'>
  ): Promise<T>;
  post<T = unknown, P = unknown>(
    path: string,
    body?: P,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<T>;
  put<T = unknown, P = unknown>(
    path: string,
    body?: P,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<T>;
  patch<T = unknown, P = unknown>(
    path: string,
    body?: P,
    options?: Omit<ApiRequestOptions, 'method' | 'body'>
  ): Promise<T>;
  delete<T = unknown>(
    path: string,
    options?: Omit<ApiRequestOptions, 'method'>
  ): Promise<T>;
};

export function createBaseService(
  options: BaseServiceOptions = {}
): BaseService {
  const {
    client: providedClient,
    defaultHeaders: _defaultHeaders,
    fetchImpl: _fetchImpl,
  } = options;

  // Use the provided client or fall back to the default authenticated client
  // Note: If options like baseUrl are provided, they won't affect the defaultApiClient
  // which is pre-configured. If dynamic configuration is needed, one should pass a custom client.
  const apiClient = providedClient ?? defaultApiClient;

  const request = async <T>(
    path: string,
    requestOptions: ApiRequestOptions = {}
  ): Promise<T> => {
    try {
      return await apiClient<T>(path, requestOptions);
    } catch (error) {
      throw normalizeApiError(error);
    }
  };

  return {
    request,
    get: (path, options) =>
      request(path, { ...(options ?? {}), method: 'GET' }),
    post: (path, body, options) =>
      request(path, { ...(options ?? {}), method: 'POST', body }),
    put: (path, body, options) =>
      request(path, { ...(options ?? {}), method: 'PUT', body }),
    patch: (path, body, options) =>
      request(path, { ...(options ?? {}), method: 'PATCH', body }),
    delete: (path, options) =>
      request(path, { ...(options ?? {}), method: 'DELETE' }),
  };
}

function normalizeApiError(error: unknown): Error {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error('Unexpected API error');
}
