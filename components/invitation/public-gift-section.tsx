'use client';

import { useTranslations } from 'next-intl';
import { Wallet, Banknote, Copy } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { WeddingData, BankAccount } from '@/types/invitation';

interface PublicGiftSectionProps {
    data: WeddingData;
}

export function PublicGiftSection({ data }: PublicGiftSectionProps) {
    const t = useTranslations('invitation.gift');
    const { groom: groomAccounts, bride: brideAccounts } = data.bankAccounts;

    if (groomAccounts.length === 0 && brideAccounts.length === 0) {
        return null;
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You might want to add a toast notification here
    };

    return (
        <section className="py-16 bg-white dark:bg-gray-900/50">
            <div className="layout-container max-w-[800px] mx-auto px-4 sm:px-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        {t('desc')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Groom Accounts */}
                    {groomAccounts.map((account) => (
                        <div key={account.id} className="p-6 rounded-2xl bg-background-light dark:bg-gray-800 border border-primary/10 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                    {t('groom')}
                                </p>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {account.bankName}
                                </h4>
                            </div>
                            <div className="w-12 h-[2px] bg-primary/20 my-1"></div>
                            <div className="space-y-1">
                                <p className="text-xl sm:text-2xl font-mono text-gray-800 dark:text-gray-200 tracking-wide">
                                    {account.accountNumber}
                                </p>
                                <p className="text-sm text-gray-500">{account.accountHolder}</p>
                            </div>
                            <BaseButton
                                variant="ghost"
                                className="mt-2 text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 h-auto px-2 py-1"
                                onClick={() => copyToClipboard(account.accountNumber)}
                            >
                                <Copy className="w-4 h-4" />
                                {t('copy')}
                            </BaseButton>
                        </div>
                    ))}

                    {/* Bride Accounts */}
                    {brideAccounts.map((account) => (
                        <div key={account.id} className="p-6 rounded-2xl bg-background-light dark:bg-gray-800 border border-primary/10 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative">
                            <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                                    {t('bride')}
                                </p>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {account.bankName}
                                </h4>
                            </div>
                            <div className="w-12 h-[2px] bg-primary/20 my-1"></div>
                            <div className="space-y-1">
                                <p className="text-xl sm:text-2xl font-mono text-gray-800 dark:text-gray-200 tracking-wide">
                                    {account.accountNumber}
                                </p>
                                <p className="text-sm text-gray-500">{account.accountHolder}</p>
                            </div>
                            <BaseButton
                                variant="ghost"
                                className="mt-2 text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 h-auto px-2 py-1"
                                onClick={() => copyToClipboard(account.accountNumber)}
                            >
                                <Copy className="w-4 h-4" />
                                {t('copy')}
                            </BaseButton>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
