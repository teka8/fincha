"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LucideMegaphone, LucideArrowRight, LucideSearch,
    LucideFilter, LucideDownload, LucideCalendarDays,
    LucideX, LucideBell, LucideCheckCircle2
} from "lucide-react";
import { useAnnouncementsList } from "@/hooks/use-announcements-list";
import { Link } from "@/i18n/routing";
import type { Announcement } from "@/types/cms";
import { clsx } from "clsx";

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "all", label: "All Announcements" },
    { id: "official", label: "Official" },
    { id: "events", label: "Events" },
    { id: "media", label: "Media" },
    { id: "urgent", label: "Urgent" },
];

// ─── Components ──────────────────────────────────────────────────────────────

function AnnouncementCard({ item, index }: { item: Announcement; index: number }) {
    const date = new Date(item.created_at);
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link
                href={{ pathname: "/announcement/[id]", params: { id: String(item.id) } } as any}
                className="group relative flex flex-col md:flex-row gap-8 p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
            >
                {/* Visual Date Element */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-3xl bg-slate-50 dark:bg-slate-700 group-hover:bg-primary/5 transition-colors duration-500 overflow-hidden relative">
                    <div className="absolute top-0 inset-x-0 h-1 bg-primary/20 group-hover:bg-primary transition-colors" />
                    <span className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-primary leading-none z-10">{day}</span>
                    <span className="text-[10px] font-black text-slate-400 group-hover:text-primary/70 uppercase tracking-widest mt-1 z-10">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className={clsx(
                            "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest",
                            item.status === "High"
                                ? "bg-amber-100 text-amber-600"
                                : "bg-primary/5 text-primary"
                        )}>
                            {item.category ?? "News"}
                        </span>
                        {item.attachments && item.attachments.length > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-widest group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                <LucideDownload size={12} />
                                {item.attachments.length} Document{item.attachments.length > 1 ? "s" : ""}
                            </div>
                        )}
                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            Official Archive
                        </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-[1.2] mb-4 line-clamp-2">
                        {item.title}
                    </h3>

                    <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {item.excerpt ?? item.description ?? "Access the full announcement for strategic directives and official updates from Fincha Valley."}
                    </p>
                </div>

                {/* Action Arrow Overlay */}
                <div className="flex items-center justify-center md:pl-8 border-l border-slate-50 group-hover:border-primary/10 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-slate-700 group-hover:bg-primary flex items-center justify-center text-slate-300 group-hover:text-white transition-all duration-500 transform group-hover:rotate-[-45deg] shadow-sm">
                        <LucideArrowRight size={24} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AnnouncementListView() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data: result, isLoading, isError, refetch } = useAnnouncementsList(page, 10, debouncedSearch, activeTab);
    const announcements = result?.data ?? [];
    const meta = result?.meta;

    return (
        <div className="space-y-12">
            {/* Control Bar: Tabs & Search */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-[2.5rem] p-4 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Tabs */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => {
                                setActiveTab(cat.id);
                                setPage(1);
                            }}
                            className={clsx(
                                "relative px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                                activeTab === cat.id
                                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Unified Search Input */}
                <div className="relative w-full lg:w-96 group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">
                        <LucideSearch size={18} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search archives..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 pl-14 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-700 border-transparent focus:bg-white dark:focus:bg-slate-600 focus:border-primary/20 focus:ring-0 text-sm font-bold text-slate-900 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-500"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-rose-500 transition-colors"
                        >
                            <LucideX size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Results Legend */}
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-primary/40" />
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        {isLoading ? "Synchronizing announcement..." : `Found ${meta?.total ?? announcements.length} items`}
                    </p>
                </div>

                {searchTerm && (
                    <p className="text-xs font-bold text-slate-300 italic">
                        Filtering for: <span className="text-primary">"{searchTerm}"</span>
                    </p>
                )}
            </div>

            {/* Content Display */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-44 w-full bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] animate-pulse relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="bg-white dark:bg-slate-800 p-20 rounded-[4rem] text-center border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden relative">
                        <div className="absolute -top-12 -right-12 size-48 bg-primary/5 rounded-full blur-3xl" />
                        <LucideMegaphone size={64} strokeWidth={1} className="mx-auto mb-8 text-slate-200" />
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Announcement Unreachable</h3>
                        <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10 leading-relaxed">
                            We're having trouble connecting to the archive server. Please verify your connection.
                        </p>
                        <button
                            onClick={() => void refetch()}
                            className="px-10 py-4 bg-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
                        >
                            Retry Transmission
                        </button>
                    </div>
                ) : announcements.length === 0 ? (
                    <div className="text-center py-40 rounded-[4rem] bg-slate-50/30 border-2 border-dashed border-slate-100">
                        <div className="bg-white dark:bg-slate-800 size-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl relative">
                            <LucideSearch size={40} className="text-slate-100" strokeWidth={1} />
                            <div className="absolute -top-1 -right-1 size-5 bg-rose-500 rounded-full border-4 border-white" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Announcements Found</h3>

                    </div>
                ) : (
                    <div className="grid gap-8">
                        <AnimatePresence mode="popLayout">
                            {announcements.map((item, idx) => (
                                <AnnouncementCard key={item.id} item={item} index={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {meta && meta.last_page > 1 && (
                <div className="flex flex-col items-center gap-6 pt-12 animate-fade-in">
                    <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-20 transition-all font-black text-xs uppercase"
                        >
                            Prev
                        </button>
                        <div className="px-6 flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Page</span>
                            <span className="text-lg font-black text-primary">{page} <span className="text-slate-300 mx-1">/</span> {meta.last_page}</span>
                        </div>
                        <button
                            onClick={() => setPage(p => (meta && p < meta.last_page ? p + 1 : p))}
                            disabled={!meta || page >= meta.last_page}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl text-slate-400 hover:text-primary hover:bg-slate-50 disabled:opacity-20 transition-all font-black text-xs uppercase"
                        >
                            Next
                        </button>
                    </div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                        Navigating Fincha Archive
                    </p>
                </div>
            )}
        </div>
    );
}
