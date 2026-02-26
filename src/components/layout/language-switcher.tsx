"use client";

import { useTransition } from "react";

import { locales, usePathname } from "@/i18n/routing";

const labelMap: Record<(typeof locales)[number], string> = {
  en: "English",
  am: "አማርኛ",
};

type LanguageSwitcherProps = {
  currentLocale: string;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const activeLocale = locales.includes(currentLocale as (typeof locales)[number]) ? currentLocale : locales[0];

  return (
    <div className="flex items-center gap-2 text-sm">
      {locales.map((languageCode) => {
        const active = activeLocale === languageCode;
        return (
          <button
            key={languageCode}
            type="button"
            onClick={() =>
              startTransition(() => {
                const segments = pathname.split("/").filter(Boolean);
                if (segments.length === 0) {
                  segments.push(languageCode);
                } else {
                  segments[0] = languageCode;
                }

                const search = typeof window !== "undefined" ? window.location.search : "";
                const hash = typeof window !== "undefined" ? window.location.hash : "";
                const nextPath = `/${segments.join("/")}${search}${hash}`;
                window.location.href = nextPath;
              })
            }
            disabled={activeLocale === languageCode || isPending}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active
                ? "bg-primary text-white"
                : "text-muted hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {labelMap[languageCode]}
          </button>
        );
      })}
    </div>
  );
}
