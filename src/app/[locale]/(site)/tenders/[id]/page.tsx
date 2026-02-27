import type { Metadata } from "next";
import { TenderDetailClient } from "@/features/tenders/tender-detail-client";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Tender ${id}`,
    description: "Tender details from Fincha Sugar Factory.",
  };
}

export default async function TenderDetailPage({ params }: Props) {
  const { locale, id } = await params;

  return <TenderDetailClient id={id} locale={locale} />;
}
