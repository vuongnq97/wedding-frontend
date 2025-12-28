import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';

export function CollectionsSection() {
  const t = useTranslations('home.collections');
  const items = [
    {
      key: 'floral',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDmU_vAxpZPdVv_KOYGm4cX1NtjAU5NFCU9VsgNPMBP-PnMr3Rcg6xX7FuIigYWY5x8yl4GH1wdBBChliYfIvXiPHUJXSiESoyHjfjHusFa_wws16BL4dx4jqJw3tEMz-w3dz1YObuikY7pLBLwiM0oPkay5vDejcX-vzR2u9XUnJ59uLysOD5qzd4p0B8KYXWsLR9XzX8eMkSH-OW_YiztvBuJVZvyBrYY7rtVEZ1mgVyHcYtcz6KkbDZ0sOmHcSkafBrLxVkMta0',
    },
    {
      key: 'modern',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBGsnSpLWqa0Gsrl6gTy2joR4TEFCH4Wj9awRoBxGBJpmulzv05cR1GobKMDd09Zw1KNvW_cEwDEzMYkyzEAsvkX7HYiuPahMI-ktkYXcqPCieVK3W0PVgDGjhGVFwjXU4E6XT5plgnsgUlvaI7iO4SUUqKVlt0soAkfhIDUzJysFyIRIb201TnJxGN9eSHQyqVBHi_BfUIpo6hxui0f5mJsOs5aHOGXpzCrLGfoMszI9VsONMkcxdX_JZ9gFYIKKjmWtBkPKps7hc',
    },
    {
      key: 'boho',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBEQDTw6oW24i50FLgBETih1-Ztvf_EohJ3z-oBns1zM7uR9R_wqLXoZSWKis9vRVV66OSJQNSKQRvxOZPBcX3An8jdOUGQSyMOMfDJOxzLGms8p2NDjtnhi0ZjLzgSsPlzyN5HUXaFN5WbCjjow2Cl0zOei9cm7t9o9XLpMHA4NDhQsObCQz_KIc1mU0lOG7qOzXEV66vfbT2wY_AGa7eJ83DYjsfTX33COO06NczxE3RTwoJ3uOxtlQfI5LOLk7eZDqRgpMOxOrc',
    },
    {
      key: 'midnight',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuANBn2Pcd2XceU9uJeEGAnAJFxTTIvk33vCVeNWnbpOPDFxT15z-wZd2Frjjrgd_WDLFCG1TQfkT35uY54Iud2Yg1iwQzTHHO801UOf6T8SC6itLW-VjrtdaYs-1IC1uJZoI_VT_31dlTvCDx4-kA8bYyVOb5tEjq4se1GhCc7I5LcSYi5FHYBz9HHqMXCWJ6iX1MQMkuNIst-kS-MnB9PcqyO9cXvS71cr4LlU7lU0tTs_d7PdePqnSC8AgMLZCFJ_V5uA-FneHSI',
    },
  ];

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
          {items.map((c) => (
            <div
              key={c.key}
              className="group flex cursor-pointer flex-col gap-5"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-sm">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${c.image}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="bg-surface text-primary rounded-full px-6 py-3 text-sm font-bold tracking-wide uppercase shadow-xl">
                    {t('preview')}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-text-main mb-1 font-serif text-xl font-bold">
                  {t(`items.${c.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t(`items.${c.key}.subtitle`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <BaseButton
            variant="outline"
            className="rounded-full px-8 py-3 font-bold tracking-wider uppercase"
          >
            {t('view_all')}
          </BaseButton>
        </div>
      </div>
    </section>
  );
}
