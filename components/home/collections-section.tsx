import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';
import { TEMPLATES } from '@/constants/templates';
import { useLocale } from 'next-intl';
import { TemplateCard } from '@/components/templates/template-card';

export function CollectionsSection() {
  const t = useTranslations('home.collections');
  const locale = useLocale();
  const defaultTemplates = [
    {
      id: '1',
      title: 'Modern Elegance',
      category: 'modern',
      imageUrl: `/images/templates/template-1-${locale === 'vi' ? 'vi' : 'en'}.png`,
      isNew: true,
    },
    ...TEMPLATES,
  ];
  console.log({ defaultTemplates });
  return (
    <section className="bg-background w-full py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-10">
        <div className="mb-16 text-center">
          <span className="text-primary mb-2 block text-xs font-bold tracking-widest uppercase">
            {t('label')}
          </span>
          <h2 className="text-text-main mb-4 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg font-light">
            {t('description')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {defaultTemplates.slice(0, 4).map((c) => (
            <TemplateCard
              key={c.id}
              {...c}
              titleOverride={t(`items.${c.category}.title`)}
              subtitleOverride={t(`items.${c.category}.subtitle`)}
            />
          ))}
        </div>
        <Link href={ROUTES.TEMPLATES} className="mt-16 flex justify-center">
          <BaseButton
            variant="outline"
            className="rounded-full px-8 py-3 font-bold tracking-wider uppercase"
          >
            {t('view_all')}
          </BaseButton>
        </Link>
      </div>
    </section>
  );
}
