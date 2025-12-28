'use client';

import { BaseButton } from '@/components/ui/base-button';
import { useLayoutStore } from '@/stores/layout-store';

export function SidebarOverlay() {
  const { sidebarOpen, closeSidebar } = useLayoutStore();

  if (!sidebarOpen) return null;

  return (
    <BaseButton
      type="button"
      variant="ghost"
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden rounded-none h-auto w-auto hover:bg-black/40"
      aria-label="Close navigation"
      onClick={closeSidebar}
    />
  );
}
