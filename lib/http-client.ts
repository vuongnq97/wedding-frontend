import { createApiClient } from '@/lib/api-client';
import { supabase } from '@/lib/supabase';

const BASE_URL = '/api';

export const publicClient = createApiClient({
  baseUrl: BASE_URL,
});

export const apiClient = createApiClient({
  baseUrl: BASE_URL,
  onRequest: async (_path, options) => {
    // Get current session token from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      const headers = new Headers(options.headers);
      headers.set('Authorization', `Bearer ${session.access_token}`);
      return { ...options, headers };
    }
    return options;
  },
  onResponseError: async (response) => {
    if (response.status === 401) {
      // Try to refresh the session
      try {
        const { data, error } = await supabase.auth.refreshSession();
        if (data.session && !error) {
          return true; // Retry the request with new token
        }
      } catch {
        // Refresh failed, user needs to re-login
      }
    }
    return false;
  },
});
