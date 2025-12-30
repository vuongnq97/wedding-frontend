'use client';

import {
  TemplatesHeader,
  TemplatesFilter,
  TemplatesGrid,
} from '@/components/templates';
import { useTemplates } from '@/hooks/use-templates';

export default function TemplatesPage() {
  const {
    templates,
    activeFilter,
    setFilter,
    searchQuery,
    setSearchQuery,
    activeColor,
    setColor,
  } = useTemplates();

  return (
    <main className="flex-1">
      <div className="layout-container py-12 md:py-20 lg:py-24">
        <TemplatesHeader
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <TemplatesFilter
          activeFilter={activeFilter}
          onFilterChange={setFilter}
          activeColor={activeColor}
          onColorChange={setColor}
        />
        <div className="mt-12">
          <TemplatesGrid templates={templates} />
        </div>
      </div>
    </main>
  );
}
