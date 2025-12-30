'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Edit,
  Trash2,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Users as UsersIcon,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RsvpData, AttendingStatus } from '@/types/rsvp';
import { Avatar } from '@/components/ui/avatar';
import { BaseButton } from '@/components/ui/base-button';

interface GuestTableProps {
  guests: RsvpData[];
}

export function GuestTable({ guests }: GuestTableProps) {
  const t = useTranslations('dashboard.guestList');

  const getStatusIcon = (status: AttendingStatus) => {
    switch (status) {
      case AttendingStatus.YES:
        return CheckCircle2;
      case AttendingStatus.PENDING:
        return Clock;
      case AttendingStatus.NO:
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: AttendingStatus) => {
    switch (status) {
      case AttendingStatus.YES:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50';
      case AttendingStatus.PENDING:
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800/50';
      case AttendingStatus.NO:
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="border-border/40 bg-surface overflow-hidden rounded-xl border shadow-sm">
      <div className="scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30 h-[calc(50vh)] overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead className="bg-surface sticky top-0 z-10 shadow-[0_1px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
            <tr className="bg-muted/30">
              <th className="text-muted-foreground border-border/40 sticky top-0 border-b p-4 text-xs font-bold tracking-wider whitespace-nowrap uppercase">
                {t('tableGuest')}
              </th>
              <th className="text-muted-foreground border-border/40 sticky top-0 border-b p-4 text-xs font-bold tracking-wider whitespace-nowrap uppercase">
                {t('tableStatus')}
              </th>
              <th className="text-muted-foreground border-border/40 sticky top-0 hidden border-b p-4 text-xs font-bold tracking-wider whitespace-nowrap uppercase md:table-cell">
                {t('tableGroup')}
              </th>
              <th className="text-muted-foreground border-border/40 sticky top-0 hidden border-b p-4 text-xs font-bold tracking-wider whitespace-nowrap uppercase lg:table-cell">
                {t('tableNote')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-border/40 divide-y">
            {guests.map((guest) => {
              const StatusIcon = getStatusIcon(guest.attending);
              // Mapping status to translation key: YES -> statusAttending, NO -> statusDeclined, PENDING -> statusPending
              const statusKey =
                guest.attending === AttendingStatus.YES
                  ? 'statusAttending'
                  : guest.attending === AttendingStatus.NO
                    ? 'statusDeclined'
                    : 'statusPending';
              const statusLabel = t(statusKey);
              const hasGroup = guest.guests > 0;

              return (
                <tr
                  key={guest.id}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        fallback={guest.fullName.charAt(0)}
                        className={cn(
                          'h-10 w-10',
                          guest.attending === AttendingStatus.NO &&
                            'opacity-70 grayscale'
                        )}
                      />
                      <div className="flex flex-col overflow-hidden">
                        <p
                          className={cn(
                            'text-foreground truncate text-sm font-bold',
                            guest.attending === AttendingStatus.NO &&
                              'decoration-muted-foreground/50 line-through'
                          )}
                        >
                          {guest.fullName}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                          {guest.fullName.toLowerCase().replace(' ', '.') +
                            '@example.com'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold',
                        getStatusColor(guest.attending)
                      )}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {statusLabel}
                    </span>
                  </td>
                  <td className="hidden p-4 md:table-cell">
                    {hasGroup ? (
                      <div className="flex flex-col gap-0.5">
                        <div className="text-foreground flex items-center gap-2 text-sm font-medium">
                          <UsersIcon className="text-muted-foreground h-4 w-4" />
                          <span>
                            {t('groupAdults', { count: guest.guests })}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted-foreground flex items-center gap-2 text-sm italic">
                        <User className="h-4 w-4" />
                        <span>{t('groupPlaceholder')}</span>
                      </div>
                    )}
                  </td>
                  <td className="hidden p-4 lg:table-cell">
                    {guest.message ? (
                      <p
                        className="text-muted-foreground max-w-[200px] truncate text-sm italic"
                        title={guest.message}
                      >
                        &ldquo;{guest.message}&rdquo;
                      </p>
                    ) : (
                      <p className="text-muted-foreground/50 text-xs italic">
                        -
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
