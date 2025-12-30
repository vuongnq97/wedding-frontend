'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Users, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RsvpData, AttendingStatus } from '@/types/rsvp';

interface GuestStatsProps {
  guests: RsvpData[];
}

export function GuestStats({ guests }: GuestStatsProps) {
  const t = useTranslations('dashboard.guestList');

  const stats = [
    {
      label: t('statusAll'),
      value: guests.length,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: t('statusAttending'),
      value: guests.filter((g) => g.attending === AttendingStatus.YES).length,
      icon: CheckCircle2,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: t('statusPending'),
      value: guests.filter((g) => g.attending === AttendingStatus.PENDING)
        .length,
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: t('statusDeclined'),
      value: guests.filter((g) => g.attending === AttendingStatus.NO).length,
      icon: XCircle,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="border-border/40 bg-surface flex items-center gap-4 rounded-xl border p-4 shadow-sm"
          >
            <div
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                stat.bgColor
              )}
            >
              <Icon className={cn('h-6 w-6', stat.color)} />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                {stat.label}
              </p>
              <p className="text-foreground text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
