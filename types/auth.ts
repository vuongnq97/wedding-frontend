import { BaseServiceOptions } from '@/types/api';

export type UserInfo = Record<string, unknown>;

export type TokenResponse = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  expires_in?: number;
  expiresAt?: number;
  user?: UserInfo;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
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
  login: (credentials: LoginPayload) => Promise<TokenResponse>;
  refresh: (refreshToken: string) => Promise<TokenResponse>;
};

export type UseLoginOptions = BaseServiceOptions & {
  refreshPath?: string;
  storageKey?: string;
  refreshOffsetMs?: number;
};

export type UseLoginReturn = {
  login: (credentials: LoginPayload) => Promise<AuthTokens>;
  logout: () => void;
  refresh: () => Promise<AuthTokens>;
  tokens: AuthTokens | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  user: UserInfo | null;
};
