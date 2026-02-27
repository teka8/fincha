import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SectionContainer } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
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
<<<<<<< HEAD
      {/* Page Header */}
      <section className="bg-white dark:bg-slate-900 pt-24 pb-12">
        <div className="max-w-layout mx-auto px-8">
          <SectionHeading
            eyebrow="News & Media"
            title="Voice of the Valley"
            description="Discover the latest stories on industrial expansion, community impact, and agricultural innovation at Fincha."
            align="left"
          />
        </div>
      </section>
=======
      <PageHero
        title="Voice of the Valley"
        subtitle="Discover the latest stories on industrial expansion, community impact, and agricultural innovation at Fincha."
        image="/images/pexels-mikael-blomkvist-64765951.jpg"
        badge="News & Media"
      />
>>>>>>> 41d8bfce7b06977bd0e03c2a0783425e638d7d1d

      {/* Interactive News List — featured article + sidebar + pagination */}
      <SectionContainer className="pt-4">
        <NewsListView />
      </SectionContainer>

      {/* Archive / Search Banner */}
      <div className="bg-slate-50 dark:bg-slate-900/50">
        <SectionContainer className="py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-[40px] bg-white dark:bg-slate-900 shadow-sm border border-slate-200/50 dark:border-slate-800">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Looking for a specific update?</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Search through our archives for past announcements, tender results, and environmental reports.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-none">
                Archives
              </button>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
