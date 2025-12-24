import * as React from "react";
import { PostCard, type PostCardProps } from "./post-card";

export type PostGridProps = {
  posts: PostCardProps[];
  columns?: { base?: 1 | 2 | 3 | 4; sm?: 1 | 2 | 3 | 4; lg?: 1 | 2 | 3 | 4 };
  className?: string;
};

function colsClass(prefix: string, n: 1 | 2 | 3 | 4 | undefined) {
  if (!n) return "";
  const map: Record<1 | 2 | 3 | 4, string> = {
    1: `${prefix}grid-cols-1`,
    2: `${prefix}grid-cols-2`,
    3: `${prefix}grid-cols-3`,
    4: `${prefix}grid-cols-4`,
  };
  return map[n];
}

export function PostGrid({ posts, columns, className }: PostGridProps) {
  const base = columns?.base ?? 1;
  const sm = columns?.sm ?? 2;
  const lg = columns?.lg ?? 3;

  return (
    <div
      className={[
        "grid gap-6",
        colsClass("", base),
        colsClass("sm:", sm),
        colsClass("lg:", lg),
        className ?? "",
      ].join(" ")}
    >
      {posts.map((p) => (
        <PostCard key={p.href + p.title} {...p} />
      ))}
    </div>
  );
}
