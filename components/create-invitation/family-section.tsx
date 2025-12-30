'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
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
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {title}
            </h4>
            <div className="space-y-4">
                <input
                    className="w-full bg-muted border-transparent focus:border-primary focus:bg-background focus:ring-0 rounded-lg text-sm px-4 py-3"
                    placeholder={t('fatherName')}
                    value={data[type].fatherName}
                    onChange={(e) => updateField([type, 'fatherName'], e.target.value)}
                />
                <input
                    className="w-full bg-muted border-transparent focus:border-primary focus:bg-background focus:ring-0 rounded-lg text-sm px-4 py-3"
                    placeholder={t('motherName')}
                    value={data[type].motherName}
                    onChange={(e) => updateField([type, 'motherName'], e.target.value)}
                />
                <textarea
                    className="w-full bg-muted border-transparent focus:border-primary focus:bg-background focus:ring-0 rounded-lg text-sm px-4 py-3 resize-none"
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
            icon={<Users className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderFamilyInputs('groom', t('groomFamily'))}
                {renderFamilyInputs('bride', t('brideFamily'))}
            </div>
        </SectionWrapper>
    );
}
