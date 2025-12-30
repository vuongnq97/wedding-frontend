'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { UserPlus, Download } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { GuestStats } from '@/components/dashboard/guest-list/guest-stats';
import { GuestFilters } from '@/components/dashboard/guest-list/guest-filters';
import { GuestTable } from '@/components/dashboard/guest-list/guest-table';
import { useDashboard } from '@/hooks/use-dashboard';

import { BasePagination } from '@/components/ui/base-pagination';

export default function GuestListPage() {
  const t = useTranslations('dashboard.guestList');
  const { wishes } = useDashboard();

  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  const paginatedWishes = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return wishes.slice(start, start + pageSize);
  }, [wishes, currentPage]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-foreground text-3xl leading-tight font-black tracking-tight md:text-4xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-base">{t('subtitle')}</p>
        </div>
        <div className="flex items-center gap-3">
          <BaseButton variant="outline" className="hidden gap-2 md:flex">
            <Download className="h-4 w-4" />
            Export
          </BaseButton>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <GuestFilters />
        <GuestTable guests={paginatedWishes} />

        <BasePagination
          currentPage={currentPage}
          totalItems={wishes.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
