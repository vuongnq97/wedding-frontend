'use client';

import { useCallback, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

import { USER_COOKIE_MAX_AGE, USER_COOKIE_NAME } from '@/constants/auth';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { UserInfo, UseLoginReturn } from '@/types/auth';

export function useAuth(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { user, setUser, clearAuth, setHasWedding } = useAuthStore();

  // Listen for auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userInfo = mapSupabaseUser(session.user);
        setUser(userInfo);
        setUserCookie(userInfo);
      } else {
        setUser(null);
        setUserCookie(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  const requestOtp = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;
    } catch (err) {
      const normalized = normalizeError(err, 'Failed to request OTP');
      setError(normalized);
      throw normalized;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(
    async (email: string, code: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token: code,
          type: 'email',
        });

        if (error) throw error;
        if (!data.session || !data.user) {
          throw new Error('Verification failed — no session returned');
        }

        const userInfo = mapSupabaseUser(data.user);
        setUser(userInfo);
        setUserCookie(userInfo);

        return {
          userId: userInfo.userId,
          email: userInfo.email,
          role: userInfo.role,
          accessToken: data.session.access_token,
        };
      } catch (err) {
        const normalized = normalizeError(err, 'Verification failed');
        setError(normalized);
        clearAuth();
        throw normalized;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, clearAuth]
  );

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout API failed', err);
    } finally {
      clearAuth();
      setUserCookie(null);
    }
  }, [clearAuth]);

  const isAuthenticated = !!user;

  return {
    requestOtp,
    verifyOtp,
    logout,
    refresh: async () => {
      const { data } = await supabase.auth.refreshSession();
      if (!data.session) throw new Error('Refresh failed');
      return {
        accessToken: data.session.access_token,
        expiresAt: new Date(data.session.expires_at! * 1000).getTime(),
      };
    },
    isAuthenticated,
    isLoading,
    error,
    user,
  };
}

function mapSupabaseUser(user: User): UserInfo {
  return {
    userId: user.id,
    email: user.email ?? '',
    role: user.role ?? 'authenticated',
  };
}

function setUserCookie(nextUser: UserInfo | null) {
  if (typeof document === 'undefined') return;

  const secureSuffix =
    window.location.protocol === 'https:' ? '; Secure' : '';

  if (nextUser) {
    const serialized = encodeURIComponent(JSON.stringify(nextUser));
    document.cookie = `${USER_COOKIE_NAME}=${serialized}; path=/; max-age=${USER_COOKIE_MAX_AGE}; sameSite=Lax${secureSuffix}`;
  } else {
    document.cookie = `${USER_COOKIE_NAME}=; path=/; max-age=0; sameSite=Lax${secureSuffix}`;
  }
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
