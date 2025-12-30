import { Copy } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { getVietQrUrl } from '@/utils/vietqr';
import Image from 'next/image';
import { BankAccount } from '@/types/invitation';
import { ReactNode } from 'react';

interface BankAccountCardProps {
  account: BankAccount;
  label: string;
  icon: ReactNode;
  copyLabel: string;
}

export function BankAccountCard({
  account,
  label,
  icon,
  copyLabel,
}: BankAccountCardProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const qrUrl = getVietQrUrl(
    account.bankName,
    account.accountNumber,
    account.accountHolder
  );

  return (
    <div className="bg-card border-border group relative flex cursor-pointer flex-col items-center gap-3 rounded-2xl border p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <div className="bg-muted text-primary flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
          {label}
        </p>
        <h4 className="text-foreground text-lg font-bold">
          {account.bankName}
        </h4>
      </div>
      <div className="bg-primary/20 my-1 h-[2px] w-12"></div>
      <div className="space-y-1">
        <p className="text-foreground font-mono text-xl tracking-wide sm:text-2xl">
          {account.accountNumber}
        </p>
        <p className="text-muted-foreground text-sm">{account.accountHolder}</p>
      </div>

      <BaseButton
        variant="ghost"
        className="text-primary hover:text-primary/80 mt-2 flex h-auto items-center gap-1 px-2 py-1 text-xs font-bold"
        onClick={() => copyToClipboard(account.accountNumber)}
      >
        <Copy className="h-4 w-4" />
        {copyLabel}
      </BaseButton>

      {/* Direct QR display */}
      {qrUrl && (
        <div className="border-border relative mt-4 h-40 w-40 overflow-hidden rounded-lg border bg-white">
          <Image
            src={qrUrl}
            alt="QR Code"
            fill
            className="object-contain p-2"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}
