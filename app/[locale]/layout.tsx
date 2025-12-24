import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {cookies} from "next/headers";

import {SiteFooter} from "@/components/layout/site-footer";
import {SiteHeader} from "@/components/layout/site-header";
import {SiteSidebar} from "@/components/layout/site-sidebar";
import {SidebarOverlay} from "@/components/layout/sidebar-overlay";
import {locales} from "@/i18n/routing";
import {UserInfo} from "@/types/auth";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return Array.isArray(locales) ? locales.map((locale) => ({locale})) : [];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const year = new Date().getFullYear();
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth-user")?.value;
  let initialUser: UserInfo | null = null;

  if (userCookie) {
    try {
      initialUser = JSON.parse(decodeURIComponent(userCookie)) as UserInfo;
    } catch (error) {
      console.error("Failed to parse auth-user cookie", error);
    }
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      <div className="relative flex min-h-screen bg-background-dark flex-col text-foreground">
        <SiteHeader initialUser={initialUser} />
        <div className="flex flex-1 overflow-hidden">
          {/*<SiteSidebar locale={locale} />*/}
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
            {children}
          </main>
        </div>
        {/*<SidebarOverlay />*/}
        <SiteFooter year={year} />
      </div>
    </NextIntlClientProvider>
  );
}
