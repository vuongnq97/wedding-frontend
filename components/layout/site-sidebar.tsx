'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/stores/layout-store';
import Link from 'next/link';

const links = [
  { href: '/', translationKey: 'layout.sidebar.home' },
  { href: '/articles', translationKey: 'layout.sidebar.articles' },
  { href: '/about', translationKey: 'layout.sidebar.about' },
  { href: '/contact', translationKey: 'layout.sidebar.contact' },
];

export function SiteSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations();
  const { sidebarOpen, closeSidebar } = useLayoutStore();

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <aside
      className={cn(
        'border-border/60 bg-background/95 md:bg-background fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r p-4 shadow-lg transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:shadow-none',
        sidebarOpen && 'translate-x-0'
      )}
      aria-label="Primary"
    >
      <nav className="flex h-full flex-col gap-2">
        {links.map(({ href, translationKey }) => {
          const localizedHref =
            href === '/' ? `/${locale}` : `/${locale}${href}`;
          const isActive = pathname?.startsWith(localizedHref);
          return (
            <Link
              key={translationKey}
              href={localizedHref}
              className={cn(
                'text-muted-foreground hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive && 'bg-muted text-foreground'
              )}
            >
              {t(translationKey)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
