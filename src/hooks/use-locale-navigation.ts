"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLocaleNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const replace = useCallback(
    ({ locale, pathname: nextPathname }: { locale: string; pathname?: string }) => {
      const basePathname = nextPathname ?? pathname;
      const segments = basePathname.split("/").filter(Boolean);
      if (segments.length > 0 && segments[0] === params?.locale) {
        segments.shift();
      }
      const localizedPath = [locale, ...segments].join("/");
      router.replace(`/${localizedPath}`.replace(/\/\/+/, "/"));
    },
    [params?.locale, pathname, router],
  );

  return { replace };
}
