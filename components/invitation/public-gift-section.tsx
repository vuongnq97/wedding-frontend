'use client';

import { useTranslations } from 'next-intl';
import { Copy, Wallet, Banknote } from 'lucide-react';
import { useState } from 'react';
import { BaseButton } from '@/components/ui/base-button';
import { getVietQrUrl } from '@/utils/vietqr';
import Image from 'next/image';
import { WeddingData, BankAccount } from '@/types/invitation';

interface PublicGiftSectionProps {
    data: WeddingData;
}

export function PublicGiftSection({ data }: PublicGiftSectionProps) {
    const t = useTranslations('invitation.gift');
    const { bankAccounts } = data;
    const groomAccounts = bankAccounts?.groom || [];
    const brideAccounts = bankAccounts?.bride || [];

    if (groomAccounts.length === 0 && brideAccounts.length === 0) {
        return null;
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You might want to add a toast notification here
    };

    return (
        <section className="py-16 bg-surface">
            <div className="layout-container max-w-[800px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-foreground">
                        {t('title')}
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                        {t('desc')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Groom Accounts */}
                    {groomAccounts.map((account) => (
                        <div key={account.id} className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                    {t('groom')}
                                </p>
                                <h4 className="text-lg font-bold text-foreground">
                                    {account.bankName}
                                </h4>
                            </div>
                            <div className="w-12 h-[2px] bg-primary/20 my-1"></div>
                            <div className="space-y-1">
                                <p className="text-xl sm:text-2xl font-mono text-foreground tracking-wide">
                                    {account.accountNumber}
                                </p>
                                <p className="text-sm text-muted-foreground">{account.accountHolder}</p>
                            </div>

                            <BaseButton
                                variant="ghost"
                                className="mt-2 text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 h-auto px-2 py-1"
                                onClick={() => copyToClipboard(account.accountNumber)}
                            >
                                <Copy className="w-4 h-4" />
                                {t('copy')}
                            </BaseButton>

                            {/* Direct QR display */}
                            {getVietQrUrl(account.bankName, account.accountNumber, account.accountHolder) && (
                                <div className="mt-4 relative w-40 h-40 bg-white rounded-lg border border-border overflow-hidden">
                                    <Image
                                        src={getVietQrUrl(account.bankName, account.accountNumber, account.accountHolder)!}
                                        alt="QR Code"
                                        fill
                                        className="object-contain p-2"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Bride Accounts */}
                    {brideAccounts.map((account) => (
                        <div key={account.id} className="p-6 rounded-2xl bg-card border border-border flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative">
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                    {t('bride')}
                                </p>
                                <h4 className="text-lg font-bold text-foreground">
                                    {account.bankName}
                                </h4>
                            </div>
                            <div className="w-12 h-[2px] bg-primary/20 my-1"></div>
                            <div className="space-y-1">
                                <p className="text-xl sm:text-2xl font-mono text-foreground tracking-wide">
                                    {account.accountNumber}
                                </p>
                                <p className="text-sm text-muted-foreground">{account.accountHolder}</p>
                            </div>

                            <BaseButton
                                variant="ghost"
                                className="mt-2 text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 h-auto px-2 py-1"
                                onClick={() => copyToClipboard(account.accountNumber)}
                            >
                                <Copy className="w-4 h-4" />
                                {t('copy')}
                            </BaseButton>

                            {/* Direct QR display */}
                            {getVietQrUrl(account.bankName, account.accountNumber, account.accountHolder) && (
                                <div className="mt-4 relative w-40 h-40 bg-white rounded-lg border border-border overflow-hidden">
                                    <Image
                                        src={getVietQrUrl(account.bankName, account.accountNumber, account.accountHolder)!}
                                        alt="QR Code"
                                        fill
                                        className="object-contain p-2"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
