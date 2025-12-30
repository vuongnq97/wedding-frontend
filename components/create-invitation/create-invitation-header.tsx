'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CreateInvitationHeaderProps {
  onSave: () => void;
  onPublish: () => void;
  isSaving: boolean;
  isValid: boolean;
}

import { BaseButton } from '@/components/ui/base-button';
import { Link } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';

export function CreateInvitationHeader({
  onSave,
  onPublish,
  isSaving,
  isValid,
}: CreateInvitationHeaderProps) {
  const t = useTranslations('create-invitation.actions');

  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center justify-between border-b px-4 md:px-8">
      <Link href={ROUTES.HOME} className="flex items-center gap-2">
        <div className="bg-muted flex size-8 items-center justify-center rounded-full">
          <Heart className="text-primary fill-primary h-5 w-5" />
        </div>
        <span className="text-foreground hover:text-primary font-serif text-xl font-bold tracking-tight md:text-2xl">
          WeddingInvites
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <BaseButton
          onClick={onSave}
          disabled={isSaving || !isValid}
          variant="outline"
          size="sm"
        >
          {isSaving ? t('saving') : t('save')}
        </BaseButton>
        <BaseButton
          onClick={onPublish}
          disabled={isSaving || !isValid}
          variant="default"
          size="sm"
        >
          {t('publish')}
        </BaseButton>
      </div>
    </header>
  );
}
