'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseInput } from '@/components/ui/base-input';
import { Users } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface FamilySectionProps {
  data: WeddingData;
  updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function FamilySection({ data, updateField }: FamilySectionProps) {
  const t = useTranslations('create-invitation.sections.family');

  const renderFamilyInputs = (type: 'groom' | 'bride', title: string) => (
    <div className="space-y-4">
      <h4 className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
        {title}
      </h4>
      <div className="space-y-4">
        <BaseInput
          className="bg-muted focus:border-primary focus:bg-background h-auto border-transparent py-3"
          placeholder={t('fatherName')}
          value={data[type].fatherName}
          onChange={(e) => updateField([type, 'fatherName'], e.target.value)}
        />
        <BaseInput
          className="bg-muted focus:border-primary focus:bg-background h-auto border-transparent py-3"
          placeholder={t('motherName')}
          value={data[type].motherName}
          onChange={(e) => updateField([type, 'motherName'], e.target.value)}
        />
        <textarea
          className="bg-muted focus:border-primary focus:bg-background w-full resize-none rounded-lg border-transparent px-4 py-3 text-sm focus:ring-0"
          placeholder={t('address')}
          rows={3}
          value={data[type].address}
          onChange={(e) => updateField([type, 'address'], e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Users className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {renderFamilyInputs('groom', t('groomFamily'))}
        {renderFamilyInputs('bride', t('brideFamily'))}
      </div>
    </SectionWrapper>
  );
}
