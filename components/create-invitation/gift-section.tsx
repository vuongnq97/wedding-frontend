'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { BaseButton } from '@/components/ui/base-button';
import { Gift, Plus, Trash2 } from 'lucide-react';
import { WeddingData, BankAccount } from '@/types/invitation';
import { BaseInput } from '@/components/ui/base-input';

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
        <h4 className="text-foreground text-sm font-semibold">{title}</h4>
      </div>
      {data.bankAccounts[type].map((account, index) => (
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
                updateAccount(type, index, 'bankName', e.target.value)
              }
            />
            <BaseInput
              className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
              placeholder={t('accountNumber')}
              value={account.accountNumber}
              onChange={(e) =>
                updateAccount(type, index, 'accountNumber', e.target.value)
              }
            />
            <BaseInput
              className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
              placeholder={t('accountHolder')}
              value={account.accountHolder}
              onChange={(e) =>
                updateAccount(type, index, 'accountHolder', e.target.value)
              }
            />
          </div>
          <BaseButton
            onClick={() => removeAccount(type, index)}
            className="absolute -top-2 -right-2 h-6 w-6 p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
            variant="danger"
            size="icon"
          >
            <Trash2 className="h-3 w-3" />
          </BaseButton>
        </div>
      ))}
      {data.bankAccounts[type].length === 0 && (
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
