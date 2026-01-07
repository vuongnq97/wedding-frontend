import { Link } from '@/i18n/routing';
import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

type FooterProps = {
  className?: string;
  year: number;
};

export function Footer({ className, year }: FooterProps) {
  const t = useTranslations('layout.footer');

  return (
    <footer className={cn('bg-background w-full border-t py-16', className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-10">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
          <div className="flex max-w-sm flex-col items-center gap-6 md:items-start">
            <div className="text-primary flex items-center gap-2">
              <Heart className="text-primary h-7 w-7" />
              <span className="text-foreground font-serif text-xl font-bold tracking-tight">
                {t('brand')}
              </span>
            </div>
            <p className="text-muted-foreground text-center text-base leading-relaxed md:text-left">
              {t('description')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h4 className="text-foreground font-serif text-lg font-bold">
                {t('product')}
              </h4>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('templates')}
              </Link>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('pricing')}
              </Link>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('features')}
              </Link>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h4 className="text-foreground font-serif text-lg font-bold">
                {t('company')}
              </h4>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('about')}
              </Link>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('contact')}
              </Link>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h4 className="text-foreground font-serif text-lg font-bold">
                {t('legal')}
              </h4>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('terms')}
              </Link>
              <Link
                className="text-muted-foreground hover:text-primary text-sm transition-colors"
                href="#"
              >
                {t('privacy')}
              </Link>
            </div>
          </div>
        </div>
        <div className="border-border mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-center text-xs md:text-left">
            {t('copyright', { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
