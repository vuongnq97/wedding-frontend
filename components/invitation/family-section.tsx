'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { FamilyGroupCard } from './family-group-card';

interface FamilySectionProps {
  data: WeddingData;
}

export function FamilySection({ data }: FamilySectionProps) {
  const t = useTranslations('invitation.family');

  return (
    <section className="bg-surface py-16">
      <div className="layout-container mx-auto max-w-[900px] px-4 text-center sm:px-10">
        <div className="bg-primary/10 mb-4 inline-block rounded-full p-3">
          <Users className="text-primary h-8 w-8" />
        </div>
        <h2 className="text-foreground mb-2 text-3xl font-bold md:text-4xl">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mb-12 text-sm">{t('subtitle')}</p>

        <div className="relative grid items-start gap-8 md:grid-cols-2 md:gap-16">
          <div className="via-border absolute top-4 bottom-4 left-1/2 hidden w-[1px] -translate-x-1/2 bg-gradient-to-b from-transparent to-transparent md:block"></div>

          {/* Groom's Family */}
          {/* Groom's Family */}
          <FamilyGroupCard
            title={t('groomFamily')}
            subLabel={t('sonOf')}
            fatherName={data.groom.fatherName || t('parents.groomDad')}
            motherName={data.groom.motherName || t('parents.groomMom')}
          />

          {/* Bride's Family */}
          <FamilyGroupCard
            title={t('brideFamily')}
            subLabel={t('daughterOf')}
            fatherName={data.bride.fatherName || t('parents.brideDad')}
            motherName={data.bride.motherName || t('parents.brideMom')}
          />
        </div>
      </div>
    </section>
  );
}
