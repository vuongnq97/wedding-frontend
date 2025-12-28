'use client';

import FlagEN from '@/components/svg/flag-en.svg';
import FlagVN from '@/components/svg/flag-vn.svg';
import { BaseButton } from '@/components/ui/base-button';
import { Link, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    const nextLocale = locale === 'en' ? 'vi' : 'en';

    return (
        <BaseButton
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full w-10 h-10 p-0 hover:bg-transparent"
            aria-label="Switch language"
            title={locale === 'en' ? 'Switch to Vietnamese' : 'Switch to English'}
        >
            <Link href={pathname} locale={nextLocale} className="flex items-center justify-center">
                {locale === 'en' ? (
                    <Image
                        src={FlagEN}
                        alt="English"
                        className="h-6 w-6 rounded-full object-cover border border-border"
                    />
                ) : (
                    <Image
                        src={FlagVN}
                        alt="Vietnamese"
                        className="h-6 w-6 rounded-full object-cover border border-border"
                    />
                )}
            </Link>
        </BaseButton>
    );
}
