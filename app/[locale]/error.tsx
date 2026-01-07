'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common.pages.error');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-destructive/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive h-12 w-12" />
      </div>
      <h1 className="text-foreground mb-2 text-4xl font-bold tracking-tight">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mb-8 max-w-[500px]">
        {error.message || t('description')}
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} variant="outline">
          {t('tryAgain')}
        </Button>
        <Button asChild>
          <Link href="/">{t('goHome')}</Link>
        </Button>
      </div>
    </div>
  );
}
