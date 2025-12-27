import { Grid3X3, Edit3, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ProcessSection() {
  const t = useTranslations('home.process');
  const steps = [
    { icon: Grid3X3, key: 'choose' },
    { icon: Edit3, key: 'fill' },
    { icon: Send, key: 'share' },
  ];
  return (
    <section className="bg-surface relative w-full overflow-hidden py-20 md:py-32">
      <div className="bg-primary-soft pointer-events-none absolute top-0 left-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl" />
      <div className="bg-muted pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full opacity-50 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-10">
        <div className="flex flex-col gap-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-primary mb-2 block text-xs font-bold tracking-widest uppercase">
              {t('label')}
            </span>
            <h2 className="text-text-main mb-6 font-serif text-4xl font-bold tracking-tight md:text-5xl">
              {t('title')}
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              {t('description')}
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            <div className="via-primary/20 absolute top-12 right-[16%] left-[16%] hidden h-[2px] bg-gradient-to-r from-transparent to-transparent md:block" />
            {steps.map((s) => (
              <div
                key={s.key}
                className="relative flex flex-col items-center text-center"
              >
                <div className="bg-background-light border-primary/20 text-primary z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full border shadow-sm">
                  <s.icon className="h-10 w-10" />
                </div>
                <h3 className="text-text-main mb-3 font-serif text-2xl font-bold">
                  {t(`steps.${s.key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`steps.${s.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
