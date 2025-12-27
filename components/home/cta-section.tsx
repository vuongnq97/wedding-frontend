import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function CtaSection() {
  const t = useTranslations('home.cta');
  return (
    <section className="bg-background w-full px-4 py-20">
      <div className="bg-surface border-border relative mx-auto max-w-4xl overflow-hidden rounded-3xl border p-10 text-center shadow-xl md:p-20">
        <div className="via-primary absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-transparent to-transparent" />
        <h2 className="text-text-main mb-6 font-serif text-3xl font-bold tracking-tight md:text-5xl">
          {t('title')}
        </h2>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-lg font-light md:text-xl">
          {t('subtitle')}
        </p>
        <Button className="shadow-primary/20 h-14 px-12 text-lg transition-transform hover:scale-105">
          {t('button')}
        </Button>
        <p className="text-muted-foreground mt-6 text-sm">{t('note')}</p>
      </div>
    </section>
  );
}
