'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BaseButton } from '@/components/ui/base-button';
import { BaseInput } from '@/components/ui/base-input';
import { ButtonCopy } from '@/components/ui/button-copy';
import { MOCK_INVITATION } from '@/constants/dashboard';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';
import { useInvitationStore } from '@/stores/invitation-store';

export function InvitationCard() {
  const t = useTranslations('dashboard.invitation');
  const { data } = useInvitationStore();

  return (
    <div className="border-border/40 bg-surface overflow-hidden rounded-xl border shadow-sm">
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div>
          <div className="mb-2 flex items-start justify-between">
            <h2 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
              {t('title', {
                names: data.groom.fullName + ' & ' + data.bride.fullName,
              })}
            </h2>
            <Badge
              variant="default"
              className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {t(MOCK_INVITATION.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">
            {t('template', { name: t(MOCK_INVITATION.templateName) })}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('lastEdited', { time: t(MOCK_INVITATION.lastEdited) })}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground text-sm font-medium">
            {t('publicLink')}
          </label>
          <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-dashed shadow-sm">
            <BaseInput
              value={MOCK_INVITATION.link}
              readOnly
              disabled
              className="rounded-r-none bg-transparent focus:ring-0"
            />
            <ButtonCopy
              value={MOCK_INVITATION.link}
              className="rounded-none border-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2 md:flex-row md:gap-3">
          <Link href={ROUTES.INVITATION}>
            <BaseButton className="w-full flex-1 gap-2 md:w-auto">
              <ExternalLink className="h-4 w-4" />
              {t('preview')}
            </BaseButton>
          </Link>
          <Link href={ROUTES.INVITATION}>
            <BaseButton
              variant="outline"
              className="w-full flex-1 gap-2 md:w-auto"
            >
              <Edit className="h-4 w-4" />
              {t('editDetails')}
            </BaseButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
