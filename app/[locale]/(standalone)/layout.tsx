import type { ReactNode } from 'react';

export default function StandaloneLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {children}
    </main>
  );
}
