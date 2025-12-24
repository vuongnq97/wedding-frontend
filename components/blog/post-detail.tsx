import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export type PostDetailProps = {
  title: string;
  content: React.ReactNode;
  category?: string;
  readTime?: string;
  imageUrl?: string;
  date?: string;
  author?: { name: string; avatarUrl?: string; role?: string };
  sidebar?: React.ReactNode;
};

export function PostDetail({ title, content, category, readTime, imageUrl, date, author, sidebar }: PostDetailProps) {
  return (
    <section className="w-full">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
        <article className="lg:col-span-8">
          <Card className="overflow-hidden">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="w-full object-cover" />
            ) : null}
            <div className="p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {category ? <Badge variant="primary">{category}</Badge> : null}
                {readTime ? <span className="text-xs text-muted-foreground">{readTime}</span> : null}
              </div>
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                {content}
              </div>
            </div>
          </Card>
        </article>
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {author ? (
            <Card className="p-6">
              <h3 className="mb-3 text-lg font-bold">About the Author</h3>
              <div className="flex items-center gap-3">
                <Avatar src={author.avatarUrl} alt={author.name} fallback={author.name} />
                <div>
                  <p className="font-semibold">{author.name}</p>
                  {author.role ? <p className="text-xs text-muted-foreground">{author.role}</p> : null}
                </div>
              </div>
            </Card>
          ) : null}
          {sidebar}
        </aside>
      </div>
    </section>
  );
}
