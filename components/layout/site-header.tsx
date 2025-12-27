'use client';

import { useCallback, useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { MenuIcon, Heart, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LoginDialog } from '@/components/auth/login-dialog';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/use-login';
import { useLayoutStore } from '@/stores/layout-store';
import { useAuthStore } from '@/stores/auth-store';
import { UserInfo } from '@/types/auth';

type SiteHeaderProps = {
  initialUser?: UserInfo | null;
};

export function SiteHeader({ initialUser = null }: SiteHeaderProps) {
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

  // Sync HTML class with store theme and initialize from DOM on mount
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

  return (
    <header className="border-border bg-background/95 sticky top-0 z-30 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 md:h-20 md:px-10">
        <div className="text-primary group flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            <span className="text-foreground font-serif text-xl font-bold tracking-tight md:text-2xl">
              {t('brand')}
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          <Link
            className="text-foreground hover:text-primary text-sm font-medium tracking-wider uppercase transition-colors"
            href="#templates"
          >
            {t('templates')}
          </Link>
          <Link
            className="text-foreground hover:text-primary text-sm font-medium tracking-wider uppercase transition-colors"
            href="#pricing"
          >
            {t('pricing')}
          </Link>
          {(initialUser ?? user) ? (
            <span className="text-muted-foreground text-sm font-medium">
              {user &&
                typeof user === 'object' &&
                'name' in user &&
                typeof user.name === 'string'
                ? user.name
                : t('signedIn')}
            </span>
          ) : (
            <Link href="/login">
              <button
                className="cursor-pointer text-foreground hover:text-primary text-sm font-bold tracking-wider uppercase transition-colors"
              >
                {t('login')}
              </button>
            </Link>
          )}
          <Button
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
          </Button>
          <Button
            className="shadow-primary/20 h-10 rounded-full px-5 shadow-md"
            asChild
          >
            <Link href="/sign-up">{t('signup')}</Link>
          </Button>
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
