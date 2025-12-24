import Link from "next/link";
import { PostGrid } from "@/components/blog/post-grid";
import { posts as mockPosts } from "@/components/blog/mock-data";

export default function ArticlesPage() {
  const posts = mockPosts.map((p) => ({
    href: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    readTime: p.readTime,
    imageUrl: p.imageUrl,
    author: p.author,
    date: p.date,
  }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Articles</h1>
        <Link href="/" className="text-primary hover:underline">Home</Link>
      </div>
      <PostGrid posts={posts} columns={{ base: 1, sm: 2, lg: 3 }} />
    </div>
  );
}
