'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { WeddingData, Milestone } from '@/types/invitation';

interface PublicStorySectionProps {
    data: WeddingData;
}

export function PublicStorySection({ data }: PublicStorySectionProps) {
    const t = useTranslations('invitation.story');

    // Sort milestones by date (assuming ISO string or YYYY-MM-DD) or just use order
    // For now we use the order in array.
    const milestones = data.milestones || [];

    if (!milestones || milestones.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white dark:bg-gray-900/50" id="story">
            <div className="layout-container max-w-[1024px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-16">
                    <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">{t('subtitle')}</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
                </div>

                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-1/2 md:-translate-x-[1px] space-y-12">
                    {milestones.map((milestone: Milestone, index: number) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={milestone.id} className="relative pl-8 md:pl-0">
                                <div className="absolute top-0 -left-2 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-900 shadow-md"></div>
                                <div className={`md:flex ${isEven ? '' : 'md:flex-row-reverse'} items-center justify-between gap-10 group`}>
                                    <div className={`md:w-1/2 ${isEven ? 'md:text-right' : ''}`}>
                                        <div className={`relative h-48 md:h-64 rounded-xl overflow-hidden shadow-md mb-4 md:mb-0 w-full md:w-4/5 ${isEven ? 'ml-auto' : 'mr-auto'}`}>
                                            {milestone.photoUrl ? (
                                                <Image
                                                    src={milestone.photoUrl}
                                                    alt={milestone.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-400">No Image</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`flex-1 ${isEven ? 'md:w-1/2 flex flex-col justify-center' : 'md:text-right flex flex-col justify-center'}`}>
                                        <span className="text-primary font-bold text-sm uppercase tracking-wide">{milestone.date}</span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2">{milestone.title}</h3>
                                        <p className={`text-gray-600 dark:text-gray-400 leading-relaxed max-w-md ${isEven ? '' : 'ml-auto'}`}>{milestone.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
