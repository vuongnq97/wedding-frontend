'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { BaseButton } from '@/components/ui/base-button';
import {
  BookOpen,
  Megaphone,
  ArrowRight,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface SectionProps {
  data: WeddingData;
  updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function ThankYouSection({ data, updateField }: SectionProps) {
  const t = useTranslations('create-invitation.sections.thankYou');
  return (
    <SectionWrapper
      title={t('title')}
      icon={<MessageCircle className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <textarea
        className="bg-muted focus:border-primary focus:bg-background w-full resize-none rounded-lg border border-transparent px-3 py-2.5 text-sm transition-all focus:ring-0"
        rows={3}
        value={data.thankYouMessage}
        onChange={(e) => updateField(['thankYouMessage'], e.target.value)}
      />
    </SectionWrapper>
  );
}

export function GuestbookSection({ data, updateField }: SectionProps) {
  const t = useTranslations('create-invitation.sections.guestbook');
  return (
    <SectionWrapper
      title={t('title')}
      icon={<BookOpen className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
      rightAction={
        <Toggle
          checked={data.guestbookEnabled}
          onChange={(val) => updateField(['guestbookEnabled'], val)}
          label={t('showSection')}
        />
      }
    >
      <div className="bg-primary/5 flex items-center gap-3 rounded-lg p-4">
        <Lightbulb className="text-primary h-5 w-5" />
        <p className="text-primary/80 text-sm">{t('description')}</p>
      </div>
    </SectionWrapper>
  );
}

export function AdsSection({ data, updateField }: SectionProps) {
  const t = useTranslations('create-invitation.sections.ads');
  return (
    <SectionWrapper
      title={t('title')}
      icon={<Megaphone className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-muted-foreground"
      rightAction={
        <span
          className={`rounded px-2 py-1 ${
            data.showAds
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          } text-[10px] font-bold tracking-wide uppercase`}
        >
          {data.showAds ? t('active') : t('disabled')}
        </span>
      }
    >
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">{t('description')}</p>
        <BaseButton
          onClick={() => updateField(['showAds'], !data.showAds)}
          className="text-primary hover:text-primary/80 flex h-auto items-center gap-1 p-0 text-sm font-bold hover:underline"
          variant="ghost"
        >
          {data.showAds ? t('removeAds') : t('enableAds')}{' '}
          <ArrowRight className="h-4 w-4" />
        </BaseButton>
      </div>
    </SectionWrapper>
  );
}
