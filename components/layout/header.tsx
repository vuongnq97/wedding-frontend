'use client';

import { useCallback, useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { MenuIcon, Heart, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

import { LoginDialog } from '@/components/auth/login-dialog';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { BaseButton } from '@/components/ui/base-button';

import { useLogin } from '@/hooks/use-login';
import { useLayoutStore } from '@/stores/layout-store';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/constants/routes';
import { HEADER_NAV_LINKS } from '@/constants/navigation';
import { UserInfo } from '@/types/auth';

type HeaderProps = {
  initialUser?: UserInfo | null;
};

export function Header({ initialUser = null }: HeaderProps) {
  const t = useTranslations('layout.header');
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const theme = useLayoutStore((state) => state.theme);
  const toggleTheme = useLayoutStore((state) => state.toggleTheme);
  const setTheme = useLayoutStore((state) => state.setTheme);
  const { login, isLoading, error } = useLogin();
  const user = useAuthStore((state) => state.user);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginSubmit = useCallback(
    async (values: { username: string; password: string }) => {
      await login(values);
    },
    [login]
  );

  const effectiveOpen = loginOpen && !user;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const hasDark = root.classList.contains('theme-dark');
      const hasLight = root.classList.contains('theme-light');
      if (hasDark) {
        setTheme('dark');
      } else if (hasLight) {
        setTheme('light');
      } else {
        root.classList.add('theme-light');
        setTheme('light');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('theme-dark');
        root.classList.remove('theme-light');
      } else {
        root.classList.add('theme-light');
        root.classList.remove('theme-dark');
      }
    }
  }, [theme]);

  const pathname = usePathname();

  return (
    <header className="border-border bg-background/95 sticky top-0 z-30 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-10">
        <div className="text-primary group flex items-center gap-2">
          <BaseButton
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </BaseButton>
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            <span className="text-foreground hover:text-primary font-serif text-xl font-bold tracking-tight md:text-2xl">
              {t('brand')}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {HEADER_NAV_LINKS.filter((item) =>
            item.authRequired ? !!(initialUser ?? user) : true
          ).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={cn(
                  'hover:text-primary text-sm font-medium tracking-wider uppercase transition-colors',
                  isActive ? 'text-primary' : 'text-foreground/70'
                )}
                href={item.href}
              >
                {t(item.key)}
              </Link>
            );
          })}
          {(initialUser ?? user) ? (
            <span className="text-muted-foreground text-sm font-bold uppercase">
              <Link href={ROUTES.INVITATION}>
                <BaseButton>
                  {t('my_invitation', {
                    name:
                      user &&
                      typeof user === 'object' &&
                      'name' in user &&
                      typeof user.name === 'string'
                        ? user.name
                        : t('signedIn'),
                  })}
                </BaseButton>
              </Link>
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={ROUTES.LOGIN}>
                <BaseButton
                  variant="outline"
                  className="text-foreground hover:text-primary cursor-pointer font-bold tracking-wider uppercase transition-colors"
                >
                  {t('login')}
                </BaseButton>
              </Link>
              <Link href={ROUTES.SIGN_UP}>
                <BaseButton className="shadow-primary/20 h-10 rounded-full px-5 uppercase shadow-md">
                  {t('signup')}
                </BaseButton>
              </Link>
            </div>
          )}

          <LanguageSwitcher />
          <BaseButton
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="-ml-7 rounded-full"
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </BaseButton>
        </div>
      </div>
      <LoginDialog
        open={effectiveOpen}
        onOpenChange={setLoginOpen}
        onSubmit={handleLoginSubmit}
        isSubmitting={isLoading}
        errorMessage={error?.message ?? null}
      />
    </header>
  );
}
