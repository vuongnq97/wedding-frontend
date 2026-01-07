'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { BaseButton } from '@/components/ui/base-button';

import { TEMPLATE_FILTERS } from '@/constants/filters';

interface TemplatesFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeColor: string | null;
  onColorChange: (color: string | null) => void;
}

export function TemplatesFilter({
  activeFilter,
  onFilterChange,
  activeColor,
  onColorChange,
}: TemplatesFilterProps) {
  const t = useTranslations('templates.filters');

  const filters = TEMPLATE_FILTERS.map((filter) => ({
    id: filter.id,
    label: t(filter.label),
  }));

  const colorMap = [
    { id: 'white', class: 'bg-white hover:bg-white' },
    { id: 'black', class: 'bg-black hover:bg-black' },
    { id: 'red', class: 'bg-red-500 hover:bg-red-500' },
    { id: 'blue', class: 'bg-blue-500 hover:bg-blue-500' },
    { id: 'green', class: 'bg-green-500 hover:bg-green-500' },
    { id: 'yellow', class: 'bg-yellow-500 hover:bg-yellow-500' },
    { id: 'purple', class: 'bg-purple-500 hover:bg-purple-500' },
    { id: 'pink', class: 'bg-pink-500 hover:bg-pink-500' },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-4 pt-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((filter) => (
          <BaseButton
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            variant={activeFilter === filter.id ? 'default' : 'secondary'}
            className={cn('rounded-full px-4 text-sm font-medium')}
            size="sm"
          >
            {filter.label}
          </BaseButton>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-2">
        <span className="text-muted-foreground text-sm font-medium">
          {t('colors')}:
        </span>
        <div className="flex items-center gap-2">
          {colorMap.map((colorItem) => (
            <BaseButton
              key={colorItem.id}
              onClick={() =>
                onColorChange(
                  activeColor === colorItem.id ? null : colorItem.id
                )
              }
              className={cn(
                'border-input h-6 w-6 rounded-full border p-0 shadow-sm hover:scale-110',
                colorItem.class,
                activeColor === colorItem.id &&
                  'ring-primary scale-110 ring-2 ring-offset-2'
              )}
              variant="ghost"
              size="icon"
              aria-label={`Select ${colorItem.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
