'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { className, containerClassName, type = 'text', label, error, ...props },
    ref
  ) => {
    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {label && (
          <label
            className={cn(
              'text-muted-foreground text-xs font-semibold',
              error && 'text-destructive'
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'border-border text-foreground placeholder:text-muted-foreground flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus:ring-destructive',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-destructive animate-in slide-in-from-top-1 fade-in text-xs font-medium duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);
BaseInput.displayName = 'BaseInput';
