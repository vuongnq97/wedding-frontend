import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white dark:bg-white dark:text-[#111a22] border-transparent",
        secondary: "bg-gray-100 text-gray-700 dark:bg-[#233648] dark:text-white border-transparent",
        outline: "border-gray-300 text-[#111a22] dark:border-[#324d67] dark:text-white",
        primary: "bg-primary/10 text-primary border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
