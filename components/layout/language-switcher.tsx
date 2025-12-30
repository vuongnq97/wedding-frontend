'use client';

import FlagEN from '@/components/svg/flag-en.svg';
import FlagVN from '@/components/svg/flag-vn.svg';
import { BaseButton } from '@/components/ui/base-button';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export function LanguageSwitcher() {
  const t = useTranslations('layout.header');
  const locale = useLocale();
  const pathname = usePathname();

  const nextLocale = locale === 'en' ? 'vi' : 'en';
  const nextLanguage = locale === 'en' ? 'Việt' : 'English';

  return (
    <BaseButton
      asChild
      variant="ghost"
      size="sm"
      className="h-10 w-10 rounded-full p-0 hover:bg-transparent"
      aria-label="Switch language"
      title={t('switch_language', { language: nextLanguage })}
    >
      <Link
        href={pathname}
        locale={nextLocale}
        className="flex items-center justify-center"
      >
        {locale === 'en' ? (
          <Image
            src={FlagEN}
            alt="English"
            className="border-border h-6 w-6 rounded-full border object-cover"
          />
        ) : (
          <Image
            src={FlagVN}
            alt="Vietnamese"
            className="border-border h-6 w-6 rounded-full border object-cover"
          />
        )}
      </Link>
    </BaseButton>
  );
}
