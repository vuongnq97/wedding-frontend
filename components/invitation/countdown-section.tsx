'use client';

import { useTranslations } from 'next-intl';
import { WeddingData } from '@/types/invitation';
import { useEffect, useState } from 'react';

interface CountdownSectionProps {
  data: WeddingData;
}

export function CountdownSection({ data }: CountdownSectionProps) {
  const t = useTranslations('invitation.countdown');
  const [counts, setCounts] = useState([
    { value: '00', label: t('days') },
    { value: '00', label: t('hours') },
    { value: '00', label: t('minutes') },
    { value: '00', label: t('seconds') },
  ]);

  useEffect(() => {
    console.log(data.ceremony.date, data.ceremony.time);
    const targetDate = data.ceremony.date
      ? new Date(data.ceremony.date + ' ' + (data.ceremony.time || '00:00'))
      : new Date();

    console.log(targetDate);
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
    <section className="bg-background relative py-16 md:py-24">
      <div className="layout-container mx-auto max-w-[960px] px-4 sm:px-10">
        <div className="mb-12 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
            {t('subtitle')}
          </p>
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 justify-center gap-4 md:grid-cols-4 md:gap-8">
          {counts.map((item, index) => (
            <div key={index} className="group flex flex-col items-center gap-2">
              <div className="border-primary/20 bg-surface group-hover:border-primary group-hover:shadow-primary/20 flex h-24 w-24 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 md:h-32 md:w-32">
                <span className="text-primary text-3xl font-bold md:text-4xl">
                  {item.value}
                </span>
              </div>
              <span className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
