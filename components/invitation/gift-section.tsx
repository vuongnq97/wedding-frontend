'use client';

import { useTranslations } from 'next-intl';
import { Wallet, Banknote } from 'lucide-react';
import { WeddingData } from '@/types/invitation';
import { BankAccountCard } from './bank-account-card';

interface GiftSectionProps {
  data: WeddingData;
}

export function GiftSection({ data }: GiftSectionProps) {
  const t = useTranslations('invitation.gift');
  const { bankAccounts } = data;
  const groomAccounts = bankAccounts?.filter((acc) => acc.owner === 0) || [];
  const brideAccounts = bankAccounts?.filter((acc) => acc.owner === 1) || [];

  if (groomAccounts.length === 0 && brideAccounts.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface py-16">
      <div className="layout-container mx-auto max-w-[800px] px-4 sm:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-foreground text-3xl font-bold">{t('title')}</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md">
            {t('desc')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {groomAccounts.map((account) => (
            <BankAccountCard
              key={account.accountNumber}
              account={account}
              label={t('groom')}
              icon={<Wallet className="h-6 w-6" />}
              copyLabel={t('copy')}
            />
          ))}

          {brideAccounts.map((account) => (
            <BankAccountCard
              key={account.accountNumber}
              account={account}
              label={t('bride')}
              icon={<Banknote className="h-6 w-6" />}
              copyLabel={t('copy')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
