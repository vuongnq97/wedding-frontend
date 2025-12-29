'use client';

import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { WeddingData } from '@/types/invitation';

interface PublicHeaderProps {
    data: WeddingData;
}

export function PublicHeader({ data }: PublicHeaderProps) {
    const t = useTranslations('invitation.header');

    const links = [
        { href: '#couple', label: t('nav.couple') },
        { href: '#story', label: t('nav.story') },
        { href: '#details', label: t('nav.details') },
        { href: '#gallery', label: t('nav.gallery') },
    ];

    return (
        <nav className="fixed top-0 z-50 w-full bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-primary/10 dark:border-primary/20">
            <div className="layout-container flex justify-center w-full">
                <div className="px-4 md:px-10 py-4 flex flex-1 justify-center max-w-[1280px]">
                    <div className="flex items-center justify-between w-full">
                        {/* Logo */}
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <Heart className="text-primary w-6 h-6 fill-current" />
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
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
                                    className="text-sm font-medium hover:text-primary transition-colors hover:cursor-pointer"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* RSVP Button */}
                        <Link
                            href="#rsvp"
                            className="hidden sm:flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                        >
                            {t('rsvp')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
