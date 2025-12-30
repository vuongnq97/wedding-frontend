'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { StatsGrid, InvitationCard } from '@/components/dashboard';
import { useDashboard } from '@/hooks/use-dashboard';
import { useInvitationStore } from '@/stores/invitation-store';

export default function DashboardPage() {
  const t = useTranslations('dashboard.header');
  const { stats } = useDashboard();
  const { data } = useInvitationStore();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-foreground text-3xl leading-tight font-black tracking-tight md:text-4xl">
          {t('welcome', {
            names: data?.groom.fullName + ' & ' + data?.bride.fullName,
          })}
        </h1>
        <p className="text-muted-foreground text-base font-normal">
          {t('subtitle')}
        </p>
      </div>

      <StatsGrid stats={stats} />

      <div className="flex flex-col gap-6">
        <InvitationCard />
      </div>
    </div>
  );
}
