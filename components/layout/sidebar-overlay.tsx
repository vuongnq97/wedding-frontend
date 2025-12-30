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
      className="fixed inset-0 z-30 h-auto w-auto rounded-none bg-black/40 backdrop-blur-sm transition-opacity hover:bg-black/40 md:hidden"
      aria-label="Close navigation"
      onClick={closeSidebar}
    />
  );
}
