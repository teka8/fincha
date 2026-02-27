"use client";

import { TenderDetailView } from "@/features/tenders/tender-detail-view";
import { useTenderDetail } from "@/hooks/use-tenders-list";

export function TenderDetailClient({ id, locale }: { id: string; locale: string }) {
  const { data, isLoading, isError } = useTenderDetail(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-40 min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">Loading tender...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return <TenderDetailView tender={null} locale={locale} />;
  }

  return <TenderDetailView tender={data ?? null} locale={locale} />;
}
