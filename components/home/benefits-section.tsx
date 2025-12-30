import { MonitorSmartphone, Users, Palette, Leaf } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BenefitItem } from './benefit-item';

export function BenefitsSection() {
  const t = useTranslations('home.benefits');
  return (
    <section className="bg-background-beige w-full py-10 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-primary mb-2 block text-xs font-bold tracking-widest uppercase">
              {t('label')}
            </span>
            <h2 className="text-text-main mb-6 font-serif text-4xl font-bold tracking-tight md:text-5xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed font-light">
              {t('description')}
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
              <BenefitItem
                icon={<MonitorSmartphone className="h-6 w-6" />}
                title={t('items.responsive.title')}
                description={t('items.responsive.desc')}
              />
              <BenefitItem
                icon={<Users className="h-6 w-6" />}
                title={t('items.rsvp.title')}
                description={t('items.rsvp.desc')}
              />
              <BenefitItem
                icon={<Palette className="h-6 w-6" />}
                title={t('items.customizable.title')}
                description={t('items.customizable.desc')}
              />
              <BenefitItem
                icon={<Leaf className="h-6 w-6" />}
                title={t('items.eco.title')}
                description={t('items.eco.desc')}
              />
            </div>
          </div>
          <div className="relative h-full min-h-[400px]">
            <div className="bg-primary/5 absolute inset-0 rotate-3 rounded-2xl" />
            <div className="bg-surface border-border absolute inset-0 flex flex-col overflow-hidden rounded-2xl border shadow-xl">
              <div className="bg-primary-soft/50 border-border flex items-center justify-between border-b p-6">
                <span className="text-primary font-serif font-bold">
                  {t('dashboard.preview')}
                </span>
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-300" />
                  <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  <div className="h-3 w-3 rounded-full bg-green-300" />
                </div>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
                <div className="bg-muted border-border text-muted-foreground flex h-32 w-full items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-8 w-8" />
                    <p>{t('dashboard.confirmed')}</p>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-4">
                  <div className="bg-primary/10 flex h-24 flex-col items-center justify-center rounded-lg p-4">
                    <span className="text-primary text-2xl font-bold">15</span>
                    <span className="text-muted-foreground text-xs tracking-wide uppercase">
                      {t('dashboard.days_to_go')}
                    </span>
                  </div>
                  <div className="bg-muted flex h-24 flex-col items-center justify-center rounded-lg p-4">
                    <span className="text-2xl font-bold text-blue-500">12</span>
                    <span className="text-muted-foreground text-xs tracking-wide uppercase">
                      {t('dashboard.pending_rsvp')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
