'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BaseButton } from '@/components/ui/base-button';
import { ROUTES } from '@/constants/routes';
import { useRouter } from '@/i18n/routing';

export function Header() {
    const t = useTranslations('invitation-template');
    const router = useRouter();


    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-[60px] flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary fill-primary" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                    WeddingBuilder
                </span>
            </div>

            <div className="flex items-center gap-3">
                <BaseButton
                    onClick={() => {
                        router.push(ROUTES.CREATE_INVITATION);
                    }}
                    variant="default"
                    size="sm"
                >
                    {t('createInvitation')}
                </BaseButton>
            </div>
        </header>
    );
}
