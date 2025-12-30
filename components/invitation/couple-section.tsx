'use client';

import { useTranslations } from 'next-intl';
import { WeddingData } from '@/types/invitation';
import { CoupleProfileCard } from './couple-profile';

interface CoupleSectionProps {
  data: WeddingData;
}

export function CoupleSection({ data }: CoupleSectionProps) {
  const t = useTranslations('invitation.couple');

  return (
    <section className="bg-background py-10 md:py-24" id="couple">
      <div className="layout-container mx-auto max-w-[960px] px-4 sm:px-10">
        <div className="mb-16 text-center">
          <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
            {t('subtitle')}
          </p>
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 items-center gap-4 md:gap-12">
          <CoupleProfileCard
            photoUrl={data.groom.photoUrl}
            fullName={data.groom.fullName}
            birthOrder={data.groom.birthOrder}
            role={t('groom.role')}
            bio={t('groom.bio')}
            fallbackName={t('groom.name')}
          />

          <CoupleProfileCard
            photoUrl={data.bride.photoUrl}
            fullName={data.bride.fullName}
            birthOrder={data.bride.birthOrder}
            role={t('bride.role')}
            bio={t('bride.bio')}
            fallbackName={t('bride.name')}
          />
        </div>
      </div>
    </section>
  );
}
