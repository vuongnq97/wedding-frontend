'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { BaseInput } from '@/components/ui/base-input';

export function GuestFilters() {
  const t = useTranslations('dashboard.guestList');

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <BaseInput placeholder={t('searchPlaceholder')} className="pl-10" />
      </div>
    </div>
  );
}
