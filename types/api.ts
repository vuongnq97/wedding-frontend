export type ApiClientOptions = {
  baseUrl?: string;
  defaultHeaders?: HeadersInit;
  fetchImpl?: typeof fetch;
  onRequest?: (
    path: string,
    options: ApiRequestOptions
  ) => Promise<ApiRequestOptions | void> | ApiRequestOptions | void;
  onResponseError?: (response: Response) => Promise<void | boolean>;
};

export type ApiRequestOptions = {
  method?: string;
  headers?: HeadersInit;
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  parseJson?: boolean;
  fetchOptions?: RequestInit;
};

export type ApiClient = <T = unknown>(
  path: string,
  options?: ApiRequestOptions
) => Promise<T>;

export type BaseServiceOptions = ApiClientOptions & {
  client?: ApiClient;
};
