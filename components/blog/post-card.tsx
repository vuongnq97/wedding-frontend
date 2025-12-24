import * as React from "react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type PostCardProps = {
  href: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  imageUrl?: string;
  author?: { name: string; avatarUrl?: string };
  date?: string;
  className?: string;
};

export function PostCard({ href, title, excerpt, category, readTime, imageUrl, author, date, className }: PostCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <Card className="overflow-hidden hover:border-primary/50 transition-colors">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        ) : null}
        <CardContent className="flex flex-col gap-3 p-5">
          {(category || readTime) && (
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
              {category ? <span>{category}</span> : null}
              {category && readTime ? <span className="h-1 w-1 rounded-full bg-gray-400" /> : null}
              {readTime ? <span className="text-gray-500 dark:text-[#92adc9]">{readTime}</span> : null}
            </div>
          )}
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{title}</h3>
          {excerpt ? (
            <p className="line-clamp-2 text-sm text-gray-500 dark:text-[#92adc9]">{excerpt}</p>
          ) : null}
          {(author || date) && (
            <div className="mt-2 flex items-center gap-3 border-t border-gray-200 dark:border-[#324d67] pt-3">
              {author ? <Avatar src={author.avatarUrl} alt={author.name} fallback={author.name} size="sm" /> : null}
              <div className="text-sm">
                {author ? <p className="font-medium">{author.name}</p> : null}
                {date ? <p className="text-xs text-gray-500 dark:text-[#92adc9]">{date}</p> : null}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
