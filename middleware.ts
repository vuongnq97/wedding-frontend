import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { defaultLocale, localePrefix, locales } from './i18n/routing';
import { ROUTES } from './constants/routes';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

const protectedPages = [
  ROUTES.DASHBOARD,
  ROUTES.MANAGE_INVITATION,
  ROUTES.INVITATION,
];

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedPages.some(
    (page) => pathname.endsWith(page) || pathname.includes(`${page}/`)
  );

  const userCookie = request.cookies.get('auth-user');

  if (isProtected && !userCookie?.value) {
    const locale = pathname.split('/')[1] || defaultLocale;
    const loginUrl = new URL(`/${locale}/${ROUTES.LOGIN}`, request.url);
    return Response.redirect(loginUrl);
  }

  const response = intlMiddleware(request);
  response.headers.set('x-pathname', pathname);

  if (userCookie?.value) {
    response.headers.set('x-auth-user', userCookie.value);
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|vi)/:path*'],
};
