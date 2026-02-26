import createMiddleware from "next-intl/middleware";

import { localePrefix, locales, pathnames } from "@/i18n/routing";

export default createMiddleware({
  locales,
  defaultLocale: locales[0],
  pathnames,
  localePrefix,
});

export const config = {
  matcher: ["/", "/(en|am)/:path*"],
};
