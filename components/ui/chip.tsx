import * as React from 'react';
import { BaseButton } from '@/components/ui/base-button';
import { cn } from '@/lib/utils';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({ className, selected = false, ...props }: ChipProps) {
  return (
    <BaseButton
      variant="ghost"
      className={cn(
        'hover:bg-muted/80 h-auto w-auto gap-1 px-3 py-1.5 font-medium',
        selected
          ? 'bg-primary/15 text-primary hover:bg-primary/25'
          : 'bg-muted text-foreground',
        className
      )}
      {...props}
    />
  );
}
