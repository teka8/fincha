"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<{
  locale: string;
}>;

export function ThemeProvider({ locale, children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      value={{
        light: "light",
        dark: locale === "am" ? "dark rtl" : "dark",
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
