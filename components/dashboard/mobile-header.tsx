'use client';

import React from 'react';
import { Menu, Heart } from 'lucide-react';
import { BaseButton } from '@/components/ui/base-button';
import { useTranslations } from 'next-intl';

export function MobileHeader() {
  const t = useTranslations('dashboard.sidebar');
  return (
    <header className="border-border/40 bg-background flex items-center justify-between border-b p-4 md:hidden">
      <div className="flex items-center gap-2">
        <Heart className="text-primary h-5 w-5 fill-current" />
        <span className="text-foreground font-bold">{t('brand')}</span>
      </div>
      <BaseButton variant="ghost" size="icon">
        <Menu className="text-foreground h-6 w-6" />
      </BaseButton>
    </header>
  );
}
