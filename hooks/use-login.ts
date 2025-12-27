'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  AUTH_STORAGE_KEY,
  REFRESH_OFFSET_MS,
  USER_COOKIE_MAX_AGE,
  USER_COOKIE_NAME,
} from '@/constants/auth';
import { createAuthService } from '@/services/auth-service';
import {
  AuthTokens,
  LoginPayload,
  TokenResponse,
  UseLoginReturn,
  UserInfo,
} from '@/types/auth';
import { useAuthStore } from '@/stores/auth-store';

export function useLogin(): UseLoginReturn {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { setUser, clearUser, user } = useAuthStore();
  const refreshTimeout = useRef<number | null>(null);
  const pendingRefresh = useRef<Promise<AuthTokens> | null>(null);
  const refreshInternalRef = useRef<(() => Promise<AuthTokens>) | null>(null);
  const authService = useMemo(() => createAuthService(), []);
  const storageKey = AUTH_STORAGE_KEY;
  const refreshOffsetMs = REFRESH_OFFSET_MS;

  const clearRefreshTimeout = useCallback(() => {
    if (refreshTimeout.current !== null) {
      window.clearTimeout(refreshTimeout.current);
      refreshTimeout.current = null;
    }
  }, []);

  const persistTokens = useCallback(
    (nextTokens: AuthTokens | null) => {
      setTokens(nextTokens);
      if (typeof window === 'undefined') {
        return;
      }

      if (nextTokens) {
        window.localStorage.setItem(storageKey, JSON.stringify(nextTokens));
      } else {
        window.localStorage.removeItem(storageKey);
      }
    },
    [storageKey]
  );

  const scheduleRefresh = useCallback(
    (currentTokens: AuthTokens | null) => {
      clearRefreshTimeout();

      if (!currentTokens) {
        return;
      }

      const timeUntilExpiry = currentTokens.expiresAt - Date.now();
      const refreshDelay = Math.max(0, timeUntilExpiry - refreshOffsetMs);

      const refreshFn = refreshInternalRef.current;
      if (!refreshFn) {
        return;
      }

      if (refreshDelay <= 0) {
        pendingRefresh.current = null;
        void refreshFn();
        return;
      }

      refreshTimeout.current = window.setTimeout(() => {
        pendingRefresh.current = null;
        void refreshFn();
      }, refreshDelay);
    },
    [clearRefreshTimeout, refreshOffsetMs]
  );

  const parseTokens = useCallback((data: TokenResponse): AuthTokens => {
    const accessToken = data.accessToken;
    const refreshToken = data.refreshToken;

    if (!accessToken || !refreshToken) {
      throw new Error(
        'Login response must include accessToken and refreshToken'
      );
    }

    const expiresInSeconds = data.expiresIn ?? data.expires_in;
    const expiresAt =
      data.expiresAt ??
      (expiresInSeconds ? Date.now() + expiresInSeconds * 1000 : 0);

    if (!expiresAt || Number.isNaN(expiresAt)) {
      throw new Error(
        'Login response must include expiresIn (seconds) or expiresAt (ms)'
      );
    }

    return {
      accessToken,
      refreshToken,
      expiresAt,
    };
  }, []);

  const setUserCookie = useCallback((nextUser: UserInfo | null) => {
    if (typeof document === 'undefined') {
      return;
    }

    const secureSuffix =
      typeof window !== 'undefined' && window.location.protocol === 'https:'
        ? '; Secure'
        : '';
    if (nextUser) {
      const serialized = encodeURIComponent(JSON.stringify(nextUser));
      document.cookie = `${USER_COOKIE_NAME}=${serialized}; path=/; max-age=${USER_COOKIE_MAX_AGE}; sameSite=Lax${secureSuffix}`;
    } else {
      document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax${secureSuffix}`;
    }
  }, []);

  const login = useCallback<UseLoginReturn['login']>(
    async (credentials: LoginPayload) => {
      setIsLoading(true);
      setError(null);

      try {
        const mockedResponse: TokenResponse = {
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          expiresAt: Date.now() + 60 * 60 * 1000,
          user: {
            username: credentials.username,
            role: 'demo',
          },
        };
        const nextTokens = parseTokens(mockedResponse);
        persistTokens(nextTokens);
        scheduleRefresh(nextTokens);
        const nextUser = mockedResponse.user ?? null;
        setUser(nextUser);
        setUserCookie(nextUser);
        return nextTokens;
      } catch (err) {
        const normalizedError = normalizeError(err, 'Login failed');
        setError(normalizedError);
        persistTokens(null);
        clearRefreshTimeout();
        clearUser();
        setUserCookie(null);
        throw normalizedError;
      } finally {
        setIsLoading(false);
      }
    },
    [
      authService,
      clearRefreshTimeout,
      parseTokens,
      persistTokens,
      scheduleRefresh,
      setUserCookie,
    ]
  );

  const logout = useCallback(() => {
    setError(null);
    clearRefreshTimeout();
    persistTokens(null);
    clearUser();
    setUserCookie(null);
  }, [clearRefreshTimeout, persistTokens, setUserCookie]);

  const refreshInternal = useCallback(async () => {
    if (!tokens) {
      throw new Error('Cannot refresh without tokens');
    }

    if (pendingRefresh.current) {
      return pendingRefresh.current;
    }

    const refreshPromise = authService
      .refresh(tokens.refreshToken)
      .then((response) => {
        const nextTokens = parseTokens(response);
        const mergedTokens = {
          ...nextTokens,
          refreshToken: nextTokens.refreshToken ?? tokens.refreshToken,
        };
        persistTokens(mergedTokens);
        scheduleRefresh(mergedTokens);
        return mergedTokens;
      })
      .catch((err) => {
        const normalizedError = normalizeError(err, 'Refresh token failed');
        persistTokens(null);
        clearRefreshTimeout();
        setUserCookie(null);
        throw normalizedError;
      })
      .finally(() => {
        pendingRefresh.current = null;
      });

    pendingRefresh.current = refreshPromise;
    return refreshPromise;
  }, [
    authService,
    clearRefreshTimeout,
    parseTokens,
    persistTokens,
    scheduleRefresh,
    setUserCookie,
    tokens,
  ]);

  const refresh = useCallback(() => refreshInternal(), [refreshInternal]);

  refreshInternalRef.current = refreshInternal;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as AuthTokens;
      if (!parsed.accessToken || !parsed.refreshToken || !parsed.expiresAt) {
        window.localStorage.removeItem(storageKey);
        return;
      }

      if (parsed.expiresAt <= Date.now()) {
        void refreshInternal().catch(() => {
          logout();
        });
        return;
      }

      // setTokens(parsed);
      // scheduleRefresh(parsed);
    } catch (err) {
      console.error('Failed to restore auth tokens', err);
      window.localStorage.removeItem(storageKey);
    }

    return () => {
      clearRefreshTimeout();
    };
  }, [
    clearRefreshTimeout,
    logout,
    parseTokens,
    refreshInternal,
    scheduleRefresh,
    storageKey,
  ]);

  const accessToken = useMemo(() => tokens?.accessToken ?? null, [tokens]);
  const isAuthenticated = useMemo(() => Boolean(tokens?.accessToken), [tokens]);

  return {
    login,
    logout,
    refresh,
    tokens,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
    user,
  };
}

function normalizeError(error: unknown, fallbackMessage: string): Error {
  if (error instanceof Error) {
    return error;
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return new Error(error.message);
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return new Error(error);
  }

  return new Error(fallbackMessage);
}
