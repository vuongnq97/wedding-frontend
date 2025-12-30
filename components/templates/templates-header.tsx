'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { BaseInput } from '@/components/ui/base-input';

interface TemplatesHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TemplatesHeader({
  searchValue,
  onSearchChange,
}: TemplatesHeaderProps) {
  const t = useTranslations('templates.header');

  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <h1 className="text-primary font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
        {t('title')}
      </h1>
      <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
        {t('subtitle')}
      </p>
      <div className="w-full max-w-sm space-y-2 pt-4">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <BaseInput
            className="bg-background rounded-full pl-9"
            placeholder={t('search_placeholder')}
            type="search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
