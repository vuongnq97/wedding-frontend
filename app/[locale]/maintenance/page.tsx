import React from 'react';
import { Hammer } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function MaintenancePage() {
  const t = useTranslations('common.pages.maintenance');
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-primary/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <Hammer className="text-primary h-12 w-12" />
      </div>
      <h1 className="text-foreground mb-2 text-4xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        {t('subtitle')}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-[500px]">
        {t('description')}
      </p>
    </div>
  );
}
