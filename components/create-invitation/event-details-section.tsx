'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { BaseInput } from '@/components/ui/base-input';
import { Calendar, PartyPopper, Lightbulb, Clock } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface EventDetailsSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function EventDetailsSection({
  data,
  updateField,
}: EventDetailsSectionProps) {
  const t = useTranslations('manage-invitation.sections.events');

  return (
    <>
      {/* Ceremony */}
      <SectionWrapper
        title={t('ceremony')}
        icon={<Calendar className="h-5 w-5" />}
        iconBgColor="bg-muted"
        iconTextColor="text-primary"
        rightAction={
          <Toggle
            checked={data?.ceremony?.show ?? true}
            onChange={(val) => updateField(['ceremony', 'show'], val)}
            label={t('showSection')}
          />
        }
      >
        {(data?.ceremony?.show ?? true) && (
          <>
            <div className="mb-4 flex flex-col gap-4 md:flex-row">
              <BaseInput
                containerClassName="w-full md:w-1/2"
                label={t('date')}
                className="bg-muted focus:border-primary focus:bg-background border-transparent"
                type="date"
                value={
                  data?.ceremony?.date instanceof Date
                    ? data.ceremony.date.toISOString().split('T')[0]
                    : ''
                }
                onChange={(e) =>
                  updateField(['ceremony', 'date'], new Date(e.target.value))
                }
                rightIcon={<Calendar className="h-4 w-4" />}
              />
              <BaseInput
                containerClassName="w-full md:w-1/2"
                label={t('time')}
                className="bg-muted focus:border-primary focus:bg-background border-transparent"
                type="time"
                value={data?.ceremony?.time || ''}
                onChange={(e) =>
                  updateField(['ceremony', 'time'], e.target.value)
                }
                rightIcon={<Clock className="h-4 w-4" />}
              />
            </div>
            <div className="bg-primary/5 flex items-start gap-2 rounded-lg p-3">
              <Lightbulb className="text-primary mt-0.5 h-4 w-4" />
              <p className="text-primary/80 text-xs leading-relaxed">
                {t('separateCeremonyHint')}
              </p>
            </div>
          </>
        )}
      </SectionWrapper>

      {/* Reception */}
      <SectionWrapper
        title={t('reception')}
        icon={<PartyPopper className="h-5 w-5" />}
        iconBgColor="bg-muted"
        iconTextColor="text-primary"
      >
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <BaseInput
            containerClassName="w-full md:w-1/2"
            label={t('date')}
            className="bg-muted focus:border-primary focus:bg-background border-transparent"
            type="date"
            value={
              data?.reception?.date instanceof Date
                ? data.reception.date.toISOString().split('T')[0]
                : ''
            }
            onChange={(e) =>
              updateField(['reception', 'date'], new Date(e.target.value))
            }
            rightIcon={<Calendar className="h-4 w-4" />}
          />
          <BaseInput
            containerClassName="w-full md:w-1/2"
            label={t('time')}
            className="bg-muted focus:border-primary focus:bg-background border-transparent"
            type="time"
            value={data?.reception?.time || ''}
            onChange={(e) => updateField(['reception', 'time'], e.target.value)}
            rightIcon={<Clock className="h-4 w-4" />}
          />
        </div>
        <label className="flex w-full flex-col">
          <span className="text-muted-foreground mb-1.5 text-xs font-medium">
            {t('address')}
          </span>
          <textarea
            className="bg-muted focus:border-primary focus:bg-background w-full resize-none rounded-lg border border-transparent px-3 py-2.5 text-sm transition-all focus:ring-0"
            rows={2}
            value={data?.reception?.address || ''}
            onChange={(e) =>
              updateField(['reception', 'address'], e.target.value)
            }
          />
        </label>
      </SectionWrapper>
    </>
  );
}
