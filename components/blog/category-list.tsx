import * as React from "react";
import { CategoryChip, type CategoryChipProps } from "./category-chip";

export type CategoryListProps = {
  categories: Array<Pick<CategoryChipProps, "name" | "href"> & { selected?: boolean }>;
  scrollable?: boolean;
  className?: string;
};

export function CategoryList({ categories, scrollable = true, className }: CategoryListProps) {
  return (
    <div className={["flex gap-3", scrollable ? "overflow-x-auto no-scrollbar" : "flex-wrap", className ?? ""].join(" ") }>
      {categories.map((c) => (
        <CategoryChip key={c.name} name={c.name} href={c.href} selected={c.selected} />
      ))}
    </div>
  );
}
