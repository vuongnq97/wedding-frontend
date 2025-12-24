'use client';

import * as React from "react";

import {cn} from "@/lib/utils";

export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  ({className, type = "text", ...props}, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 dark:border-[#324d67] bg-transparent px-3 py-2 text-sm text-[#111a22] dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
BaseInput.displayName = "BaseInput";
