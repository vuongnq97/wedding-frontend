'use client';

import { useTranslations } from 'next-intl';
import { WeddingData } from '@/types/invitation';

interface PublicFooterProps {
    data: WeddingData;
}

export function PublicFooter({ data }: PublicFooterProps) {
    const t = useTranslations('invitation.footer');

    const groomInitial = data.groom.informalName ? data.groom.informalName.charAt(0) : 'J';
    const brideInitial = data.bride.informalName ? data.bride.informalName.charAt(0) : 'J';

    return (
        <footer className="py-12 bg-background-dark text-white border-t border-white/10">
            <div className="layout-container max-w-[960px] mx-auto px-4 flex flex-col items-center text-center gap-6">
                <h2 className="text-3xl font-bold tracking-tight">{groomInitial} & {brideInitial}</h2>
                <div className="flex gap-6">
                    <a href="#" className="text-white/60 hover:text-white transition-colors">{t('links.instagram')}</a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">{t('links.registry')}</a>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">{t('links.contact')}</a>
                </div>
                <div className="w-16 h-[1px] bg-white/20"></div>
                <p className="text-white/40 text-sm">
                    {t('copyright')}
                </p>
            </div>
        </footer>
    );
}
