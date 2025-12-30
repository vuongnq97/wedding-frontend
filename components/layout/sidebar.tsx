'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Heart, Moon, Sun, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/stores/layout-store';
import { Link } from '@/i18n/routing';
import { BaseButton } from '@/components/ui/base-button';
import { useAuthStore } from '@/stores/auth-store';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ROUTES } from '@/constants/routes';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('layout.header');
  const { sidebarOpen, closeSidebar, toggleTheme, theme } = useLayoutStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <>
      <aside
        className={cn(
          'border-border/60 bg-background/95 md:bg-background fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r p-6 shadow-lg transition-transform duration-200 ease-in-out md:hidden',
          sidebarOpen && 'translate-x-0'
        )}
        aria-label="Primary"
      >
        <BaseButton
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close navigation"
          className="absolute top-4 right-4"
          onClick={closeSidebar}
        >
          <X className="h-6 w-6" />
        </BaseButton>
        <div className="flex h-full flex-col gap-6">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 px-2"
            onClick={closeSidebar}
          >
            <Heart className="text-primary h-6 w-6" />
            <span className="text-foreground font-serif text-xl font-bold tracking-tight">
              {t('brand')}
            </span>
          </Link>

          <nav className="flex flex-col gap-2">
            <Link
              className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors"
              href={ROUTES.TEMPLATES}
              onClick={closeSidebar}
            >
              {t('templates')}
            </Link>
            <Link
              className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors"
              href={ROUTES.PRICING}
              onClick={closeSidebar}
            >
              {t('pricing')}
            </Link>
          </nav>
          <div className="flex items-center gap-2 px-2">
            <LanguageSwitcher />
            <BaseButton
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="rounded-full"
              title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </BaseButton>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            {user ? (
              <div className="flex flex-col gap-2 px-2">
                <span className="text-muted-foreground text-sm font-medium">
                  {typeof user === 'object' &&
                  'name' in user &&
                  typeof user.name === 'string' ? (
                    user.name
                  ) : (
                    <Link href={ROUTES.INVITATION}>{t('my_invitation')}</Link>
                  )}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href={ROUTES.LOGIN}>
                  <BaseButton variant="outline" className="w-full">
                    {t('login')}
                  </BaseButton>
                </Link>
                <Link href={ROUTES.SIGN_UP}>
                  <BaseButton variant="default" className="w-full">
                    {t('signup')}
                  </BaseButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
