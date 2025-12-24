import {useTranslations} from "next-intl";

import {cn} from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
  year: number;
};

export function SiteFooter({className, year}: SiteFooterProps) {
  const t = useTranslations("layout.footer");

  return (
    <footer className={cn("border-t border-gray-200 dark:border-[#233648] bg-white dark:bg-[#111a22]", className)}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-6 text-sm text-gray-500 dark:text-gray-400 sm:px-6 md:px-8">
        <p>{t("copyright", {year})}</p>
      </div>
    </footer>
  );
}
