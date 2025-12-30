'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Eye, CheckCircle2, XCircle, Users, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DashboardStat } from '@/types/dashboard';

const ICON_MAP: Record<string, LucideIcon> = {
  visibility: Eye,
  check_circle: CheckCircle2,
  cancel: XCircle,
  group: Users,
};

interface StatsGridProps {
  stats: DashboardStat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const t = useTranslations('dashboard.stats');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = ICON_MAP[stat.iconName] || Eye;

        return (
          <div
            key={index}
            className="border-border/40 bg-surface flex flex-col gap-2 rounded-xl border p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-2xl font-medium">
                {t(stat.label)}
              </p>
              <Icon
                className={cn('size-10', stat.color || 'text-primary/60')}
              />
            </div>
            <p className="text-foreground text-3xl font-bold tracking-tight">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
