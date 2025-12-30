'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';

interface TemplateCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isNew?: boolean;
  isPopular?: boolean;
  isComingSoon?: boolean;
  titleOverride?: string;
  subtitleOverride?: string;
}

export function TemplateCard({
  id,
  title: _title,
  category,
  imageUrl,
  isNew,
  isPopular,
  isComingSoon,
  titleOverride,
  subtitleOverride,
}: TemplateCardProps) {
  const t = useTranslations('templates');
  const tHome = useTranslations('home.collections');

  const displayTitle = titleOverride || t(`items.${id}`);
  const displaySubtitle = subtitleOverride || t(`filters.${category}`);
  const badgeStyle = isComingSoon ? 'text-gray' : 'text-primary';
  const href = !isComingSoon ? ROUTES.INVITATION_TEMPLATE : '#';

  return (
    <Link href={href} className={cn('block', isComingSoon && 'cursor-default')}>
      <div className="group flex flex-col gap-5">
        <div className="bg-muted relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-sm">
          <div
            className="animate-scroll-y pause-on-hover h-full w-full bg-[size:100%_auto] bg-top bg-no-repeat"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <span
              className={cn(
                'bg-surface rounded-full px-6 py-3 text-sm font-bold tracking-wide uppercase shadow-xl',
                badgeStyle
              )}
            >
              {isComingSoon ? tHome('coming_soon') : tHome('preview')}
            </span>
          </div>

          {/* Corner Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isNew && (
              <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-sm">
                {t('card.new')}
              </span>
            )}
            {isPopular && (
              <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-sm">
                {t('card.popular')}
              </span>
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-text-main mb-1 truncate px-2 font-serif text-xl font-bold">
            {displayTitle}
          </h3>
          <p className="text-muted-foreground text-sm capitalize">
            {displaySubtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}
