'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { WeddingData, InvitationMode } from '@/types/invitation';
import { cn } from '@/lib/utils';
import { getFirstName } from '@/utils/string';
import { BaseButton } from '@/components/ui/base-button';
import { useRouter } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth-store';

interface HeaderProps {
  data?: WeddingData | null;
  mode: InvitationMode;
  onPublish?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  isValid?: boolean;
}

export function Header({
  data,
  mode,
  onPublish,
  onSave,
  isSaving,
  isValid,
}: HeaderProps) {
  const t = useTranslations('invitation.header');
  const tManage = useTranslations('manage-invitation');
  const tLayout = useTranslations('layout.header');
  const { hasWedding } = useAuthStore();
  const [activeHash, setActiveHash] = useState('');
  const router = useRouter();
  const links = [
    { href: '#couple', label: t('nav.couple') },
    { href: '#story', label: t('nav.story') },
    { href: '#details', label: t('nav.details') },
    { href: '#gallery', label: t('nav.gallery') },
  ];

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
  };

  const isEditor = mode === 'create' || mode === 'edit';

  return (
    <nav className="bg-background/90 border-border fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="layout-container flex w-full justify-center">
        <div className="flex max-w-[1280px] flex-1 justify-center px-4 py-4 md:px-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={ROUTES.HOME} className="flex items-center gap-2">
                <div className="bg-muted flex size-8 items-center justify-center rounded-full">
                  <Heart className="text-primary fill-primary h-5 w-5" />
                </div>
                <span className="text-foreground hover:text-primary font-serif text-xl font-bold tracking-tight md:text-2xl">
                  {isEditor ? tManage('brand') : tLayout('brand')}
                </span>
              </Link>

              {!isEditor && data && (
                <div
                  className="group flex cursor-pointer items-center gap-2"
                  onClick={() => setActiveHash('')}
                >
                  <Heart className="text-primary h-6 w-6 animate-ping fill-current" />
                  <h2 className="text-primary hidden text-xl font-bold tracking-tight uppercase md:block">
                    {data.groom?.fullName && data.bride?.fullName
                      ? `${getFirstName(data.groom.fullName)} & ${getFirstName(data.bride.fullName)}`
                      : t('logo')}
                  </h2>
                </div>
              )}
            </div>

            {!isEditor && (
              <div className="hidden items-center gap-8 md:flex">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      'hover:text-primary text-sm font-medium transition-colors hover:cursor-pointer',
                      activeHash === link.href
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              {mode === 'template' && !hasWedding && (
                <BaseButton
                  onClick={() =>
                    router.push(`${ROUTES.MANAGE_INVITATION}?create=true`)
                  }
                  variant="default"
                  size="sm"
                >
                  {t('createInvitation')}
                </BaseButton>
              )}

              {mode === 'create' && (
                <>
                  <BaseButton
                    onClick={onSave}
                    disabled={isSaving || !isValid}
                    variant="outline"
                    size="sm"
                  >
                    {isSaving
                      ? tManage('actions.saving')
                      : tManage('actions.saveAndPreview')}
                  </BaseButton>
                  <BaseButton
                    onClick={onPublish}
                    disabled={isSaving || !isValid}
                    variant="default"
                    size="sm"
                  >
                    {tManage('actions.publish')}
                  </BaseButton>
                </>
              )}

              {mode === 'preview' && (
                <>
                  <BaseButton
                    onClick={() => router.push(ROUTES.MANAGE_INVITATION)}
                    variant="outline"
                    size="sm"
                  >
                    {t('continueEdit')}
                  </BaseButton>

                  <BaseButton
                    onClick={onPublish}
                    disabled={isSaving}
                    variant="default"
                    size="sm"
                  >
                    {tManage('actions.publish')}
                  </BaseButton>
                </>
              )}
              {mode === 'edit' && (
                <BaseButton
                  onClick={onSave}
                  disabled={isSaving || !isValid}
                  variant="default"
                  size="sm"
                >
                  {isSaving
                    ? tManage('actions.saving')
                    : tManage('actions.save')}
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
