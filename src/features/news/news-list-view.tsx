"use client";

import Image from "next/image";
import { useState } from "react";
import { LucideArrowLeft, LucideArrowRight, LucideNewspaper, LucideCalendar, LucideClock } from "lucide-react";
import type { Post } from "@/types/cms";
import { useNewsList } from "@/hooks/use-news-list";
import { Link } from "@/i18n/routing";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateString: string | undefined): string {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

const getNormalizedSlug = (item: Post): string | null => {
    if (typeof item?.slug === "string" && item.slug.trim() && !item.slug.includes("[object")) {
        return item.slug.trim();
    }
    return null;
};

// ─── Components ──────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: Post }) {
    const newsId = String(item.id);
    const imageUrl = (item.featured_image ?? item.image) as string;

    return (
        <Link
            id={`news-card-${item.id}`}
            href={{ pathname: "/news/[id]", params: { id: newsId } } as any}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover-lift shadow-sm animate-fade-up"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-200">
                        <LucideNewspaper size={64} strokeWidth={0.5} />
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {item.category?.name ?? "Update"}
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <LucideClock size={12} />
                    {formatDate(item.created_at)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-snug mb-4 line-clamp-2">
                    {item.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 font-medium leading-relaxed">
                    {item.excerpt ?? item.summary ?? "Stay informed with company announcements and industry insights."}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                        Read Story <LucideArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export function NewsListView() {
    const [page, setPage] = useState(1);
    const { data: result, isLoading, isError, refetch } = useNewsList(page, 10);
    const news = result?.data ?? [];
    const meta = result?.meta;

    if (isLoading) {
        return (
            <div className="space-y-12">
                <div className="w-full aspect-[21/7] bg-slate-100 rounded-[2.5rem] animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex flex-col gap-4">
                            <div className="aspect-[16/10] bg-slate-100 rounded-[2rem] animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-6 w-3/4 bg-slate-100 rounded-lg animate-pulse" />
                                <div className="h-4 w-full bg-slate-50 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700">
                <p className="text-slate-400 font-bold mb-6">Failed to load industry insights.</p>
                <button
                    onClick={() => void refetch()}
                    className="px-8 py-3 bg-primary text-white font-black rounded-2xl hover:scale-105 transition-all text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
                >
                    Retry Fetch
                </button>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400">
                <LucideNewspaper size={48} className="mx-auto mb-4 opacity-10" />
                <p className="font-medium">No stories available at this time.</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Latest News & Stories
                </h3>
                <div className="flex gap-2">
                    {/* Pagination integrated here is sleeker */}
                    {meta && meta.last_page > 1 && (
                        <div className="flex items-center gap-1">
                            <button
                                id="news-prev-page"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-20 transition-colors"
                            >
                                <LucideArrowLeft size={18} />
                            </button>
                            <span className="text-xs font-black text-slate-400 px-2">{page} / {meta.last_page}</span>
                            <button
                                id="news-next-page"
                                onClick={() => setPage(p => (meta && p < meta.last_page ? p + 1 : p))}
                                disabled={!meta || page >= meta.last_page}
                                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-20 transition-colors"
                            >
                                <LucideArrowRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>

            {/* Footer Pagination */}
            {meta && meta.last_page > 1 && (
                <div className="flex justify-center pt-8">
                    <div className="flex items-center gap-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-2 text-xs font-black uppercase tracking-widest disabled:opacity-20"
                        >
                            Prev
                        </button>
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-xs font-black text-primary">{page} of {meta.last_page}</span>
                        <div className="h-4 w-px bg-slate-200" />
                        <button
                            onClick={() => setPage(p => (meta && p < meta.last_page ? p + 1 : p))}
                            disabled={!meta || page >= meta.last_page}
                            className="px-4 py-2 text-xs font-black uppercase tracking-widest disabled:opacity-20"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
