'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { WeddingData } from '@/types/invitation';

interface GallerySectionProps {
  data: WeddingData;
}

export function GallerySection({ data }: GallerySectionProps) {
  const t = useTranslations('invitation.gallery');

  const images = data.albumPhotos || [];

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-16" id="gallery">
      <div className="layout-container mx-auto max-w-[1280px] px-4 sm:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-bold md:text-4xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-4">{t('subtitle')}</p>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[280px] md:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl ${index % 5 === 0 || index % 5 === 3 ? 'row-span-2' : ''}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
