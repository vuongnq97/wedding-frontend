'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Gift, Plus, Trash2 } from 'lucide-react';
import { WeddingData, BankAccount } from '@/types/invitation';

interface GiftSectionProps {
    data: WeddingData;
    updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function GiftSection({ data, updateField }: GiftSectionProps) {
    const t = useTranslations('create-invitation.sections.gift');

    const addAccount = (type: 'groom' | 'bride') => {
        const newAccount: BankAccount = {
            id: crypto.randomUUID(),
            bankName: '',
            accountNumber: '',
            accountHolder: '',
        };
        updateField(
            ['bankAccounts', type],
            [...data.bankAccounts[type], newAccount]
        );
    };

    const updateAccount = (
        type: 'groom' | 'bride',
        index: number,
        field: keyof BankAccount,
        value: string
    ) => {
        const updatedAccounts = [...data.bankAccounts[type]];
        updatedAccounts[index] = { ...updatedAccounts[index], [field]: value };
        updateField(['bankAccounts', type], updatedAccounts);
    };

    const removeAccount = (type: 'groom' | 'bride', index: number) => {
        const updatedAccounts = data.bankAccounts[type].filter(
            (_, i) => i !== index
        );
        updateField(['bankAccounts', type], updatedAccounts);
    };

    const renderAccountList = (type: 'groom' | 'bride', title: string) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                    {title}
                </h4>
            </div>
            {data.bankAccounts[type].map((account, index) => (
                <div
                    key={account.id}
                    className="p-3 rounded-lg border border-border bg-muted relative group"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                            className="bg-surface border border-border rounded px-2 py-1.5 text-xs w-full"
                            placeholder={t('bankName')}
                            value={account.bankName}
                            onChange={(e) =>
                                updateAccount(type, index, 'bankName', e.target.value)
                            }
                        />
                        <input
                            className="bg-surface border border-border rounded px-2 py-1.5 text-xs w-full"
                            placeholder={t('accountNumber')}
                            value={account.accountNumber}
                            onChange={(e) =>
                                updateAccount(type, index, 'accountNumber', e.target.value)
                            }
                        />
                        <input
                            className="bg-surface border border-border rounded px-2 py-1.5 text-xs w-full"
                            placeholder={t('accountHolder')}
                            value={account.accountHolder}
                            onChange={(e) =>
                                updateAccount(type, index, 'accountHolder', e.target.value)
                            }
                        />
                    </div>
                    <button
                        onClick={() => removeAccount(type, index)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            ))}
            {data.bankAccounts[type].length === 0 && (
                <div className="text-center py-4 border-2 border-dashed border-border rounded-lg text-xs text-muted-foreground">
                    {t('noAccounts')}
                </div>
            )}
            <button
                onClick={() => addAccount(type)}
                className="w-full h-12 border border-dashed border-border rounded-lg flex items-center justify-center gap-2 hover:bg-muted hover:border-primary transition-all text-sm font-medium text-muted-foreground"
            >
                <Plus className="w-5 h-5" /> {t('addBankAccount')}
            </button>
        </div>
    );

    return (
        <SectionWrapper
            title={t('title')}
            icon={<Gift className="w-5 h-5" />}
            iconBgColor="bg-muted"
            iconTextColor="text-primary"
        >
            <div className="space-y-6">
                {renderAccountList('groom', t('groomFamily'))}
                <div className="h-px bg-border"></div>
                {renderAccountList('bride', t('brideFamily'))}
            </div>
        </SectionWrapper>
    );
}
