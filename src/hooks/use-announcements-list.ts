"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocaleContext } from "@/providers/providers";
import type { Announcement } from "@/types/cms";

type PaginatedAnnouncements = {
    data: Announcement[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
};

export function useAnnouncementsList(page = 1, perPage = 10, search = "", category = "") {
    const { locale } = useLocaleContext();
    return useQuery<PaginatedAnnouncements>({
        queryKey: ["announcements", { locale, page, perPage, search, category }],
        queryFn: async () => {
            const params = new URLSearchParams({
                locale,
                page: String(page),
                per_page: String(perPage),
                search,
                category: category === "all" ? "" : category,
            });
            const response = await fetch(`/api/announcements?${params.toString()}`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });
}

export function useAnnouncementDetail(id: string) {
    const { locale } = useLocaleContext();
    return useQuery<Announcement>({
        queryKey: ["announcements", locale, id],
        queryFn: async () => {
            const response = await fetch(`/api/announcements/${id}?locale=${locale}`);
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
        enabled: !!id,
    });
}
