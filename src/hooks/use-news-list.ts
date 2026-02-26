"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocaleContext } from "@/providers/providers";
import type { Post } from "@/types/cms";

export type NewsMeta = {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

export type PaginatedNewsResult = {
    data: Post[];
    meta: NewsMeta;
};

function normalizeNewsMeta(raw: Record<string, unknown>): NewsMeta {
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

export function useNewsList(page = 1, perPage = 10) {
    const { locale } = useLocaleContext();

    return useQuery<PaginatedNewsResult>({
        queryKey: ["news-list", locale, page, perPage],
        queryFn: async () => {
            const params = new URLSearchParams({
                locale,
                page: String(page),
                per_page: String(perPage),
            });
            const res = await fetch(`/api/news?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to load news");
            const json = await res.json() as {
                data?: Post[];
                meta?: Record<string, unknown>;
            };

            const data: Post[] = Array.isArray(json.data) ? json.data : [];
            const meta: NewsMeta = json.meta
                ? normalizeNewsMeta(json.meta as Record<string, unknown>)
                : { current_page: page, last_page: 1, total: data.length, per_page: perPage };

            return { data, meta };
        },
        staleTime: 1000 * 60 * 2,
        placeholderData: (prev) => prev,
    });
}
