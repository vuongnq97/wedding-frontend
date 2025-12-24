import * as React from "react";
import Link from "next/link";
import { Chip, type ChipProps } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

export type CategoryChipProps = {
  name: string;
  href?: string;
  selected?: boolean;
  className?: string;
} & Omit<ChipProps, "children">;

export function CategoryChip({ name, href = "#", selected, className, ...props }: CategoryChipProps) {
  const content = (
    <Chip selected={selected} className={cn(className)} {...props}>
      {name}
    </Chip>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}
