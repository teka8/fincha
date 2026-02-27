import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import TenderList from "@/components/tenders/TenderList";
import { PageHero } from "@/components/ui/page-hero";
import { getTenders } from "@/lib/cms";
import type { TenderGuideline } from "@/types/cms";

type TendersPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: TendersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.tenders"),
    description: "Latest tenders and updates from Fincha Sugar Factory.",
  };
}

export default async function TendersPage({ params }: TendersPageProps) {
  const { locale } = await params;

  let tenders = [] as Awaited<ReturnType<typeof getTenders>>["data"];
  let tenderGuideline: TenderGuideline | null = null;

  try {
    const tendersRes = await getTenders(locale);
    tenders = tendersRes.data ?? [];
    tenderGuideline = (tendersRes as { tender_guideline?: TenderGuideline | null }).tender_guideline ?? null;
  } catch (error) {
    console.error("Failed to load tenders", error);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <PageHero
        title="Transparent Procurement, Shared Growth"
        subtitle="Explore current tender opportunities and partner with Fincha Sugar Factory on projects that strengthen industry and community."
        image="/images/pexels-mikael-blomkvist-6476595.jpg"
        badge="Tender Notices"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TenderList tenders={tenders} tenderGuideline={tenderGuideline} />
      </div>
    </main>
  );
}

