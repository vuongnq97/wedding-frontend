'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { Gift, Plus, Trash2 } from 'lucide-react';
import { WeddingData, BankAccount } from '@/types/invitation';
import { BaseInput } from '@/components/ui/base-input';

interface GiftSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
}

import { useTranslations } from 'next-intl';

export function GiftSection({ data, updateField }: GiftSectionProps) {
  const t = useTranslations('manage-invitation.sections.gift');

  // if (!data) return null; // Removed

  const bankAccounts = data?.bankAccounts || [];

  // 0 for Groom, 1 for Bride
  const ownerMap = { groom: 0, bride: 1 };

  const addAccount = (type: 'groom' | 'bride') => {
    const newAccount: BankAccount = {
      id: crypto.randomUUID(),
      bankName: '',
      accountNumber: '',
      accountHolder: '',
      owner: ownerMap[type],
    };
    updateField(['bankAccounts'], [...bankAccounts, newAccount]);
  };

  const updateAccount = (
    id: string | undefined,
    field: keyof BankAccount,
    value: string
  ) => {
    if (!id) return;
    const updatedAccounts = bankAccounts.map((acc) =>
      acc.id === id ? { ...acc, [field]: value } : acc
    );
    updateField(['bankAccounts'], updatedAccounts);
  };

  const removeAccount = (id: string | undefined) => {
    if (!id) return;
    const updatedAccounts = bankAccounts.filter((acc) => acc.id !== id);
    updateField(['bankAccounts'], updatedAccounts);
  };

  const renderAccountList = (type: 'groom' | 'bride', title: string) => {
    const accounts = bankAccounts.filter((acc) => acc.owner === ownerMap[type]);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-foreground text-sm font-semibold">{title}</h4>
        </div>
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border-border bg-muted group relative rounded-lg border p-3"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <BaseInput
                className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
                placeholder={t('bankName')}
                value={account.bankName}
                onChange={(e) =>
                  updateAccount(account.id, 'bankName', e.target.value)
                }
              />
              <BaseInput
                className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
                placeholder={t('accountNumber')}
                value={account.accountNumber}
                onChange={(e) =>
                  updateAccount(account.id, 'accountNumber', e.target.value)
                }
              />
              <BaseInput
                className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
                placeholder={t('accountHolder')}
                value={account.accountHolder}
                onChange={(e) =>
                  updateAccount(account.id, 'accountHolder', e.target.value)
                }
              />
            </div>
            <BaseButton
              onClick={() => removeAccount(account.id)}
              className="absolute -top-2 -right-2 h-6 w-6 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
              variant="danger"
              size="icon"
            >
              <Trash2 className="h-3 w-3" />
            </BaseButton>
          </div>
        ))}
        {accounts.length === 0 && (
          <div className="border-border text-muted-foreground rounded-lg border-2 border-dashed py-4 text-center text-xs">
            {t('noAccounts')}
          </div>
        )}
        <BaseButton
          onClick={() => addAccount(type)}
          className="h-12 w-full"
          variant="dashed"
        >
          <Plus className="h-5 w-5" /> {t('addBankAccount')}
        </BaseButton>
      </div>
    );
  };

  return (
    <SectionWrapper
      title={t('title')}
      icon={<Gift className="h-5 w-5" />}
      iconBgColor="bg-muted"
      iconTextColor="text-primary"
    >
      <div className="space-y-6">
        {renderAccountList('groom', t('groomFamily'))}
        <div className="bg-border h-px"></div>
        {renderAccountList('bride', t('brideFamily'))}
      </div>
    </SectionWrapper>
  );
}
