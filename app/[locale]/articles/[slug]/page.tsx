import { notFound } from "next/navigation";
import { PostDetail } from "@/components/blog/post-detail";
import { CategoryList } from "@/components/blog/category-list";
import { categories, posts } from "@/components/blog/mock-data";

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const sidebar = (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-3 text-lg font-bold">Categories</h3>
        <CategoryList
          categories={categories.map((c) => ({ name: c.name, href: c.href, selected: c.name === post.category }))}
          scrollable={false}
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <PostDetail
        title={post.title}
        category={post.category}
        readTime={post.readTime}
        imageUrl={post.imageUrl}
        author={{ name: post.author?.name ?? "Author" , avatarUrl: post.author?.avatarUrl }}
        content={
          <>
            <p>
              {post.excerpt ?? "An example post to demonstrate the PostDetail component."}
            </p>
            <h2>Getting Started</h2>
            <p>
              This is a mock article using local data. Replace this with fetched content once your API is ready.
            </p>
          </>
        }
        sidebar={sidebar}
      />
    </div>
  );
}
