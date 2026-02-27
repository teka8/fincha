"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocaleContext } from "@/providers/providers";
import type { Tender, TenderGuideline } from "@/types/cms";

export type TendersMeta = {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
};

export type TendersListResult = {
  data: Tender[];
  meta: TendersMeta;
  tender_guideline?: TenderGuideline | null;
};

function normalizeMeta(raw: Record<string, unknown>): TendersMeta {
  const get = (val: unknown): number => {
    if (Array.isArray(val)) return Number(val[0]) || 0;
    return Number(val) || 0;
  };
  return {
    current_page: get(raw.current_page) || 1,
    last_page: get(raw.last_page) || 1,
    total: get(raw.total) || 0,
    per_page: get(raw.per_page) || 10,
  };
}

export function useTendersList(page = 1, perPage = 10, tenderType?: string) {
  const { locale } = useLocaleContext();

  return useQuery<TendersListResult>({
    queryKey: ["tenders-list", locale, page, perPage, tenderType ?? ""],
    queryFn: async () => {
      const qs = new URLSearchParams({
        locale,
        page: String(page),
        per_page: String(perPage),
      });
      if (tenderType) qs.set("tender_type", tenderType);
      const res = await fetch(`/api/tenders?${qs.toString()}`);
      if (!res.ok) throw new Error("Failed to load tenders");
      const json = (await res.json()) as {
        data?: Tender[];
        meta?: Record<string, unknown>;
        tender_guideline?: TenderGuideline | null;
      };
      const data: Tender[] = Array.isArray(json.data) ? json.data : [];
      const meta: TendersMeta = json.meta
        ? normalizeMeta(json.meta)
        : { current_page: page, last_page: 1, total: data.length, per_page: perPage };
      return { data, meta, tender_guideline: json.tender_guideline ?? null };
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: (prev) => prev,
  });
}

export function useTenderDetail(id: string | null) {
  const { locale } = useLocaleContext();

  return useQuery<Tender | null>({
    queryKey: ["tender-detail", locale, id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/tenders/${id}?locale=${locale}`);
      if (!res.ok) throw new Error("Failed to load tender");
      return (await res.json()) as Tender;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
