'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BaseButton } from './base-button';
import { useTranslations } from 'next-intl';

export interface BasePaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function BasePagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: BasePaginationProps) {
  const t = useTranslations('dashboard.guestList');
  const totalPages = Math.ceil(totalItems / pageSize);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  if (totalItems === 0) return null;

  return (
    <div
      className={cn(
        'border-border/40 bg-muted/20 flex flex-col items-center justify-between gap-4 rounded-xl border p-4 text-sm sm:flex-row',
        className
      )}
    >
      <p className="text-muted-foreground font-medium">
        {t('paginationShowing')}{' '}
        <span className="text-foreground font-bold">
          {startItem}-{endItem}
        </span>{' '}
        {t('paginationOf')}{' '}
        <span className="text-foreground font-bold">{totalItems}</span>{' '}
        {t('paginationGuests')}
      </p>
      <div className="flex items-center gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="border-border/40 hover:bg-surface gap-1 rounded-lg font-semibold"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t('paginationPrevious')}</span>
        </BaseButton>

        <div className="flex items-center gap-1">
          {/* Premium page indicator */}
          <div className="bg-primary/5 border-primary/20 text-primary flex h-9 min-w-[2.5rem] items-center justify-center rounded-lg border px-3 font-bold shadow-sm transition-all">
            {currentPage}
          </div>
          <span className="text-muted-foreground/40 px-1 font-medium italic">
            /
          </span>
          <div className="text-muted-foreground/60 flex h-9 min-w-[2.5rem] items-center justify-center rounded-lg border border-transparent px-3 font-medium">
            {totalPages}
          </div>
        </div>

        <BaseButton
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="border-border/40 hover:bg-surface gap-1 rounded-lg font-semibold"
        >
          <span className="hidden sm:inline">{t('paginationNext')}</span>
          <ChevronRight className="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
  );
}
