'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import Toggle from '@/components/ui/toggle';
import { Calendar, PartyPopper, Lightbulb } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface EventDetailsSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: any) => void;
}

import { useTranslations } from 'next-intl';

export function EventDetailsSection({
    data,
    updateField,
}: EventDetailsSectionProps) {
    const t = useTranslations('create-invitation.sections.events');

    return (
        <>
            {/* Ceremony */}
            <SectionWrapper
                title={t('ceremony')}
                icon={<Calendar className="w-5 h-5" />}
                iconBgColor="bg-orange-50 dark:bg-orange-900/20"
                iconTextColor="text-orange-600"
                rightAction={
                    <Toggle
                        checked={data.ceremony.show}
                        onChange={(val) => updateField(['ceremony', 'show'], val)}
                        label={t('showSection')}
                    />
                }
            >
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <label className="flex flex-col w-full md:w-1/2">
                        <span className="text-xs font-medium text-gray-500 mb-1.5">
                            {t('date')}
                        </span>
                        <input
                            className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                            type="date"
                            value={data.ceremony.date}
                            onChange={(e) =>
                                updateField(['ceremony', 'date'], e.target.value)
                            }
                        />
                    </label>
                    <label className="flex flex-col w-full md:w-1/2">
                        <span className="text-xs font-medium text-gray-500 mb-1.5">
                            {t('time')}
                        </span>
                        <input
                            className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                            type="time"
                            value={data.ceremony.time}
                            onChange={(e) =>
                                updateField(['ceremony', 'time'], e.target.value)
                            }
                        />
                    </label>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                    <p className="text-xs text-primary/80 leading-relaxed">
                        Enable this if you are holding a ceremony separately from the
                        reception.
                    </p>
                </div>
            </SectionWrapper>

            {/* Reception */}
            <SectionWrapper
                title={t('reception')}
                icon={<PartyPopper className="w-5 h-5" />}
                iconBgColor="bg-pink-50 dark:bg-pink-900/20"
                iconTextColor="text-pink-600"
            >
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <label className="flex flex-col w-full md:w-1/2">
                        <span className="text-xs font-medium text-gray-500 mb-1.5">
                            {t('date')}
                        </span>
                        <input
                            className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                            type="date"
                            value={data.reception.date}
                            onChange={(e) =>
                                updateField(['reception', 'date'], e.target.value)
                            }
                        />
                    </label>
                    <label className="flex flex-col w-full md:w-1/2">
                        <span className="text-xs font-medium text-gray-500 mb-1.5">
                            {t('time')}
                        </span>
                        <input
                            className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 transition-all"
                            type="time"
                            value={data.reception.time}
                            onChange={(e) =>
                                updateField(['reception', 'time'], e.target.value)
                            }
                        />
                    </label>
                </div>
                <label className="flex flex-col w-full">
                    <span className="text-xs font-medium text-gray-500 mb-1.5">
                        {t('address')}
                    </span>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-black focus:ring-0 rounded-lg text-sm px-3 py-2.5 resize-none transition-all"
                        rows={2}
                        value={data.reception.address}
                        onChange={(e) =>
                            updateField(['reception', 'address'], e.target.value)
                        }
                    />
                </label>
            </SectionWrapper>
        </>
    );
}
