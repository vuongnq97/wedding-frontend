import { useState, useMemo } from 'react';
import { TEMPLATES } from '@/constants/templates';
import { Template } from '@/types/template';
import { useLocale } from 'next-intl';

interface UseTemplatesResult {
  templates: Template[];
  activeFilter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
  activeColor: string | null;
  setColor: (color: string | null) => void;
}

export function useTemplates(): UseTemplatesResult {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const locale = useLocale();

  const defaultTemplates = [
    {
      id: '1',
      title: 'Modern Elegance',
      category: 'modern',
      imageUrl: `/images/templates/template-1-${locale === 'vi' ? 'vi' : 'en'}.png`,
      isNew: true,
      mainColor: 'white',
    },
    ...TEMPLATES,
  ];

  const templates = useMemo(() => {
    let filtered = defaultTemplates;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(
        (template) => template.category === activeFilter
      );
    }

    if (activeColor) {
      filtered = filtered.filter(
        (template) => template.mainColor === activeColor
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((template) =>
        template.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeFilter, activeColor, searchQuery, defaultTemplates]);

  return {
    templates,
    activeFilter,
    setFilter: setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredCount: templates.length,
    activeColor,
    setColor: setActiveColor,
  };
}
