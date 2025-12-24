import Link from "next/link";
import { PostGrid } from "@/components/blog/post-grid";
import { CategoryList } from "@/components/blog/category-list";
import { PostDetail } from "@/components/blog/post-detail";
import { Button } from "@/components/ui/button";
import { categories as mockCategories } from "@/components/blog/mock-data";

export default function HomePage() {
  const categories = mockCategories;

  const posts = [
    {
      href: "articles/ai-tools",
      title: "AI Tools to Boost Your Writing Workflow",
      excerpt: "From brainstorming to editing, publish faster without sacrificing quality.",
      category: "Technology",
      readTime: "4 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvUIdzu6MASkl2WtdzfdEFJssoBnrtcrCcVfNiakB40ITZEFlXRppL4gc0jb9MoR4ojhWuoU8NrRhxiOuOgQz8gO4t5bUSRb3awP4c_9UAV-HYb_5geK7YNjMGrz9OfStID31BX9xaKmbv49nJPB5ujIF0T1J2ZGsMmflp7ok7kJ1Rbqveoq01cnr-tX6127KuPWUWzB3dwnTOyA4v6R3jtskOzmvQK7D3W83hGq6Yf0Tnob4ouho1I7-uDMFtf0SeVINweoZZWs",
      author: { name: "Sarah Jenkins", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChig47MkblFEMhS0UDIlD0wEChKItWPbBPABmp28McKQoCY0ZKkFMtR31RQJGlu-i9EXl8uf-cwb3K4mJS-FS1xJELzfO07MAdZ1riz-IxP6eFAT6YgqJpfQUCxAE4MkhhBavol9YEMaR4VesVSFiBgcQKhteK_-PwnCzXYuqDxT3X25gz5bhQ9cHypCYVu9DGrjSflcV1d-stYnGH8fDYm7dQ1CcLRp3KgmZhDXf2TeItWxmuNNzyrGokEncbL4JiRaA36N6ggI4" },
      date: "Oct 25, 2023",
    },
    {
      href: "articles/hidden-gems",
      title: "Hidden Gems: Offbeat Destinations for 2024",
      excerpt: "Skip the crowds and discover underrated locations for your next adventure.",
      category: "Travel",
      readTime: "6 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-uUKTYcPqRkadKmZOoD0AzD2p6SkgFoJ7teHMCLansCo-YA510H5MA8fl-EmikjhtZjPoSUcNeu3Zio4jHZ4Czv-fS8luHMPmXu6YEuhWjBo7P6wKFpmvV7dmZ4JoFdvtvbD8adlx1TR5y45cIzLhHFlE7GGHYKxQzEvyZ85KQ8I29uDAzaMrseeZGuflju17dcuaACMgRTYv-LTeb7qm8xa2sTmjM64H1JrC9BroLdT9N5SvNGn1UieW5xw8aP4s2iMdKrcVNxQ",
      author: { name: "David Miller", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm0k_qbPMo-pgyGYMby5cY4oIYwqrKdnYZAIBX1rzUEBaCQ-rwO6hGXGR8qkzjRjYtZWnYrBgG7QWajRUA5bGD6a4ZuqxAD-4uSvKcOX-OAFpG2EuZvq8aEjntBIHZbpCLQ-HPOXk-f3QnWx-BgcUDI4cLmUBPvePMYSsQSSXXF_HpbEekT5i0vcogVVm6cebNBnIDBku_tWJKYELetj2DdHI2-bYhZH8VRhrvuk7VwLGkjFQtnDTJzATVtOv907D5J7EOsFBKugQ" },
      date: "Oct 26, 2023",
    },
    {
      href: "articles/mindful-habits",
      title: "Mindful Habits for Busy Creators",
      excerpt: "Simple routines to reduce stress and maintain consistent output.",
      category: "Lifestyle",
      readTime: "7 min read",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm4MWvXew89xwcHD7O99ypS4Uh_4MJ7z3bZVkVjkuIeISXFeBVAr5P3FV-rUu_bE_AJIvHg104gl60dYeKosiN-u0_JI0FSjiikW5kOOmFE5gj3_C18Tdf3HdTBUeAMLu3cLIYOuM802ITAudcLM709CLAg8npq73J8du62I4v_zyHtAfWd5y6s1XriRu9swts0rlAnFMrOIQXENiDNVOxIQSnnp-CpZicjHyegObHLrGj-iTWR_EPV5P_8KBI3z-xprYpEjTr02A",
      author: { name: "Emma Stone", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzjGHoSS6zGeVKTz712ChxzXg-8TI3XmuzAmYWBjyfKbrR7VSNL_Smmcy4nR1YD0zQ025Zkwd3uxwzoza9NMOFBZ5oBa80UHiRfaEZf1Nq6vAHQ5aQ0meKO0Zufd6WTqAH93rYcWXkNbfQLzU7V1m3DvuAj2KoBcFgpg3rzd7v8Kb_em0Q3xIXQDjO9XzihBeYc_pOTQfwaUU0Xl0YXo70l1n3TNMJBCaJiWV2qmCuKsJdlHTeppdh4eYcMaAde5IQ656dutHKUMU" },
      date: "Oct 27, 2023",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 bg-background-dark">
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 pt-2">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Share Your Story with the World
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            The all-in-one platform for writers, creators, and thinkers. Build your audience and join a vibrant community.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="#get-started">Start Writing for Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#browse">Browse Content</Link>
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Browse by Category</h2>
          <Link href="articles" className="text-primary hover:underline">View all</Link>
        </div>
        <CategoryList categories={categories} />
      </section>

      {/* Latest Posts */}
      <section id="browse" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Latest Posts</h2>
          <Link href="articles" className="text-primary hover:underline">See more</Link>
        </div>
        <PostGrid posts={posts} columns={{ base: 1, sm: 2, lg: 3 }} />
      </section>

      {/* Features */}
      <section id="features" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Why Write with Us?</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">✍️</div>
            <h3 className="text-lg font-semibold">Easy Editor</h3>
            <p className="mt-1 text-sm text-muted-foreground">Distraction-free writing with powerful formatting tools.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">📊</div>
            <h3 className="text-lg font-semibold">Deep Analytics</h3>
            <p className="mt-1 text-sm text-muted-foreground">Understand your audience with views, reads, and engagement.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">👥</div>
            <h3 className="text-lg font-semibold">Vibrant Community</h3>
            <p className="mt-1 text-sm text-muted-foreground">Connect with writers and readers built for interaction.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold sm:text-3xl">Pricing</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start writing and growing your audience.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <h3 className="text-lg font-semibold">Pro</h3>
            <p className="mt-1 text-sm text-muted-foreground">Advanced analytics and customization.</p>
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6">
            <h3 className="text-lg font-semibold">Teams</h3>
            <p className="mt-1 text-sm text-muted-foreground">Collaborate with your editorial team.</p>
          </div>
        </div>
      </section>

      {/* Post Detail Showcase */}
      <section className="prose prose-neutral dark:prose-invert max-w-none rounded-xl bg-gray-50 dark:bg-muted-dark p-6">
        <PostDetail
          title="How to Build a Consistent Writing Habit"
          category="Productivity"
          readTime="8 min read"
          imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCkdgJiwC2GLKynWFbUge7CPX8lvbPE8fFdfm1KoXDhpP7BwAOsgBalYDd2OHfi0oCuKwVPSfX7fO7ndi19OHVRemIGl4a4mLg-HBCq0xSZfc6EW_nLY-djPJ3daZd-qy5eYiig9Bd86fNIZmYegkDEn5WfQEfJyOEuqizKh1nmERvUesh3yGvgLBHx4W_VNIlwhNl2K4aJiS-pTt1vucKqTmozqI-HvfsuIlts5GMB4mTb2tpxQWIqpCGrIfvvPusexafh72bc8oo"
          author={{ name: "Sarah Jenkins", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChig47MkblFEMhS0UDIlD0wEChKItWPbBPABmp28McKQoCY0ZKkFMtR31RQJGlu-i9EXl8uf-cwb3K4mJS-FS1xJELzfO07MAdZ1riz-IxP6eFAT6YgqJpfQUCxAE4MkhhBavol9YEMaR4VesVSFiBgcQKhteK_-PwnCzXYuqDxT3X25gz5bhQ9cHypCYVu9DGrjSflcV1d-stYnGH8fDYm7dQ1CcLRp3KgmZhDXf2TeItWxmuNNzyrGokEncbL4JiRaA36N6ggI4", role: "Writer & Editor" }}
          content={
            <>
              <p>Consistency is the secret weapon of every great writer. In this guide, we’ll explore practical techniques to write more without burning out.</p>
              <h2>1. Start Smaller Than You Think</h2>
              <p>Begin with a daily target that feels effortless—like 100 words. Momentum matters more than volume when forming habits.</p>
              <ul>
                <li>Write at the same time every day</li>
                <li>Keep a running list of ideas</li>
                <li>Use templates for faster publishing</li>
              </ul>
              <p>Over time, gradually increase your goals and protect your creative time like any other appointment.</p>
            </>
          }
        />
      </section>

      {/* About */}
      <section id="about" className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold sm:text-3xl">About</h2>
        <p className="max-w-3xl text-muted-foreground">The platform where ideas find their voice. Built for creators, by creators.</p>
      </section>
    </div>
  );
}
