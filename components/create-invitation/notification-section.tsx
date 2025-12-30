'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseInput } from '@/components/ui/base-input';
import { Megaphone } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface NotificationSectionProps {
  data: WeddingData;
  updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function NotificationSection({
  data,
  updateField,
}: NotificationSectionProps) {
  const t = useTranslations('create-invitation.sections.notification');

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Megaphone className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BaseInput
          label={t('line1')}
          className="bg-muted focus:border-primary focus:bg-background h-auto w-full border-transparent py-3"
          placeholder={t('line1Placeholder')}
          value={data.notification.line1}
          onChange={(e) =>
            updateField(['notification', 'line1'], e.target.value)
          }
        />
        <BaseInput
          label={t('line2')}
          className="bg-muted focus:border-primary focus:bg-background h-auto w-full border-transparent py-3"
          placeholder={t('line2Placeholder')}
          value={data.notification.line2}
          onChange={(e) =>
            updateField(['notification', 'line2'], e.target.value)
          }
        />
      </div>
    </SectionWrapper>
  );
}
