import * as React from "react";
import { cn } from "@/lib/utils";

export type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function Avatar({ src, alt = "", fallback, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full border border-gray-200 dark:border-[#324d67] bg-gray-100 dark:bg-[#233648] text-[#111a22] dark:text-white",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-xs font-medium">
          {fallback?.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
