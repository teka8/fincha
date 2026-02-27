import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Navigation } from "@/components/layout/navigation";
import { getMessages, locales } from "@/i18n/routing";
import { getApiClient } from "@/lib/api-client";
import { Providers } from "@/providers/providers";
import type { CompanyInfo } from "@/types/cms";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export const metadata: Metadata = {
  title: {
    default: "Fincha Sugar Factory",
    template: "%s | Fincha Sugar Factory",
  },
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages(locale);
  const direction = "ltr";

  // Fetch navigation and footer data on the server
  const client = getApiClient(locale);
  const [footerRes, companyData] = await Promise.all([
    client.get("/footer").catch(() => ({ data: { pages: [] } })),
    client.get("/company-info").then((res: { data: CompanyInfo }) => res.data).catch(() => null)
  ]);

  interface FooterLinkData {
    id: number;
    title: string;
    url?: string;
    slug?: string;
    section?: string;
  }

  const footerLinks = (footerRes.data?.pages ?? []).map((link: FooterLinkData) => ({
    id: link.id,
    label: link.title,
    href: link.url ?? (link.slug ? `/${link.slug}` : "/"),
    section: link.section
  }));

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Africa/Addis_Ababa">
      <Providers locale={locale}>
        <div className={direction} data-locale={locale} data-direction={direction}>
          <div className="flex min-h-screen flex-col">
            <a
              href="#main-content"
              className="absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-full rounded-full bg-primary px-4 py-2 text-sm text-white focus-visible:translate-y-2"
            >
              Skip to content
            </a>
            <Navigation locale={locale} brandName={companyData?.name} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer links={footerLinks} company={companyData} />
          </div>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
