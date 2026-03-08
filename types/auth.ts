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
