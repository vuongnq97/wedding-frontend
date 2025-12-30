'use client';

import React from 'react';
import { Sidebar, MobileHeader } from '@/components/dashboard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex h-screen w-full overflow-hidden">
      <Sidebar />

      <main className="bg-background relative flex h-full flex-1 flex-col overflow-y-auto">
        <MobileHeader />
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
