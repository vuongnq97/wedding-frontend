'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'border-border text-foreground placeholder:text-muted-foreground focus:ring-primary flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
BaseInput.displayName = 'BaseInput';
