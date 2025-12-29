'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Megaphone } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface NotificationSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function NotificationSection({ data, updateField }: NotificationSectionProps) {
    const t = useTranslations('create-invitation.sections.notification');

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Megaphone className="w-5 h-5" />}
            iconBgColor="bg-yellow-50 dark:bg-yellow-900/20"
            iconTextColor="text-yellow-600"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-gray-500">
                        {t('line1')}
                    </span>
                    <input
                        className="w-full bg-gray-50 dark:bg-white/5 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-4 py-3"
                        placeholder={t('line1Placeholder')}
                        value={data.notification.line1}
                        onChange={(e) => updateField(['notification', 'line1'], e.target.value)}
                    />
                </label>
                <label className="space-y-1.5">
                    <span className="text-xs font-semibold text-gray-500">
                        {t('line2')}
                    </span>
                    <input
                        className="w-full bg-gray-50 dark:bg-white/5 border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-4 py-3"
                        placeholder={t('line2Placeholder')}
                        value={data.notification.line2}
                        onChange={(e) => updateField(['notification', 'line2'], e.target.value)}
                    />
                </label>
            </div>
        </SectionWrapper>
    );
}
