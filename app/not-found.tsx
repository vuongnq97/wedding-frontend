'use client';

import React from 'react';
import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
        <FileQuestion className="text-muted-foreground h-12 w-12" />
      </div>
      <h1 className="text-foreground mb-2 text-4xl font-bold tracking-tight">
        404
      </h1>
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-[500px]">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
        have been moved, deleted, or never existed.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
