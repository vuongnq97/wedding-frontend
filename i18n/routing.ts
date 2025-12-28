import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'vi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'vi';
export const localePrefix = 'always' as const;

export const routing = {
  locales,
  defaultLocale,
  localePrefix,
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
