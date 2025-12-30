'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  rightIcon?: React.ReactNode;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      className,
      containerClassName,
      type = 'text',
      label,
      error,
      rightIcon,
      ...props
    },
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
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={cn(
              'bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background flex h-10 w-full rounded-md border border-transparent px-3 py-2 text-sm transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              rightIcon && 'pr-9',
              error && 'border-destructive focus:ring-destructive',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
              {rightIcon}
            </div>
          )}
        </div>
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
