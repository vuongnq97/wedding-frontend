import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function Chip({ className, selected = false, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
        selected
          ? "bg-primary/15 text-primary"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-accent-dark dark:text-white dark:hover:bg-accent-dark/80",
        className
      )}
      {...props}
    />
  );
}
