'use client';

import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface GuestbookSectionProps {
  data: WeddingData;
}

export function GuestbookSection({ data }: GuestbookSectionProps) {
  const t = useTranslations('invitation.guestbook');

  if (!data.guestbookEnabled) {
    return null;
  }

  const wishes = ['wish1', 'wish2', 'wish3'].map((key) => ({
    text: t(`wishes.${key}.text`),
    initials: t(`wishes.${key}.initials`),
    name: t(`wishes.${key}.name`),
    rel: t(`wishes.${key}.rel`),
  }));

  return (
    <section className="bg-background py-16" id="wishes">
      <div className="layout-container mx-auto max-w-[1280px] px-4 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-4">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className="bg-surface border-border relative rounded-xl border p-6 shadow-sm"
            >
              <Quote className="text-primary/20 absolute top-6 right-6 h-8 w-8 fill-current" />
              <p className="text-foreground mb-6 leading-relaxed italic">
                {wish.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
                  {wish.initials}
                </div>
                <div>
                  <p className="text-foreground text-sm font-bold">
                    {wish.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{wish.rel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
