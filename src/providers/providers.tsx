"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";

import { ThemeProvider } from "@/providers/theme-provider";

type ProvidersProps = PropsWithChildren<{
  locale: string;
}>;

type LocaleContextValue = {
  locale: string;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function Providers({ locale, children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const clientValue = useMemo(() => ({ locale }), [locale]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", locale === "am" ? "rtl" : "ltr");
  }, [locale]);

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider value={clientValue}>
        <AnimatePresence mode="wait">
          <ThemeProvider locale={locale}>{children}</ThemeProvider>
        </AnimatePresence>
      </LocaleContext.Provider>
    </QueryClientProvider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within Providers");
  }
  return context;
}
