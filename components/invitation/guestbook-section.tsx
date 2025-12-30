import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { WeddingData } from '@/types/invitation';
import { useRsvp } from '@/hooks/use-rsvp';

interface GuestbookSectionProps {
  data: WeddingData;
}

export function GuestbookSection({ data }: GuestbookSectionProps) {
  const t = useTranslations('invitation.guestbook');
  const { wishes, fetchData } = useRsvp();

  const locale = useLocale();

  useEffect(() => {
    fetchData(locale);
  }, [fetchData, locale]);

  if (!data.guestbookEnabled) {
    return null;
  }

  return (
    <section className="bg-background py-16" id="wishes">
      <div className="layout-container mx-auto max-w-[1280px] px-4 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-4">{t('subtitle')}</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {wishes.map((wish, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="bg-surface border-border relative h-full rounded-xl border p-6 shadow-sm">
                <Quote className="text-primary/20 absolute top-6 right-6 h-8 w-8 fill-current" />
                <p className="text-foreground mb-6 leading-relaxed italic">
                  {wish.message}
                </p>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 text-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
                    {wish.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold">
                      {wish.fullName}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {wish.attending === 'yes'
                        ? t('attending.yes')
                        : t('attending.no')}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
