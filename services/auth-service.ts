import { createBaseService } from '@/services/base-service';
import {
  AuthService,
  AuthServiceOptions,
  LoginPayload,
  TokenResponse,
} from '@/types/auth';

const LOGIN_PATH = '/login';
const DEFAULT_REFRESH_PATH = '/refresh';
const ENV_REFRESH_PATH = process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH;

export function createAuthService({
  refreshPath,
  client,
  ...clientOptions
}: AuthServiceOptions = {}): AuthService {
  const baseService = createBaseService({
    client,
    ...clientOptions,
  });

  const resolvedRefreshPath =
    refreshPath ?? ENV_REFRESH_PATH ?? DEFAULT_REFRESH_PATH;

  const login = (credentials: LoginPayload) =>
    baseService.post<TokenResponse>(LOGIN_PATH, credentials);

  const refresh = (refreshToken: string) =>
    baseService.post<TokenResponse>(resolvedRefreshPath, { refreshToken });

  return {
    login,
    refresh,
  };
}
