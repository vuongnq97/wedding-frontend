import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function FeedbackSection() {
  const t = useTranslations('home.feedback');
  const items = [
    {
      key: 'emily',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA8vNhtAFri8Zd1xCdyPif4nCeMZ-yxYfHgJEjyWVRJbF2BQAcr6sMHTCqGWNn2R86_dDzAzFLRv5tYHo6YSK6UwTDDCS-Cho8_FllS0jo3xKeTjBtk5nY5fX7mDKqWsCy6tCchXdMTpt55AJWBXkgoLuctUQjscq1Y_FQ78_fpEB_xuq0sScsyTWZPoaI9J-eagl6zLx9-TDFxjwuyCjA8mbakprAKTqJjxIOhKwPkTZe4gH_CHplcBFE9WafiwwtNElgr69qqeaI',
    },
    {
      key: 'sophia',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5ZPsVQvQNHCYxTWn4aDHQoc0Xw50pxG_wFrRDro3sPIkY8myDoYTGzYL0nAAXzllDQfiJYwZ4ACN1HiafX1_QACfUKsh_33or-5HFYB6U5pJNjj05jSQTAo9ugZ0X2pQCeXx5ZpsEQIwkK3Yl5lPOrRAsU1A0aRLSmmnF8nH-bLwLVvqod7JA7kKR-hOA-SCEqMZR7MTxh4LBEdNSF-pbwc6H7ogxy9lJG84fXcdXaeTXF3etnJB2KT2KyuaDU7O3tOdFc_fTdf8',
    },
  ];
  return (
    <section className="bg-surface border-border w-full border-t py-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-10">
        <div className="mb-12 text-center">
          <h2 className="text-text-main font-serif text-3xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.key}
              className="bg-background border-border flex flex-col gap-4 rounded-2xl border p-8"
            >
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 stroke-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                “{t(`items.${item.key}.quote`)}”
              </p>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.avatar}')` }}
                  />
                </div>
                <div>
                  <h4 className="text-foreground font-serif font-bold">
                    {t(`items.${item.key}.name`)}
                  </h4>
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {t(`items.${item.key}.date`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
