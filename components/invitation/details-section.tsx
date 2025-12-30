'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Calendar, MapPin, Wine, Navigation } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData } from '@/types/invitation';

interface DetailsSectionProps {
  data: WeddingData;
}

export function DetailsSection({ data }: DetailsSectionProps) {
  const t = useTranslations('invitation.details');

  if (!data.ceremony.show && !data.map.show) {
    return null;
  }

  return (
    <section className="bg-background py-16 md:py-24" id="details">
      <div className="layout-container mx-auto max-w-[1100px] px-4 sm:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-primary mb-2 text-xs font-bold tracking-widest uppercase">
                {t('subtitle')}
              </p>
              <h2 className="text-foreground mb-6 text-3xl font-bold md:text-5xl">
                {t('title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t('desc')}
              </p>
            </div>

            <div className="space-y-6">
              {/* Ceremony Date & Time */}
              {data.ceremony.show && (
                <div className="bg-card border-border flex items-start gap-4 rounded-xl border p-4 shadow-sm">
                  <div className="bg-primary/10 text-primary rounded-lg p-3">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-foreground text-lg font-bold">
                      {t('time.date')}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {data.ceremony.date}{' '}
                      {data.ceremony.time ? `- ${data.ceremony.time}` : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* Location */}
              {data.map.show && (
                <div className="bg-card border-border flex items-start gap-4 rounded-xl border p-4 shadow-sm">
                  <div className="bg-primary/10 text-primary rounded-lg p-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-foreground text-lg font-bold">
                      {data.map.locationName || t('location.name')}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {data.map.locationAddress || t('location.address')}
                    </p>
                    {data.map.link && (
                      <a
                        href={data.map.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary mt-2 inline-block text-xs font-bold hover:underline"
                      >
                        {t('location.getDirections')}
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Reception */}
              <div className="bg-card border-border flex items-start gap-4 rounded-xl border p-4 shadow-sm">
                <div className="bg-primary/10 text-primary rounded-lg p-3">
                  <Wine className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-foreground text-lg font-bold">
                    {t('reception.name')}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {data.reception.date}{' '}
                    {data.reception.time ? `- ${data.reception.time}` : ''}
                    <br />
                    {data.reception.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Image or Iframe */}
          {data.map.show && (
            <div className="group relative h-full min-h-[400px] w-full overflow-hidden rounded-2xl shadow-xl">
              {/* We could use an iframe if link is embeddable, but simple image + link is safer for now if we don't parse embed URL */}
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuA4p9xRijQhvY4uX5AiwosdszKwoRzVC8aGTrLic5oRIp3uHGd4oxybjQUnOSNeqrRspjAiPLdXfAhYEjRJUlYW-nFVc14XhMIxUeo4zr_Mwv6xb92oqWM3WakQb9P4y3aK26Smz5VRYDQuIRDtkGd7PBNwgzNdf0FCevrjKRBzlJmshkhSJlsj3EJdLLkUbY_vuhttno1SdHHqlQpZklDwiUKkOCLvogzm7xVegCQyMc8BcskskTDFaCxpuENHsN3edq2XVmCnY"
                alt="Map View"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>

              <div className="absolute right-6 bottom-6 left-6">
                <div className="bg-background/90 rounded-xl border border-white/20 p-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary text-xs font-bold uppercase">
                        {t('venueLocation')}
                      </p>
                      <p className="text-foreground text-sm font-medium">
                        {data.map.locationName || t('location.name')}
                      </p>
                    </div>
                    {data.map.link && (
                      <BaseButton
                        asChild
                        className="bg-primary hover:bg-primary/90 h-auto w-auto rounded-lg p-2 text-white transition-colors"
                      >
                        <a
                          href={data.map.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-4 w-4" />
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
