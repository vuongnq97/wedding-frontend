'use client';

import { TemplateCard } from './template-card';
import { Template } from '@/types/template';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';

interface TemplatesGridProps {
  templates: Template[];
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  const t = useTranslations('templates.empty');

  if (templates.length === 0) {
    return (
      <div className="animate-in fade-in-50 flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <Search className="text-muted-foreground h-8 w-8" />
        </div>
        <h3 className="font-serif text-xl font-bold">{t('title')}</h3>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm">
          {t('subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </div>
    </div>
  );
}
