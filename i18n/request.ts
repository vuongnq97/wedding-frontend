import {getRequestConfig} from "next-intl/server";
import {defaultLocale, locales} from "./routing";

export default getRequestConfig(async ({locale}) => {
  let currentLocale = locale;
  if (!currentLocale || !locales.includes(currentLocale as (typeof locales)[number])) {
    currentLocale = defaultLocale;
  }

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});
