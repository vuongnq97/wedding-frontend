'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20',
        secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
        danger: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
        dashed:
          'border border-dashed border-border bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground',
        outline:
          'border border bg-transparent focus:ring-0 hover:bg-primary-soft/40',
        ghost: 'hover:bg-primary-soft/40',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-7 rounded-sm px-2 text-xs',
        lg: 'h-12 rounded-full px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';

    if (asChild) {
      return (
        <Component
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {props.children}
        </Component>
      );
    }

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {props.children}
      </Component>
    );
  }
);
BaseButton.displayName = 'BaseButton';

export { BaseButton, buttonVariants };
