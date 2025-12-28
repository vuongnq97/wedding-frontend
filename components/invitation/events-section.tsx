import { GlassWater, Music } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HeartIcon } from '@/components/svg/heart-icon';

export function EventsSection() {
    const t = useTranslations('invitation.events');

    return (
        <section className="bg-muted w-full px-6 py-20">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 text-center">
                    <h2 className="text-foreground mb-4 text-3xl font-bold">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground">{t('date')}</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="bg-primary/20 absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform"></div>

                    <div className="space-y-12">
                        {/* Event 1 */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 pr-8 text-right">
                                <span className="bg-primary/10 text-muted-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold">
                                    {t('ceremony.time')}
                                </span>
                                <h3 className="text-foreground text-xl font-bold">
                                    {t('ceremony.title')}
                                </h3>
                                <p className="text-muted-foreground mt-1">
                                    {t('ceremony.description')}
                                </p>
                            </div>
                            <div className="absolute left-1/2 flex -translate-x-1/2 transform flex-col items-center">
                                <div className="bg-primary/10 ring-background z-10 flex size-12 items-center justify-center rounded-full text-[#e8305e] ring-4">
                                    <HeartIcon />
                                </div>
                            </div>
                            <div className="w-5/12 pl-8"></div>
                        </div>

                        {/* Event 2 */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 pr-8 text-right"></div>
                            <div className="absolute left-1/2 flex -translate-x-1/2 transform flex-col items-center">
                                <div className="bg-primary/10 ring-background z-10 flex size-12 items-center justify-center rounded-full text-[#e8305e] ring-4">
                                    <GlassWater className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="w-5/12 pl-8 text-left">
                                <span className="bg-primary/10 text-muted-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold">
                                    {t('cocktail.time')}
                                </span>
                                <h3 className="text-foreground text-xl font-bold">
                                    {t('cocktail.title')}
                                </h3>
                                <p className="text-muted-foreground mt-1">
                                    {t('cocktail.description')}
                                </p>
                            </div>
                        </div>

                        {/* Event 3 */}
                        <div className="relative flex items-center justify-between">
                            <div className="w-5/12 pr-8 text-right">
                                <span className="bg-primary/10 text-muted-foreground mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold">
                                    {t('reception.time')}
                                </span>
                                <h3 className="text-foreground text-xl font-bold">
                                    {t('reception.title')}
                                </h3>
                                <p className="text-muted-foreground mt-1">
                                    {t('reception.description')}
                                </p>
                            </div>
                            <div className="absolute left-1/2 flex -translate-x-1/2 transform flex-col items-center">
                                <div className="bg-primary/10 ring-background z-10 flex size-12 items-center justify-center rounded-full text-[#e8305e] ring-4">
                                    <Music className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="w-5/12 pl-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

