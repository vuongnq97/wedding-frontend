"use client";

import {useLayoutStore} from "@/stores/layout-store";

export function SidebarOverlay() {
  const {sidebarOpen, closeSidebar} = useLayoutStore();

  if (!sidebarOpen) return null;

  return (
    <button
      type="button"
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
      aria-label="Close navigation"
      onClick={closeSidebar}
    />
  );
}
