"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LucideArrowLeft, LucideArrowRight, LucideNewspaper } from "lucide-react";
import type { Post } from "@/types/cms";
import { useNewsList } from "@/hooks/use-news-list";
import { Link } from "@/i18n/routing";
import type { LocalizedRoute } from "@/i18n/routing";

// ─── Slug helpers (ported from NewsList.jsx) ─────────────────────────────────

const isObjectLikeSlug = (value: string) =>
    /^\[object\s+[^\]]+\]$/i.test(value);

const getNormalizedSlug = (item: Post): string | null => {
    const candidate =
        typeof item?.slug === "string"
            ? item.slug.trim()
            : "";

    if (!candidate || isObjectLikeSlug(candidate)) return null;
    return candidate;
};

const isValidItem = (item: Post): boolean =>
    item !== null &&
    item !== undefined &&
    typeof item === "object" &&
    !!getNormalizedSlug(item);

// ─── Formatting helpers ───────────────────────────────────────────────────────

function formatDate(dateString: string | undefined): string {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse rounded-2xl bg-slate-100 ${className ?? ""}`}
        />
    );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function NewsListView() {
    const [page, setPage] = useState(1);
    const { data: result, isLoading, isError, refetch } = useNewsList(page);
    const news = result?.data ?? [];
    const meta = result?.meta;

    const [selectedNews, setSelectedNews] = useState<Post | null>(null);
    const [showFullContent, setShowFullContent] = useState(false);

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => {
        if (meta && page < meta.last_page) setPage(page + 1);
    };

    // Reset selected article on page change
    useEffect(() => {
        setSelectedNews(null);
        setShowFullContent(false);
    }, [page]);

    // Auto-select first valid item
    useEffect(() => {
        if (news.length > 0 && !selectedNews) {
            const validNews = news.filter(isValidItem);
            if (validNews.length > 0) setSelectedNews(validNews[0]);
        }
    }, [news, selectedNews]);

    // ── Loading state ────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-[300px] sm:h-[450px] w-full rounded-[2.5rem]" />
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="lg:col-span-4 space-y-6">
                    <Skeleton className="h-8 w-1/2" />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    // ── Error state ──────────────────────────────────────────────────────────────
    if (isError) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-lg font-bold tracking-wide uppercase mb-6">
                    Failed to load news.
                </p>
                <button
                    onClick={() => void refetch()}
                    className="px-8 py-3 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary/90 transition-all shadow-xl uppercase tracking-widest text-xs"
                >
                    Retry
                </button>
            </div>
        );
    }

    const validItems = news.filter(isValidItem);

    // ── Empty state ──────────────────────────────────────────────────────────────
    if (validItems.length === 0) {
        return (
            <div className="text-center py-16 text-slate-500">
                <LucideNewspaper size={48} className="mx-auto mb-4 text-slate-300" strokeWidth={1} />
                <p className="text-lg font-medium">No news articles yet.</p>
            </div>
        );
    }

    const currentItem = selectedNews ?? validItems[0];
    const contentToShow = showFullContent
        ? currentItem.content
        : `${currentItem.content.slice(0, 500)}...`;

    // ── Main layout ──────────────────────────────────────────────────────────────
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ── Left: Featured Detail View ────────────────────────────────────── */}
            <div className="lg:col-span-8 min-w-0">
                <div className="sticky top-28 w-full">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                        {currentItem.title}
                    </h2>

                    {/* Featured image */}
                    <div className="relative h-[300px] sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 group border-4 border-white">
                        {currentItem.featured_image || currentItem.image ? (
                            <Image
                                src={(currentItem.featured_image ?? currentItem.image) as string}
                                alt={currentItem.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                <LucideNewspaper size={64} strokeWidth={1} />
                            </div>
                        )}
                        <div className="absolute bottom-6 left-6 z-10">
                            <span className="px-5 py-2 rounded-2xl bg-primary/50 backdrop-blur-xl text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                                Live Updates
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-8 pb-8 border-b border-slate-100">
                        {currentItem.category && (
                            <span className="text-primary font-black uppercase tracking-widest text-[10px] sm:text-xs">
                                {currentItem.category.name}
                            </span>
                        )}
                        <div className="hidden sm:block h-6 w-px bg-slate-200" />
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest italic">
                            {formatDate(currentItem.created_at)}
                        </span>
                    </div>

                    {/* Article content */}
                    <div className="prose prose-lg prose-slate max-w-none break-words overflow-hidden prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-medium">
                        <div
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: contentToShow }}
                        />
                    </div>

                    {/* Read more / Less + link to detail */}
                    <div className="flex flex-wrap items-center gap-4 mt-10">
                        <button
                            onClick={() => setShowFullContent((prev) => !prev)}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-primary/90 text-white font-black rounded-2xl hover:bg-primary transition-all duration-300 uppercase tracking-[0.2em] text-[10px]"
                        >
                            {showFullContent ? "Show Less" : "Read full story"}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7" />
                            </svg>
                        </button>
                        {getNormalizedSlug(currentItem) && (
                            <Link
                                href={{
                                    pathname: "/news/[id]",
                                    params: { id: getNormalizedSlug(currentItem) as string },
                                } as unknown as LocalizedRoute}
                                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-all"
                            >
                                Open article
                                <LucideArrowRight size={14} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Right: Sidebar List ───────────────────────────────────────────── */}
            <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                        Catch up on more news
                    </h3>
                </div>

                <div className="space-y-4 max-h-[1200px] overflow-y-auto pr-2 news-custom-scrollbar">
                    {validItems.map((item) => {
                        const isActive = (selectedNews?.id ?? validItems[0].id) === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setSelectedNews(item);
                                    setShowFullContent(false);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className={`group relative w-full text-left flex flex-col p-4 rounded-3xl cursor-pointer transition-all duration-500 border-2 ${isActive
                                        ? "bg-white border-primary shadow-2xl scale-[1.02] z-10"
                                        : "bg-slate-50/50 border-transparent hover:bg-white hover:shadow-xl"
                                    }`}
                            >
                                <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4 shadow-md">
                                    {item.featured_image || item.image ? (
                                        <Image
                                            src={(item.featured_image ?? item.image) as string}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 font-bold">
                                            <LucideNewspaper size={32} strokeWidth={1} />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[8px] font-black uppercase tracking-wider shadow-sm">
                                            News
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h4
                                        className={`text-base font-extrabold leading-snug mb-2 transition-colors text-left ${isActive
                                                ? "text-primary"
                                                : "text-slate-900 group-hover:text-primary"
                                            }`}
                                    >
                                        {item.title}
                                    </h4>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {formatDate(item.created_at)}
                                        </span>
                                        {isActive && (
                                            <div className="flex items-center gap-1 text-primary animate-pulse">
                                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                <span className="text-[10px] font-black uppercase">Reading</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* ── Pagination controls ─────────────────────────────────────────── */}
                {meta && meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100">
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="p-2 rounded-xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm group"
                            aria-label="Previous page"
                        >
                            <LucideArrowLeft
                                size={16}
                                className="group-hover:-translate-x-0.5 transition-transform"
                            />
                        </button>

                        <span className="text-[10px] font-black text-primary uppercase">
                            {page} / {meta.last_page}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={page >= meta.last_page}
                            className="p-2 rounded-xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all shadow-sm group"
                            aria-label="Next page"
                        >
                            <LucideArrowRight
                                size={16}
                                className="group-hover:translate-x-0.5 transition-transform"
                            />
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        .news-custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .news-custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .news-custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
        </div>
    );
}
