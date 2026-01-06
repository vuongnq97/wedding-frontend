import { createBaseService } from '@/services/base-service';
import { AuthService, AuthServiceOptions, TokenResponse } from '@/types/auth';
import { ApiResponse } from '@/types/common';

const REQUEST_OTP_PATH = '/Auth/request-otp';
const VERIFY_OTP_PATH = '/Auth/verify-otp';
const REFRESH_PATH = '/Auth/refresh';
const LOGOUT_PATH = '/Auth/logout';

export function createAuthService({
  client,
  ...clientOptions
}: AuthServiceOptions = {}): AuthService {
  const authService = createBaseService({
    client,
    ...clientOptions,
  });

  const requestOtp = (email: string) =>
    authService.post<void>(REQUEST_OTP_PATH, { email });

  const verifyOtp = async (email: string, code: string) => {
    const response = await authService.post<ApiResponse<TokenResponse>>(
      VERIFY_OTP_PATH,
      { email, code }
    );
    return response;
  };

  const refresh = async () => {
    const response = await authService.post<ApiResponse<TokenResponse>>(REFRESH_PATH);
    return response;
  };

  const logout = () => authService.post<void>(LOGOUT_PATH);

  return {
    requestOtp,
    verifyOtp,
    refresh,
    logout,
  };
}
