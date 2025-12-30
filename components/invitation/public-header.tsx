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

interface PublicHeaderProps {
    data: WeddingData;
    isCreator?: boolean;
}

export function PublicHeader({ data, isCreator }: PublicHeaderProps) {
    const t = useTranslations('invitation.header');
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
        <nav className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border">
            <div className="layout-container flex justify-center w-full">
                <div className="px-4 md:px-10 py-4 flex flex-1 justify-center max-w-[1280px]">
                    <div className="flex items-center justify-between w-full">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-2 group cursor-pointer"
                            onClick={() => setActiveHash('')}
                        >
                            <Heart className="text-primary w-6 h-6 fill-current" />
                            <h2 className="text-xl font-bold tracking-tight text-foreground">
                                {data.groom.informalName && data.bride.informalName
                                    ? `${data.groom.informalName} & ${data.bride.informalName}`
                                    : t('logo')}
                            </h2>
                        </div>

                        {/* Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleLinkClick(link.href)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:cursor-pointer hover:text-primary",
                                        activeHash === link.href ? "text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        {isCreator ? <div className="flex items-center gap-3">
                            <BaseButton
                                onClick={() => {
                                    router.push(ROUTES.CREATE_INVITATION);
                                }}
                                variant="default"
                                size="sm"
                            >
                                {t('createInvitation')}
                            </BaseButton>
                        </div> : <div />}
                    </div>
                </div>
            </div>
        </nav>
    );
}
