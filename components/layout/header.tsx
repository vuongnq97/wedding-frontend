'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { MenuIcon, Heart, Moon, Sun, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { BaseButton } from '@/components/ui/base-button';

import { useLayoutStore } from '@/stores/layout-store';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/constants/routes';
import { HEADER_NAV_LINKS } from '@/constants/navigation';
import { UserInfo } from '@/types/auth';
import { Avatar } from '@/components/ui/avatar';
import { useAuthStore } from '@/stores/auth-store';

type HeaderProps = {
  initialUser?: UserInfo | null;
};

export function Header({ initialUser = null }: HeaderProps) {
  const t = useTranslations('layout.header');
  const { toggleSidebar, toggleTheme, setTheme, theme } = useLayoutStore();
  const { hasWedding } = useAuthStore();
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(
    initialUser ?? user
  );

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

  useEffect(() => {
    if (!user) {
      setCurrentUser(null);
    } else {
      setCurrentUser(user);
    }
  }, [user]);

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
            item.authRequired ? !!currentUser : true
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
          {currentUser ? (
            <span className="text-muted-foreground space-x-2 text-sm font-bold uppercase">
              {hasWedding && (
                <Link
                  href={`${ROUTES.INVITATION}/${currentUser.userId}?edit=true`}
                >
                  <BaseButton>{t('my_invitation')}</BaseButton>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar
                    fallback={currentUser.email?.charAt(0)}
                    className={cn(
                      'bg-primary/10 hover:text-primary size-8 cursor-pointer font-bold uppercase md:size-10'
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-muted border-border"
                  align="center"
                >
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={ROUTES.LOGIN}>
                <BaseButton>{t('login')}</BaseButton>
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
    </header>
  );
}
