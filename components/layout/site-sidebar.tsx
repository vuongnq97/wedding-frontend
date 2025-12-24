"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";

import {cn} from "@/lib/utils";
import {useLayoutStore} from "@/stores/layout-store";
import Link from "next/link";

const links = [
  {href: "/", translationKey: "layout.sidebar.home"},
  {href: "/articles", translationKey: "layout.sidebar.articles"},
  {href: "/about", translationKey: "layout.sidebar.about"},
  {href: "/contact", translationKey: "layout.sidebar.contact"},
];

export function SiteSidebar({locale}: {locale: string}) {
  const pathname = usePathname();
  const t = useTranslations();
  const {sidebarOpen, closeSidebar} = useLayoutStore();

  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full border-r border-border/60 bg-background/95 p-4 shadow-lg transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:bg-background md:shadow-none",
        sidebarOpen && "translate-x-0"
      )}
      aria-label="Primary"
    >
      <nav className="flex h-full flex-col gap-2">
        {links.map(({href, translationKey}) => {
          const localizedHref = href === "/" ? `/${locale}` : `/${locale}${href}`;
          const isActive = pathname?.startsWith(localizedHref);
          return (
            <Link
              key={translationKey}
              href={localizedHref}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-[#192633]",
                isActive && "bg-gray-100 dark:bg-[#192633] text-[#111a22] dark:text-white"
              )}
            >
              {t(translationKey)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
