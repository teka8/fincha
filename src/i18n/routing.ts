import type { LocalePrefix } from "next-intl/routing";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "am"] as const;

export const localePrefix: LocalePrefix = "always";

export const pathnames = {
  "/": "/",
  "/about": {
    en: "/about",
    am: "/ስለ-ፊንቻ",
  },
  "/products": {
    en: "/products",
    am: "/ምርቶች",
  },
  "/products/[slug]": {
    en: "/products/[slug]",
    am: "/ምርቶች/[slug]",
  },
  "/announcement": {
    en: "/announcement",
    am: "/ማስታወቂያዎች",
  },
  "/announcement/[id]": {
    en: "/announcement/[id]",
    am: "/ማስታወቂያዎች/[id]",
  },
  "/news": {
    en: "/news",
    am: "/ዜና",
  },
  "/news/[id]": {
    en: "/news/[id]",
    am: "/ዜና/[id]",
  },
  "/event": {
    en: "/event",
    am: "/ዝግጅቶች",
  },
  "/event/[id]": {
    en: "/event/[id]",
    am: "/ዝግጅቶች/[id]",
  },
  "/csr": {
    en: "/csr",
    am: "/ህብረተሰብ",
  },
  "/media": {
    en: "/media",
    am: "/ሚዲያ",
  },
  "/projects": {
    en: "/projects",
    am: "/ፕሮጀክቶች",
  },
  "/projects/[id]": {
    en: "/projects/[id]",
    am: "/ፕሮጀክቶች/[id]",
  },
  "/careers": {
    en: "/careers",
    am: "/ሥራዎች",
  },
  "/careers/[id]": {
    en: "/careers/[id]",
    am: "/ሥራዎች/[id]",
  },
  "/tenders": {
    en: "/tenders",
    am: "/ጨረታዎች",
  },
  "/tenders/[id]": {
    en: "/tenders/[id]",
    am: "/ጨረታዎች/[id]",
  },
  "/downloads": {
    en: "/downloads",
    am: "/የማውረድ-ማዕከል",
  },
  "/contact": {
    en: "/contact",
    am: "/አግኙን",
  },
  "/faq": {
    en: "/faq",
    am: "/ጥያቄዎች",
  },
  "/search": {
    en: "/search",
    am: "/ፍለጋ",
  },
} as const;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });

export type LocalizedRoute = Parameters<typeof Link>[0]["href"];

export async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Unable to load messages for locale ${locale}`, error);
    return {};
  }
}
