'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { WeddingData } from '@/types/invitation';

interface PublicFamilySectionProps {
    data: WeddingData;
}

export function PublicFamilySection({ data }: PublicFamilySectionProps) {
    const t = useTranslations('invitation.family');

    return (
        <section className="py-16 bg-background-light dark:bg-background-dark">
            <div className="layout-container max-w-[900px] mx-auto px-4 sm:px-10 text-center">
                <div className="inline-block bg-primary/10 p-3 rounded-full mb-4">
                    <Users className="text-primary w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('title')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-12">
                    {t('subtitle')}
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative items-start">
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent -translate-x-1/2"></div>

                    {/* Groom's Family */}
                    <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display uppercase tracking-widest text-xs text-primary">
                            {t('groomFamily')}
                        </h3>
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px]">
                                {t('sonOf')}
                            </p>
                            <div className="font-display">
                                <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-light">
                                    {data.groom.fatherName || t('parents.groomDad')}
                                </p>
                                <p className="text-primary dark:text-primary/70 text-lg py-1">&</p>
                                <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-light">
                                    {data.groom.motherName || t('parents.groomMom')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bride's Family */}
                    <div className="flex flex-col gap-4 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-800/50 transition-colors duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display uppercase tracking-widest text-xs text-primary">
                            {t('brideFamily')}
                        </h3>
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest text-[10px]">
                                {t('daughterOf')}
                            </p>
                            <div className="font-display">
                                <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-light">
                                    {data.bride.fatherName || t('parents.brideDad')}
                                </p>
                                <p className="text-primary dark:text-primary/70 text-lg py-1">&</p>
                                <p className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-light">
                                    {data.bride.motherName || t('parents.brideMom')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
