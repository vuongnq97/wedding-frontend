import { ApiClient, ApiClientOptions, ApiRequestOptions } from '@/types/api';

export class ApiError<T = unknown> extends Error {
  readonly status: number;
  readonly data: T | null;

  constructor(message: string, status: number, data: T | null) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const JSON_CONTENT_TYPE = 'application/json';

export function createApiClient({
  baseUrl,
  defaultHeaders,
  fetchImpl = fetch,
  onRequest,
  onResponseError,
}: ApiClientOptions = {}): ApiClient {
  return async function apiRequest<T>(
    path: string,
    options: ApiRequestOptions = {}
  ): Promise<T> {
    let currentOptions = options;
    if (onRequest) {
      const result = await onRequest(path, currentOptions);
      if (result) {
        currentOptions = result;
      }
    }

    const {
      method = 'GET',
      headers,
      query,
      body,
      parseJson = true,
      fetchOptions,
    } = currentOptions;

    const url = buildUrl(baseUrl, path, query);
    const requestHeaders = mergeHeaders(defaultHeaders, headers);

    let requestBody: BodyInit | undefined;
    if (body !== undefined) {
      const isFormData =
        typeof FormData !== 'undefined' && body instanceof FormData;
      if (isFormData) {
        requestBody = body;
      } else if (body instanceof URLSearchParams) {
        requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
        requestBody = body;
      } else if (requestHeaders.get('Content-Type')) {
        requestBody = serializeBody(
          body,
          requestHeaders.get('Content-Type') ?? ''
        );
      } else {
        requestHeaders.set('Content-Type', JSON_CONTENT_TYPE);
        requestBody = JSON.stringify(body);
      }
    }

    const response = await fetchImpl(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials: 'include',
      ...fetchOptions,
    });

    if (!response.ok) {
      if (onResponseError) {
        const shouldRetry = await onResponseError(response);
        if (shouldRetry) {
          return apiRequest(path, options);
        }
      }
      const errorPayload = await tryParseJson(response);
      const message = deriveErrorMessage(response, errorPayload);
      throw new ApiError(message, response.status, errorPayload);
    }

    if (!parseJson) {
      return undefined as T;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const payload = await tryParseJson(response);
    if (payload === null) {
      return undefined as T;
    }

    return payload as T;
  };
}

function buildUrl(
  baseUrl: string | undefined,
  path: string,
  query?: ApiRequestOptions['query']
): string {
  const isAbsolute = /^https?:/i.test(path);
  const base = baseUrl ?? '';
  const isBaseAbsolute = /^https?:/i.test(base);

  // If path is absolute, use it directly
  if (isAbsolute) {
    const url = new URL(path);
    appendQuery(url, query);
    return url.toString();
  }

  // If base is absolute, combine them
  if (isBaseAbsolute) {
    const url = new URL(path, base);
    appendQuery(url, query);
    return url.toString();
  }

  // Both are relative: Manual construction
  // Ensure exactly one slash between base and path if needed.
  // Note: if base is empty, we just use path.
  let fullPath = path;
  if (base) {
    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    fullPath = `${cleanBase}${cleanPath}`;
  }

  // Use a dummy base to leverage URLSearchParams for query string generation
  const DUMMY_BASE = 'http://dummy.com';
  const urlObj = new URL(fullPath, DUMMY_BASE);
  appendQuery(urlObj, query);

  // Return pathname + search (relative URL)
  return `${urlObj.pathname}${urlObj.search}`;
}

function appendQuery(url: URL, query?: ApiRequestOptions['query']) {
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value == null) continue;
      url.searchParams.set(key, String(value));
    }
  }
}

function mergeHeaders(...entries: (HeadersInit | undefined)[]): Headers {
  const target = new Headers();
  for (const entry of entries) {
    if (!entry) {
      continue;
    }

    const source = new Headers(entry);
    source.forEach((value, key) => {
      target.set(key, value);
    });
  }

  return target;
}

function serializeBody(body: unknown, contentType: string): BodyInit {
  if (
    typeof body === 'string' ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body as BodyInit;
  }

  if (contentType.includes(JSON_CONTENT_TYPE) && typeof body === 'object') {
    return JSON.stringify(body);
  }

  throw new Error(
    'Unsupported request body type for the provided Content-Type'
  );
}

async function tryParseJson(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse JSON response', error);
    return null;
  }
}

function deriveErrorMessage(response: Response, errorPayload: unknown): string {
  if (
    errorPayload &&
    typeof errorPayload === 'object' &&
    'message' in errorPayload &&
    typeof errorPayload.message === 'string'
  ) {
    return errorPayload.message;
  }

  return `Request failed with status ${response.status}`;
}
