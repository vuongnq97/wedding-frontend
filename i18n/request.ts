import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './routing';

// Force rebuild for i18n - triggering now

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
  const signUpMessages = (await import(`./sign-up/${currentLocale}.json`))
    .default;
  const layoutMessages = (await import(`./layout/${currentLocale}.json`))
    .default;
  const invitationTemplateMessages = (
    await import(`./invitation-template/${currentLocale}.json`)
  ).default;
  const invitationMessages = (
    await import(`./invitation/${currentLocale}.json`)
  ).default;
  const manageInvitationMessages = (
    await import(`./manage-invitation/${currentLocale}.json`)
  ).default;
  const templatesMessages = (await import(`./templates/${currentLocale}.json`))
    .default;

  const dashboardMessages = (await import(`./dashboard/${currentLocale}.json`))
    .default;
  const commonMessages = (await import(`./common/${currentLocale}.json`))
    .default;

  return {
    locale: currentLocale,
    messages: {
      common: commonMessages,
      home: homeMessages,
      login: loginMessages,
      signUp: signUpMessages,
      layout: layoutMessages,
      'invitation-template': invitationTemplateMessages,
      invitation: invitationMessages,
      'manage-invitation': manageInvitationMessages,
      templates: templatesMessages,
      dashboard: dashboardMessages,
    },
  };
});
