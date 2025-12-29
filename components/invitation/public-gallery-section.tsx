'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { WeddingData } from '@/types/invitation';

interface PublicGallerySectionProps {
    data: WeddingData;
}

export function PublicGallerySection({ data }: PublicGallerySectionProps) {
    const t = useTranslations('invitation.gallery');

    const images = data.albumPhotos || [];

    if (images.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white dark:bg-gray-900/50" id="gallery">
            <div className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[280px]">
                    {images.map((src, index) => (
                        <div key={index} className={`rounded-xl overflow-hidden group relative ${index % 5 === 0 || index % 5 === 3 ? "row-span-2" : ""}`}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={src}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
