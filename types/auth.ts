import { BaseServiceOptions } from '@/types/api';
import { ApiResponse } from './common';

export type UserInfo = {
  userId: string;
  email: string;
  role: string;
};

export type TokenResponse = UserInfo & {
  accessToken: string;
};

export type AuthTokens = {
  accessToken: string;
  expiresAt: number;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthServiceOptions = BaseServiceOptions & {
  refreshPath?: string;
};

export type AuthService = {
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (
    email: string,
    code: string
  ) => Promise<ApiResponse<TokenResponse>>;
  refresh: () => Promise<ApiResponse<TokenResponse>>;
  logout: () => Promise<void>;
};

export type UseLoginOptions = BaseServiceOptions & {
  refreshPath?: string;
  storageKey?: string;
  refreshOffsetMs?: number;
};

export type UseLoginReturn = {
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<TokenResponse>;
  logout: () => void;
  refresh: () => Promise<AuthTokens>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  user: UserInfo | null;
};
