'use client';

import { useTranslations } from 'next-intl';
import { WeddingData } from '@/types/invitation';
import { useEffect, useState } from 'react';

interface PublicCountdownSectionProps {
    data: WeddingData;
}

export function PublicCountdownSection({ data }: PublicCountdownSectionProps) {
    const t = useTranslations('invitation.countdown');
    const [counts, setCounts] = useState([
        { value: '00', label: t('days') },
        { value: '00', label: t('hours') },
        { value: '00', label: t('minutes') },
        { value: '00', label: t('seconds') },
    ]);

    useEffect(() => {
        const targetDate = data.ceremony.date ? new Date(data.ceremony.date + ' ' + (data.ceremony.time || '00:00')) : new Date();

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setCounts([
                    { value: String(days).padStart(2, '0'), label: t('days') },
                    { value: String(hours).padStart(2, '0'), label: t('hours') },
                    { value: String(minutes).padStart(2, '0'), label: t('minutes') },
                    { value: String(seconds).padStart(2, '0'), label: t('seconds') },
                ]);
            } else {
                setCounts([
                    { value: '00', label: t('days') },
                    { value: '00', label: t('hours') },
                    { value: '00', label: t('minutes') },
                    { value: '00', label: t('seconds') },
                ]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data.ceremony.date, data.ceremony.time, t]);

    return (
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark relative">
            <div className="layout-container max-w-[960px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-12">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                        {t('subtitle')}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 justify-center">
                    {counts.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 group">
                            <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full border-2 border-primary/20 bg-white dark:bg-gray-800 shadow-sm group-hover:border-primary group-hover:shadow-primary/20 transition-all duration-300">
                                <span className="text-3xl md:text-4xl font-bold text-primary">
                                    {item.value}
                                </span>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
