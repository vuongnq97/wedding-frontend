'use client';

import { useTranslations } from 'next-intl';
import { WeddingData } from '@/types/invitation';
import { getFirstName } from '@/utils/string';

interface FooterProps {
  data: WeddingData;
}

export function Footer({ data }: FooterProps) {
  const t = useTranslations('invitation.footer');

  return (
    <footer className="bg-background-dark border-t border-white/10 py-12 text-white">
      <div className="layout-container mx-auto flex max-w-[960px] flex-col items-center gap-6 px-4 text-center uppercase">
        <h2 className="text-3xl font-bold tracking-tight">
          {getFirstName(data.groom.fullName)} &{' '}
          {getFirstName(data.bride.fullName)}
        </h2>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white/60 transition-colors hover:text-white"
          >
            {t('links.instagram')}
          </a>
          <a
            href="#"
            className="text-white/60 transition-colors hover:text-white"
          >
            {t('links.registry')}
          </a>
          <a
            href="#"
            className="text-white/60 transition-colors hover:text-white"
          >
            {t('links.contact')}
          </a>
        </div>
        <div className="h-[1px] w-16 bg-white/20"></div>
        <p className="text-sm text-white/40">
          {t('copyright', {
            name: `${getFirstName(data.groom.fullName)} & ${getFirstName(data.bride.fullName)}`,
          })}
        </p>
      </div>
    </footer>
  );
}
