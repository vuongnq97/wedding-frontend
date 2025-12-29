'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Calendar, MapPin, Wine, Navigation } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData } from '@/types/invitation';

interface PublicDetailsSectionProps {
    data: WeddingData;
}

export function PublicDetailsSection({ data }: PublicDetailsSectionProps) {
    const t = useTranslations('invitation.details');

    if (!data.ceremony.show && !data.map.show) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark" id="details">
            <div className="layout-container max-w-[1100px] mx-auto px-4 sm:px-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col gap-8">
                        <div>
                            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                                {t('subtitle')}
                            </p>
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                {t('title')}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                {t('desc')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Ceremony Date & Time */}
                            {data.ceremony.show && (
                                <div className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {t('time.date')}
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            {data.ceremony.date} {data.ceremony.time ? `- ${data.ceremony.time}` : ''}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Location */}
                            {data.map.show && (
                                <div className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {data.map.locationName || t('location.name')}
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            {data.map.locationAddress || t('location.address')}
                                        </p>
                                        {data.map.link && (
                                            <a
                                                href={data.map.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary text-xs font-bold mt-2 inline-block hover:underline"
                                            >
                                                {t('location.getDirections')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Reception */}
                            <div className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                <div className="bg-primary/10 text-primary p-3 rounded-lg">
                                    <Wine className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {t('reception.name')}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {data.reception.date} {data.reception.time ? `- ${data.reception.time}` : ''}
                                        <br />
                                        {data.reception.address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Image or Iframe */}
                    {data.map.show && (
                        <div className="relative h-full min-h-[400px] w-full rounded-2xl overflow-hidden shadow-xl group">
                            {/* We could use an iframe if link is embeddable, but simple image + link is safer for now if we don't parse embed URL */}
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuA4p9xRijQhvY4uX5AiwosdszKwoRzVC8aGTrLic5oRIp3uHGd4oxybjQUnOSNeqrRspjAiPLdXfAhYEjRJUlYW-nFVc14XhMIxUeo4zr_Mwv6xb92oqWM3WakQb9P4y3aK26Smz5VRYDQuIRDtkGd7PBNwgzNdf0FCevrjKRBzlJmshkhSJlsj3EJdLLkUbY_vuhttno1SdHHqlQpZklDwiUKkOCLvogzm7xVegCQyMc8BcskskTDFaCxpuENHsN3edq2XVmCnY"
                                alt="Map View"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-xl border border-white/20">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-primary uppercase">{t('venueLocation')}</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{data.map.locationName || t('location.name')}</p>
                                        </div>
                                        {data.map.link && (
                                            <BaseButton
                                                asChild
                                                className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors h-auto w-auto"
                                            >
                                                <a href={data.map.link} target="_blank" rel="noopener noreferrer">
                                                    <Navigation className="w-4 h-4" />
                                                </a>
                                            </BaseButton>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
