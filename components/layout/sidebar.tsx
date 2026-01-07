'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Heart, LogOut, Moon, Sun, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/stores/layout-store';
import { Link } from '@/i18n/routing';
import { BaseButton } from '@/components/ui/base-button';
import { useAuthStore } from '@/stores/auth-store';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/use-auth';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('layout.header');
  const { sidebarOpen, closeSidebar, toggleTheme, theme } = useLayoutStore();
  const { user, hasWedding } = useAuthStore();
  const { logout } = useAuth();
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'border-border/60 bg-background md:bg-background fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r p-6 shadow-lg transition-transform duration-200 ease-in-out md:hidden',
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
          {hasWedding && (
            <Link href={`${ROUTES.INVITATION}/${user?.userId}?edit=true`}>
              <BaseButton>{t('my_invitation')}</BaseButton>
            </Link>
          )}

          <div className="mt-auto flex flex-col gap-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link href={ROUTES.LOGIN}>
                  <BaseButton variant="default" className="w-full">
                    {t('login')}
                  </BaseButton>
                </Link>
              </div>
            ) : (
              <BaseButton
                variant="outline"
                onClick={() => logout()}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('logout')}</span>
              </BaseButton>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
