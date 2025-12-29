'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface PublicCoupleSectionProps {
    data: WeddingData;
}

export function PublicCoupleSection({ data }: PublicCoupleSectionProps) {
    const t = useTranslations('invitation.couple');

    return (
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900/50" id="couple">
            <div className="layout-container max-w-[960px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-16">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                        {t('subtitle')}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Groom */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-[6px] border-white dark:border-gray-800 shadow-xl mb-6 relative ring-1 ring-gray-100 dark:ring-gray-700">
                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                                {data.groom.photoUrl ? (
                                    <Image
                                        src={data.groom.photoUrl}
                                        alt={data.groom.fullName || "Groom"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {data.groom.fullName || t('groom.name')}
                        </h3>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px]">
                            {data.groom.birthOrder}
                        </p>
                        <p className="text-primary font-medium tracking-wide uppercase text-xs">
                            {t('groom.role')}
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs text-sm leading-relaxed italic">
                            {t('groom.bio')}
                        </p>
                    </div>

                    {/* Bride */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-[6px] border-white dark:border-gray-800 shadow-xl mb-6 relative ring-1 ring-gray-100 dark:ring-gray-700">
                            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                                {data.bride.photoUrl ? (
                                    <Image
                                        src={data.bride.photoUrl}
                                        alt={data.bride.fullName || "Bride"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {data.bride.fullName || t('bride.name')}
                        </h3>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px]">
                            {data.bride.birthOrder}
                        </p>
                        <p className="text-primary font-medium tracking-wide uppercase text-xs">
                            {t('bride.role')}
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs text-sm leading-relaxed italic">
                            {t('bride.bio')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
