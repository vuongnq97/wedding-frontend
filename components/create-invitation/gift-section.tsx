'use client';

import React from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { Gift } from 'lucide-react';
import { WeddingData, BankAccount } from '@/types/invitation';
import { BaseInput } from '@/components/ui/base-input';
import { useTranslations } from 'next-intl';

interface GiftSectionProps {
  data: WeddingData | null;
  updateField: (path: string[], value: unknown) => void;
}

export function GiftSection({ data, updateField }: GiftSectionProps) {
  const t = useTranslations('manage-invitation.sections.gift');

  const bankAccounts = data?.bankAccounts || [];

  const ownerMap = { groom: 0, bride: 1 };

  const handleUpdate = (
    type: 'groom' | 'bride',
    field: keyof BankAccount,
    value: string
  ) => {
    const ownerId = ownerMap[type];
    const existingAccountIndex = bankAccounts.findIndex(
      (acc) => acc.owner === ownerId
    );

    if (existingAccountIndex !== -1) {
      // Update existing
      const updatedAccounts = [...bankAccounts];
      updatedAccounts[existingAccountIndex] = {
        ...updatedAccounts[existingAccountIndex],
        [field]: value,
      };
      updateField(['bankAccounts'], updatedAccounts);
    } else {
      // Create new
      const newAccount: BankAccount = {
        id: crypto.randomUUID(),
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        owner: ownerId,
        [field]: value,
      };
      updateField(['bankAccounts'], [...bankAccounts, newAccount]);
    }
  };

  const renderAccountRow = (type: 'groom' | 'bride', title: string) => {
    const account = bankAccounts.find(
      (acc) => acc.owner === ownerMap[type]
    ) || {
      bankName: '',
      accountNumber: '',
      accountHolder: '',
    };

    return (
      <div className="space-y-3">
        <h4 className="text-foreground text-sm font-semibold">{title}</h4>
        <div className="border-border bg-muted rounded-lg border p-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <BaseInput
              className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
              placeholder={t('bankName')}
              value={account.bankName}
              onChange={(e) => handleUpdate(type, 'bankName', e.target.value)}
            />
            <BaseInput
              className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
              placeholder={t('accountNumber')}
              value={account.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                handleUpdate(type, 'accountNumber', value);
              }}
            />
            <BaseInput
              className="bg-surface border-border h-8 w-full rounded px-2 text-xs"
              placeholder={t('accountHolder')}
              value={account.accountHolder}
              onChange={(e) =>
                handleUpdate(type, 'accountHolder', e.target.value)
              }
            />
          </div>
        </div>
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
        {renderAccountRow('groom', t('groomFamily'))}
        <div className="bg-border h-px"></div>
        {renderAccountRow('bride', t('brideFamily'))}
      </div>
    </SectionWrapper>
  );
}
