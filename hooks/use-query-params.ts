'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useQueryParams() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const p: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      p[key] = value;
    });
    return p;
  }, [searchParams]);

  return params;
}
