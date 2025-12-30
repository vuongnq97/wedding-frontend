'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { WeddingData } from '@/types/invitation';
import { cn } from '@/lib/utils';
import { BaseButton } from '@/components/ui/base-button';
import { useRouter } from '@/i18n/routing';
import { ROUTES } from '@/constants/routes';

interface HeaderProps {
  data: WeddingData;
  isCreator?: boolean;
  onPublish?: () => void;
}

export function Header({ data, isCreator, onPublish }: HeaderProps) {
  const t = useTranslations('invitation.header');
  const tLayout = useTranslations('layout.header');
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

  return (
    <nav className="bg-background/90 border-border fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="layout-container flex w-full justify-center">
        <div className="flex max-w-[1280px] flex-1 justify-center px-4 py-4 md:px-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={ROUTES.HOME} className="flex items-center gap-2">
                <span className="text-foreground hover:text-primary font-serif text-xl font-bold tracking-tight md:text-2xl">
                  {tLayout('brand')}
                </span>
              </Link>
              <div
                className="group flex cursor-pointer items-center gap-2"
                onClick={() => setActiveHash('')}
              >
                <Heart className="text-primary h-6 w-6 animate-ping fill-current" />
                <h2 className="text-primary hidden text-xl font-bold tracking-tight md:block">
                  {data.groom.informalName && data.bride.informalName
                    ? `${data.groom.informalName} & ${data.bride.informalName}`
                    : t('logo')}
                </h2>
              </div>
            </div>

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
            <div className="flex items-center gap-2">
              <BaseButton
                onClick={() => {
                  router.push(ROUTES.CREATE_INVITATION);
                }}
                variant={isCreator ? 'default' : 'outline'}
                size="sm"
              >
                {isCreator ? t('createInvitation') : t('editInvitation')}
              </BaseButton>
              {!isCreator && (
                <BaseButton onClick={onPublish} variant="default" size="sm">
                  {t('publish')}
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
