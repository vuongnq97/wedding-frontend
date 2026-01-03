'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  REFRESH_OFFSET_MS,
  USER_COOKIE_MAX_AGE,
  USER_COOKIE_NAME,
} from '@/constants/auth';
import { createAuthService } from '@/services/auth-service';
import { useAuthStore } from '@/stores/auth-store';
import {
  AuthTokens,
  TokenResponse,
  UseLoginReturn,
  UserInfo,
} from '@/types/auth';

export function useAuth(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { user, setUser, accessToken, setAccessToken, clearAuth } =
    useAuthStore();

  const refreshTimeout = useRef<number | null>(null);
  const authService = useMemo(() => createAuthService(), []);

  const clearRefreshTimeout = useCallback(() => {
    if (refreshTimeout.current !== null) {
      window.clearTimeout(refreshTimeout.current);
      refreshTimeout.current = null;
    }
  }, []);

  const setUserCookie = useCallback((nextUser: UserInfo | null) => {
    if (typeof document === 'undefined') return;

    const secureSuffix =
      window.location.protocol === 'https:' ? '; Secure' : '';

    if (nextUser) {
      const serialized = encodeURIComponent(JSON.stringify(nextUser));
      document.cookie = `${USER_COOKIE_NAME}=${serialized}; path=/; max-age=${USER_COOKIE_MAX_AGE}; sameSite=Lax${secureSuffix}`;
    } else {
      document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax${secureSuffix}`;
    }
  }, []);

  const parseTokens = useCallback((data: TokenResponse): AuthTokens => {
    const accessToken = data.accessToken;

    if (!accessToken) {
      throw new Error('Login response must include accessToken');
    }

    const payload = decodeJwt(accessToken);
    const expiresAt = payload?.exp ? payload.exp * 1000 : 0;

    return {
      accessToken,
      expiresAt,
    };
  }, []);

  // Handle successful auth (Updates store/cookies, returns tokens)
  const handleAuthSuccess = useCallback(
    (response: TokenResponse) => {
      const nextTokens = parseTokens(response);

      // Extract UserInfo from response (excluding sensitive/token fields)
      const { accessToken: _accessToken, ...user } = response;

      // 1. Update Store
      setAccessToken(nextTokens.accessToken);
      setUser(user);

      // 2. Set Cookies (Only User Cookie, Refresh is HttpOnly handled by BE)
      setUserCookie(user);

      return nextTokens;
    },
    [parseTokens, setAccessToken, setUser, setUserCookie]
  );

  // Forward declaration/ref for scheduleRefresh to avoid circular dependency
  const scheduleRefreshRef = useRef<(tokens: AuthTokens) => void>(() => {});

  // Refresh Logic
  const performRefresh = useCallback(async () => {
    try {
      const response = await authService.refresh();
      const tokens = handleAuthSuccess(response.data);
      scheduleRefreshRef.current(tokens);
      return tokens;
    } catch (err) {
      console.error('Refresh failed', err);
      clearAuth();
      setUserCookie(null);
      throw err;
    }
  }, [authService, handleAuthSuccess, clearAuth, setUserCookie]);

  const performRefreshRef = useRef(performRefresh);
  useEffect(() => {
    performRefreshRef.current = performRefresh;
  }, [performRefresh]);

  const scheduleRefresh = useCallback(
    (tokens: AuthTokens) => {
      clearRefreshTimeout();

      if (!tokens.expiresAt || tokens.expiresAt < Date.now()) return;

      const timeUntilExpiry = tokens.expiresAt - Date.now();
      const refreshDelay = Math.max(0, timeUntilExpiry - REFRESH_OFFSET_MS);

      refreshTimeout.current = window.setTimeout(() => {
        void performRefreshRef.current().catch(() => {});
      }, refreshDelay);
    },
    [clearRefreshTimeout]
  );

  useEffect(() => {
    scheduleRefreshRef.current = scheduleRefresh;
  }, [scheduleRefresh]);

  const requestOtp = useCallback(
    async (email: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.requestOtp(email);
      } catch (err) {
        setError(normalizeError(err, 'Failed to request OTP'));
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const verifyOtp = useCallback(
    async (email: string, code: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.verifyOtp(email, code);
        const tokens = handleAuthSuccess(response.data);
        scheduleRefresh(tokens);
        return response.data;
      } catch (err) {
        setError(normalizeError(err, 'Verification failed'));
        clearAuth();
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authService, handleAuthSuccess, scheduleRefresh, clearAuth]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Logout API failed', err);
    } finally {
      clearAuth();
      setUserCookie(null);
      clearRefreshTimeout();
    }
  }, [authService, clearAuth, setUserCookie, clearRefreshTimeout]);

  return {
    requestOtp,
    verifyOtp,
    logout,
    refresh: async () => {
      const t = await performRefresh();
      return t;
    },
    isAuthenticated: !!accessToken,
    isLoading,
    error,
    user,
  };
}

function normalizeError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) return error;

  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as { message: unknown }).message;
    if (typeof msg === 'string') {
      return new Error(msg);
    }
  }

  return new Error(fallbackMessage);
}

function decodeJwt(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
