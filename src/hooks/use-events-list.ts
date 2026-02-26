"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocaleContext } from "@/providers/providers";
import type { Event } from "@/types/cms";

export type EventsMeta = {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
};

export type PaginatedEventsResult = {
    data: Event[];
    meta: EventsMeta;
};

function normalizeMeta(raw: Record<string, unknown>): EventsMeta {
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

export function useEventsList(page = 1, perPage = 10) {
    const { locale } = useLocaleContext();

    return useQuery<PaginatedEventsResult>({
        queryKey: ["events-list", locale, page, perPage],
        queryFn: async () => {
            const qs = new URLSearchParams({
                locale,
                page: String(page),
                per_page: String(perPage),
            });
            const res = await fetch(`/api/events?${qs.toString()}`);
            if (!res.ok) throw new Error("Failed to load events");
            const json = await res.json() as {
                data?: Event[];
                meta?: Record<string, unknown>;
            };
            const data: Event[] = Array.isArray(json.data) ? json.data : [];
            const meta: EventsMeta = json.meta
                ? normalizeMeta(json.meta)
                : { current_page: page, last_page: 1, total: data.length, per_page: perPage };
            return { data, meta };
        },
        staleTime: 1000 * 60 * 2,
        placeholderData: (prev) => prev,
    });
}

export function useEventDetail(id: string | null) {
    const { locale } = useLocaleContext();

    return useQuery<Event | null>({
        queryKey: ["event-detail", locale, id],
        queryFn: async () => {
            if (!id) return null;
            const res = await fetch(`/api/events/${id}?locale=${locale}`);
            if (!res.ok) throw new Error("Failed to load event");
            return (await res.json()) as Event;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    });
}
