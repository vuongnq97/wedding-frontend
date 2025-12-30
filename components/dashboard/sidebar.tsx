'use client';

import { useTranslations } from 'next-intl';
import { LayoutDashboard, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, usePathname } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';

export function Sidebar() {
  const t = useTranslations('dashboard.sidebar');
  const pathname = usePathname();

  const navItems = [
    {
      href: ROUTES.DASHBOARD,
      label: t('dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: `${ROUTES.DASHBOARD}/guest-list`,
      label: t('guestList'),
      icon: Users,
    },
  ];

  return (
    <aside className="border-border/40 bg-surface hidden h-full w-64 flex-col border-r py-6 md:flex">
      <div className="flex flex-col gap-6 px-4">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-full shadow-sm">
            <span className="text-primary text-xl font-bold">W</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-foreground text-sm leading-none font-bold">
              {t('brand')}
            </h1>
            <p className="text-muted-foreground mt-1 text-[10px]">
              {t('adminConsole')}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                )}
                href={item.href}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
