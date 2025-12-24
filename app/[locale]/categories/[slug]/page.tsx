import Link from "next/link";
import { notFound } from "next/navigation";

import { PostGrid } from "@/components/blog/post-grid";
import { CategoryList } from "@/components/blog/category-list";
import { categories, posts } from "@/components/blog/mock-data";

function toTitleCase(input: string) {
  return input
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const categoryName = toTitleCase(params.slug);
  const exists = categories.some((c) => c.name.toLowerCase() === categoryName.toLowerCase());
  if (!exists) return notFound();

  const filtered = posts.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase());

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{categoryName}</h1>
        <Link href="/" className="text-primary hover:underline">Home</Link>
      </div>
      <CategoryList
        categories={categories.map((c) => ({ name: c.name, href: c.href, selected: c.name.toLowerCase() === categoryName.toLowerCase() }))}
        scrollable
      />
      <PostGrid
        posts={filtered.map((p) => ({
          href: `/articles/${p.slug}`,
          title: p.title,
          excerpt: p.excerpt,
          category: p.category,
          readTime: p.readTime,
          imageUrl: p.imageUrl,
          author: p.author,
          date: p.date,
        }))}
        columns={{ base: 1, sm: 2, lg: 3 }}
      />
    </div>
  );
}
