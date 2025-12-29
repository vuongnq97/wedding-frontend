import { Bed, Car, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BaseButton } from '@/components/ui/base-button';

export function MapSection() {
    const t = useTranslations('invitation-template.map');

    return (
        <section className="bg-background w-full px-6 py-20">
            <div className="bg-surface mx-auto flex max-w-6xl flex-col gap-10 overflow-hidden rounded-2xl p-2 shadow-sm md:flex-row">
                {/* Map Area */}
                <div className="bg-muted relative min-h-[400px] w-full overflow-hidden rounded-xl md:w-2/3">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80"
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSsMnFL9NHMt3aiJ4WEeLZFJoeih4rWVAmPff36DIFn6peM9JiQjieXXCYIRWV24pV42nLbcPPlD2DZjIONtGijEPk0InEcumDbHpuEAo_W78_7sFASdsoZ8_GnRyo1V41Bzibo_RoPGqiYp3Y5C_G4XfpWzH7C2sU8kO9fScs0W9SC59e1Ne6bs_wm93ouNef7OG4JuoJU73h5R_UYx3tfrsXKj2Xle3-h-APCP1mU6abe_of-uI_8jdJtVjFjdKCx89vdg9ELT8")',
                        }}
                    ></div>
                    {/* Interactive Map UI Overlay */}
                    <div className="absolute left-4 right-4 top-4 md:w-80">
                        <div className="bg-surface flex items-center rounded-lg p-2 shadow-lg">
                            <span className="material-symbols-outlined text-muted-foreground ml-2">
                                search
                            </span>
                            <input
                                className="text-foreground w-full border-none bg-transparent text-sm font-medium focus:ring-0"
                                readOnly
                                type="text"
                                value="Rosewood Estate, Napa Valley"
                            />
                        </div>
                    </div>
                    {/* Map Pin */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <MapPin className="text-primary h-12 w-12 drop-shadow-md fill-current" />
                    </div>
                </div>

                {/* Text Details */}
                <div className="flex w-full flex-col justify-center p-6 md:w-1/3 md:pr-10">
                    <span className="text-primary mb-2 text-xs font-bold tracking-wider uppercase">
                        {t('identifier')}
                    </span>
                    <h3 className="text-foreground mb-4 text-2xl font-bold">
                        {t('title')}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {t('address_line1')}
                        <br />
                        {t('address_line2')}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                                <Bed className="text-primary h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-foreground text-sm font-bold">
                                    {t('accommodations.title')}
                                </h4>
                                <p className="text-muted-foreground mt-0.5 text-xs">
                                    {t('accommodations.description')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-lg p-2">
                                <Car className="text-primary h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-foreground text-sm font-bold">
                                    {t('parking.title')}
                                </h4>
                                <p className="text-muted-foreground mt-0.5 text-xs">
                                    {t('parking.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <BaseButton className="w-full rounded-lg border-2 py-3 font-bold">
                        {t('getDirections')}
                    </BaseButton>
                </div>
            </div>
        </section>
    );
}
