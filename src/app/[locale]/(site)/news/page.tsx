import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { NewsListView } from "@/features/news/news-list-view";

type NewsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.news"),
    description: "Stay updated with the latest news, announcements, and industrial insights from Fincha Sugar Factory.",
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "common" });

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-layout mx-auto px-8">
          <SectionHeading
            eyebrow="News & Media"
            title="Voice of the Valley"
            description="Discover the latest stories on industrial expansion, community impact, and agricultural innovation at Fincha."
            align="left"
          />
        </div>
      </section>

      {/* Interactive News List — featured article + sidebar + pagination */}
      <SectionContainer className="pt-4">
        <NewsListView />
      </SectionContainer>

      {/* Archive / Search Banner */}
      <div className="bg-slate-50">
        <SectionContainer className="py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-[40px] bg-white shadow-sm border border-slate-200/50">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">Looking for a specific update?</h3>
              <p className="text-sm text-slate-500">
                Search through our archives for past announcements, tender results, and environmental reports.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold transition-transform hover:scale-105">
                Archives
              </button>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
