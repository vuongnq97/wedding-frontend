'use client';

import * as React from 'react';
import { Copy, Check } from 'lucide-react';
import { BaseButton, BaseButtonProps } from './base-button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ButtonCopyProps extends Omit<BaseButtonProps, 'onClick'> {
  value: string;
}

export function ButtonCopy({
  value,
  className,
  children,
  ...props
}: ButtonCopyProps) {
  const t = useTranslations('layout.common');
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <BaseButton
        variant="outline"
        className={cn('relative h-10 px-3 focus:ring-0', className)}
        onClick={handleCopy}
        title={t('copy')}
        {...props}
      >
        {copied ? (
          <Check className="h-4 w-4 scale-110 text-emerald-500 transition-all" />
        ) : (
          <Copy className="h-4 w-4 transition-all" />
        )}
        {children}
      </BaseButton>
    </div>
  );
}
