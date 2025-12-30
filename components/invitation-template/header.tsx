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
    <header className="bg-background border-border fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center justify-between border-b px-4 md:px-8">
      <div className="flex items-center gap-2">
        <div className="bg-muted flex size-8 items-center justify-center rounded-full">
          <Heart className="text-primary fill-primary h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">WeddingBuilder</span>
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
