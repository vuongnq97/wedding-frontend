'use client';

import { useMemo, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { AttendingStatus } from '@/types/rsvp';
import { DashboardStat } from '@/types/dashboard';
import { useRsvp } from '@/hooks/use-rsvp';

export const useDashboard = () => {
  const locale = useLocale();
  const { wishes, fetchData } = useRsvp();

  useEffect(() => {
    fetchData(locale);
  }, [locale, fetchData]);

  const stats: DashboardStat[] = useMemo(() => {
    const approvedWishes = wishes.filter(
      (w) => w.attending === AttendingStatus.YES
    );
    const agreedCount = approvedWishes.length;
    const declinedCount = wishes.filter(
      (w) => w.attending === AttendingStatus.NO
    ).length;
    const totalGuestsNum = approvedWishes.reduce((sum, w) => sum + w.guests, 0);

    return [
      {
        label: 'rsvpAgreed',
        value: agreedCount,
        footerText: 'confirmedGuests',
        iconName: 'check_circle',
        color: 'text-emerald-500',
      },
      {
        label: 'rsvpDeclined',
        value: declinedCount,
        footerText: 'cannotAttend',
        iconName: 'cancel',
        color: 'text-rose-500',
      },
      {
        label: 'totalGuests',
        value: totalGuestsNum,
        iconName: 'group',
        color: 'text-blue-500',
      },
    ];
  }, [wishes]);

  return { wishes, stats };
};
