import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
