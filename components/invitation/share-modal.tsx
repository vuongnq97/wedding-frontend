'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { BaseModal } from '@/components/ui/base-modal';
import { BaseInput } from '@/components/ui/base-input';
import { ButtonCopy } from '../ui/button-copy';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
}

export function ShareModal({ open, onOpenChange, url }: ShareModalProps) {
  const t = useTranslations('invitation.share');
  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('title')}
      description={t('description')}
      contentClassName="w-fit"
    >
      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex w-full items-stretch overflow-hidden rounded-lg border border-dashed shadow-sm">
            <BaseInput
              value={url}
              readOnly
              disabled
              className="truncate rounded-r-none bg-transparent focus:ring-0"
            />
            <ButtonCopy value={url} className="rounded-none border-none" />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
