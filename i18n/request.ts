import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let currentLocale = await requestLocale;
  if (
    !currentLocale ||
    !locales.includes(currentLocale as (typeof locales)[number])
  ) {
    currentLocale = defaultLocale;
  }

  const homeMessages = (await import(`./home/${currentLocale}.json`)).default;
  const loginMessages = (await import(`./login/${currentLocale}.json`)).default;
  const signUpMessages = (await import(`./sign-up/${currentLocale}.json`)).default;
  const layoutMessages = (await import(`./layout/${currentLocale}.json`)).default;
  const invitationMessages = (await import(`./invitation/${currentLocale}.json`)).default;

  return {
    locale: currentLocale,
    messages: {
      home: homeMessages,
      login: loginMessages,
      signUp: signUpMessages,
      layout: layoutMessages,
      invitation: invitationMessages,
    },
  };
});
