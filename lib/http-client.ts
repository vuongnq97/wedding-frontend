import { createApiClient } from '@/lib/api-client';
import { useAuthStore } from '@/stores/auth-store';
import { TokenResponse } from '@/types/auth';

const BASE_URL = '/api';

export const publicClient = createApiClient({
  baseUrl: BASE_URL,
});

let isRefreshing = false;
let refreshSubscribers: ((success: boolean) => void)[] = [];

const onRefreshed = (success: boolean) => {
  refreshSubscribers.forEach((cb) => cb(success));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (success: boolean) => void) => {
  refreshSubscribers.push(cb);
};

export const apiClient = createApiClient({
  baseUrl: BASE_URL,
  onRequest: async (path, options) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${token}`);
      return { ...options, headers };
    }
    return options;
  },
  onResponseError: async (response) => {
    if (response.status === 401) {
      if (isRefreshing) {
        return new Promise<boolean>((resolve) => {
          addRefreshSubscriber((success) => {
            resolve(success);
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await publicClient<TokenResponse>('/Auth/refresh', {
          method: 'POST',
        });

        if (res?.accessToken) {
          useAuthStore.getState().setAccessToken(res.accessToken);

          onRefreshed(true);
          return true;
        }
      } catch (err) {
        console.error('Refresh failed', err);
        useAuthStore.getState().clearAuth();
        onRefreshed(false);
        return false;
      } finally {
        isRefreshing = false;
      }
    }
    return false;
  },
});
