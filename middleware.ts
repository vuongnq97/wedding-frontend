import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { defaultLocale, localePrefix, locales } from './i18n/routing';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const userCookie = request.cookies.get('auth-user');
  if (userCookie?.value) {
    response.headers.set('x-auth-user', userCookie.value);
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|vi)/:path*'],
};
