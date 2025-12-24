export type MockPost = {
  href: string;
  title: string;
  excerpt?: string;
  category: string;
  readTime?: string;
  imageUrl?: string;
  author?: { name: string; avatarUrl?: string };
  date?: string;
  slug: string;
};

export const categories = [
  { name: "All", href: "articles" },
  { name: "Technology", href: "categories/technology" },
  { name: "Design", href: "categories/design" },
  { name: "Productivity", href: "categories/productivity" },
  { name: "Travel", href: "categories/travel" },
  { name: "Lifestyle", href: "categories/lifestyle" },
  { name: "Business", href: "categories/business" },
];

export const posts: MockPost[] = [
  {
    href: "/articles/ai-tools",
    slug: "ai-tools",
    title: "AI Tools to Boost Your Writing Workflow",
    excerpt: "From brainstorming to editing, publish faster without sacrificing quality.",
    category: "Technology",
    readTime: "4 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjvUIdzu6MASkl2WtdzfdEFJssoBnrtcrCcVfNiakB40ITZEFlXRppL4gc0jb9MoR4ojhWuoU8NrRhxiOuOgQz8gO4t5bUSRb3awP4c_9UAV-HYb_5geK7YNjMGrz9OfStID31BX9xaKmbv49nJPB5ujIF0T1J2ZGsMmflp7ok7kJ1Rbqveoq01cnr-tX6127KuPWUWzB3dwnTOyA4v6R3jtskOzmvQK7D3W83hGq6Yf0Tnob4ouho1I7-uDMFtf0SeVINweoZZWs",
    author: { name: "Sarah Jenkins", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChig47MkblFEMhS0UDIlD0wEChKItWPbBPABmp28McKQoCY0ZKkFMtR31RQJGlu-i9EXl8uf-cwb3K4mJS-FS1xJELzfO07MAdZ1riz-IxP6eFAT6YgqJpfQUCxAE4MkhhBavol9YEMaR4VesVSFiBgcQKhteK_-PwnCzXYuqDxT3X25gz5bhQ9cHypCYVu9DGrjSflcV1d-stYnGH8fDYm7dQ1CcLRp3KgmZhDXf2TeItWxmuNNzyrGokEncbL4JiRaA36N6ggI4" },
    date: "Oct 25, 2023",
  },
  {
    href: "/articles/hidden-gems",
    slug: "hidden-gems",
    title: "Hidden Gems: Offbeat Destinations for 2024",
    excerpt: "Skip the crowds and discover underrated locations for your next adventure.",
    category: "Travel",
    readTime: "6 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-uUKTYcPqRkadKmZOoD0AzD2p6SkgFoJ7teHMCLansCo-YA510H5MA8fl-EmikjhtZjPoSUcNeu3Zio4jHZ4Czv-fS8luHMPmXu6YEuhWjBo7P6wKFpmvV7dmZ4JoFdvtvbD8adlx1TR5y45cIzLhHFlE7GGHYKxQzEvyZ85KQ8I29uDAzaMrseeZGuflju17dcuaACMgRTYv-LTeb7qm8xa2sTmjM64H1JrC9BroLdT9N5SvNGn1UieW5xw8aP4s2iMdKrcVNxQ",
    author: { name: "David Miller", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm0k_qbPMo-pgyGYMby5cY4oIYwqrKdnYZAIBX1rzUEBaCQ-rwO6hGXGR8qkzjRjYtZWnYrBgG7QWajRUA5bGD6a4ZuqxAD-4uSvKcOX-OAFpG2EuZvq8aEjntBIHZbpCLQ-HPOXk-f3QnWx-BgcUDI4cLmUBPvePMYSsQSSXXF_HpbEekT5i0vcogVVm6cebNBnIDBku_tWJKYELetj2DdHI2-bYhZH8VRhrvuk7VwLGkjFQtnDTJzATVtOv907D5J7EOsFBKugQ" },
    date: "Oct 26, 2023",
  },
  {
    href: "/articles/mindful-habits",
    slug: "mindful-habits",
    title: "Mindful Habits for Busy Creators",
    excerpt: "Simple routines to reduce stress and maintain consistent output.",
    category: "Lifestyle",
    readTime: "7 min read",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm4MWvXew89xwcHD7O99ypS4Uh_4MJ7z3bZVkVjkuIeISXFeBVAr5P3FV-rUu_bE_AJIvHg104gl60dYeKosiN-u0_JI0FSjiikW5kOOmFE5gj3_C18Tdf3HdTBUeAMLu3cLIYOuM802ITAudcLM709CLAg8npq73J8du62I4v_zyHtAfWd5y6s1XriRu9swts0rlAnFMrOIQXENiDNVOxIQSnnp-CpZicjHyegObHLrGj-iTWR_EPV5P_8KBI3z-xprYpEjTr02A",
    author: { name: "Emma Stone", avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzjGHoSS6zGeVKTz712ChxzXg-8TI3XmuzAmYWBjyfKbrR7VSNL_Smmcy4nR1YD0zQ025Zkwd3uxwzoza9NMOFBZ5oBa80UHiRfaEZf1Nq6vAHQ5aQ0meKO0Zufd6WTqAH93rYcWXkNbfQLzU7V1m3DvuAj2KoBcFgpg3rzd7v8Kb_em0Q3xIXQDjO9XzihBeYc_pOTQfwaUU0Xl0YXo70l1n3TNMJBCaJiWV2qmCuKsJdlHTeppdh4eYcMaAde5IQ656dutHKUMU" },
    date: "Oct 27, 2023",
  },
];
