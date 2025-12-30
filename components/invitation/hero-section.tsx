'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { BaseButton } from '@/components/ui/base-button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { WeddingData } from '@/types/invitation';

interface HeroSectionProps {
  data: WeddingData;
}

export function HeroSection({ data }: HeroSectionProps) {
  const t = useTranslations('invitation.hero');
  const locale = useLocale();

  const formatDate = (dateString?: string) => {
    if (!dateString) return t('date');
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
        date
      );
    } catch {
      return dateString;
    }
  };

  return (
    <header className="relative mt-[60px] flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden">
      {/* Background with Parallax effect */}
      <div className="absolute inset-0 z-0">
        {data.heroBannerUrl ? (
          <Image
            src={data.heroBannerUrl}
            alt="Wedding Couple"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-300">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
      </div>

      <div className="animate-fade-in-up relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.3em] text-white/90 uppercase md:text-base">
          {t('tagline')}
        </p>
        <h1 className="mb-6 font-serif text-6xl font-bold text-white drop-shadow-lg md:text-8xl lg:text-9xl">
          {data.groom.informalName && data.bride.informalName
            ? `${data.groom.informalName} & ${data.bride.informalName}`
            : t('title')}
        </h1>
        <div className="mt-4 flex flex-col items-center gap-2">
          <span className="text-xl font-medium tracking-wide text-white">
            {formatDate(data.ceremony.date)}
          </span>
          <span className="bg-primary h-[2px] w-16"></span>
          <span className="text-sm tracking-widest text-white/80 uppercase">
            {data.ceremony.show ? 'WEDDING CEREMONY' : 'SAVE THE DATE'}
          </span>
        </div>

        <BaseButton
          asChild
          className="bg-primary hover:bg-primary/90 shadow-primary/30 mt-8 h-auto transform gap-2 rounded-xl px-8 py-6 shadow-xl hover:-translate-y-1"
        >
          <Link href="#rsvp">
            <span className="text-base font-bold">{t('cta')}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </BaseButton>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
        <ChevronDown className="h-10 w-10" />
      </div>
    </header>
  );
}
