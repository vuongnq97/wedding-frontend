'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { BaseButton } from '@/components/ui/base-button';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { WeddingData } from '@/types/invitation';

interface PublicHeroSectionProps {
    data: WeddingData;
}

export function PublicHeroSection({ data }: PublicHeroSectionProps) {
    const t = useTranslations('invitation.hero');

    return (
        <header className="mt-[60px] relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
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
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
                <p className="text-white/90 text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-4">
                    {t('tagline')}
                </p>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 drop-shadow-lg">
                    {data.groom.informalName && data.bride.informalName
                        ? `${data.groom.informalName} & ${data.bride.informalName}`
                        : t('title')}
                </h1>
                <div className="mt-4 flex flex-col items-center gap-2">
                    <span className="text-white text-xl font-medium tracking-wide">
                        {data.ceremony.date || t('date')}
                    </span>
                    <span className="w-16 h-[2px] bg-primary"></span>
                    <span className="text-white/80 text-sm uppercase tracking-widest">
                        {data.ceremony.show ? "WEDDING CEREMONY" : "SAVE THE DATE"}
                    </span>
                </div>

                <BaseButton
                    asChild
                    className="mt-8 gap-2 bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl shadow-xl shadow-primary/30 transform hover:-translate-y-1 h-auto"
                >
                    <Link href="#rsvp">
                        <span className="font-bold text-base">{t('cta')}</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </BaseButton>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
                <ChevronDown className="w-10 h-10" />
            </div>
        </header>
    );
}
