'use client';

import { Heart, LayoutDashboard, Users } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

export function MobileHeader() {
  const t = useTranslations('dashboard.sidebar');
  const pathname = usePathname();
  return (
    <header className="border-border/40 bg-background flex items-center justify-between border-b p-4 md:hidden">
      <div className="flex items-center gap-1">
        <Link href={ROUTES.DASHBOARD}>
          <BaseButton
            variant={pathname === ROUTES.DASHBOARD ? 'default' : 'ghost'}
            size="sm"
            className={cn(
              'gap-2',
              pathname === ROUTES.DASHBOARD
                ? 'bg-primary text-muted hover:bg-primary/90'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-xs">{t('dashboard')}</span>
          </BaseButton>
        </Link>
        <Link href={`${ROUTES.DASHBOARD}/guest-list`}>
          <BaseButton
            variant={
              pathname === `${ROUTES.DASHBOARD}/guest-list`
                ? 'default'
                : 'ghost'
            }
            size="sm"
            className={cn(
              'gap-2',
              pathname === `${ROUTES.DASHBOARD}/guest-list`
                ? 'bg-primary text-muted hover:bg-primary/90'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Users className="h-4 w-4" />
            <span className="text-xs">{t('guestList')}</span>
          </BaseButton>
        </Link>
      </div>
    </header>
  );
}
