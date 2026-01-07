'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="bg-destructive/10 mb-6 flex h-24 w-24 items-center justify-center rounded-full">
            <AlertTriangle className="text-destructive h-12 w-12" />
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-[500px]">
            A critical error occurred.
          </p>
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="bg-primary text-primary-foreground ring-offset-background hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
