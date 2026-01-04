import { ApiError } from '@/lib/api-client';

export function getLocalizedErrorMessage(
    err: unknown,
    t: (key: string) => string
): string {
    if (err instanceof ApiError) {
        const data = err.data as { code?: string; errorCode?: string } | null;
        const code = data?.code || data?.errorCode;

        if (code) {
            const knownErrorCodes = ['INVALID_OTP','TOO_MANY_REQUESTS', 'AccountNotFound'];
            if (knownErrorCodes.includes(code)) {
                return t(`errors.${code}`);
            }
        }
    }

    return err instanceof Error ? err.message : t('errors.default');
}
