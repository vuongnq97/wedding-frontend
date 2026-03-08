'use client';

import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const router = useRouter();
  const { user } = useAuthStore();
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <div className="relative flex min-h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
          <Image
            src="https://nemxdyzricahljljahim.supabase.co/storage/v1/object/public/wedding-assets/cover.jpg"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          <div className="relative z-10 mt-12 flex max-w-4xl flex-col items-center px-4 text-center">
            <p className="mb-2 font-serif text-xl tracking-wide text-white/95 italic drop-shadow-md md:text-2xl">
              {t('names')}
            </p>
            <div className="mb-8 h-px w-16 bg-white/60" />
            <h1
              className="mb-8 font-serif text-5xl leading-tight font-bold tracking-tight text-white drop-shadow-lg md:text-7xl"
              dangerouslySetInnerHTML={{ __html: t.raw('title') }}
            />
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed font-light text-white/95 drop-shadow-md md:text-xl">
              {t('subtitle')}
            </p>
            <BaseButton
              onClick={() => {
                if (user) {
                  router.push(`${ROUTES.MANAGE_INVITATION}?create=true`);
                } else {
                  router.push(ROUTES.LOGIN);
                }
              }}
              className="shadow-primary/40 h-14 px-10 text-lg transition-all hover:-translate-y-1 hover:scale-[1.02]"
            >
              {t('cta')}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}
