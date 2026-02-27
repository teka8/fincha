"use client";

import { motion } from "framer-motion";
import {
    LucideArrowLeft, LucideCalendar, LucideUser,
    LucideClock, LucideShare2, LucideNewspaper,
    LucideArrowRight, LucideCheckCircle2, LucideShieldCheck
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useQuery } from "@tanstack/react-query";
import { useLocaleContext } from "@/providers/providers";
import type { Post } from "@/types/cms";

type Props = { id: string };

// ─── Detail Hook ─────────────────────────────────────────────────────────────

function useNewsDetail(id: string) {
    const { locale } = useLocaleContext();
    return useQuery<Post>({
        queryKey: ["news", locale, id],
        queryFn: async () => {
            const response = await fetch(`/api/news/${id}?locale=${locale}`);
            if (!response.ok) throw new Error("Failed to load news story");
            return response.json();
        },
        enabled: !!id,
    });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined, locale: string): string {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function getImageUrl(item: any): string | null {
    if (!item) return null;
    const candidate = item.featured_image || item.image || item.hero_image || item.event_image || item.thumbnail || item.media_url;
    if (typeof candidate === 'string') return candidate;
    if (candidate && typeof candidate === 'object') {
        return candidate.url || candidate.source_url || candidate.path || candidate.full_url || null;
    }
    return null;
}

// ─── Main View ───────────────────────────────────────────────────────────────

export function NewsDetailView({ id }: Props) {
    const { locale } = useLocaleContext();
    const { data: post, isLoading, isError } = useNewsDetail(id);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh] w-full bg-white dark:bg-slate-900">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="relative size-24 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-2xl" />
                        <LucideNewspaper size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-900 dark:text-white font-black tracking-[0.4em] text-xs uppercase text-center animate-pulse">
                            Loading Story
                        </p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center">
                            Synchronizing with Newsroom Archives
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (isError || !post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 bg-white dark:bg-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl p-16 rounded-[4rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-floating relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-rose-500/20" />
                    <LucideNewspaper size={80} strokeWidth={1} className="mx-auto mb-10 text-slate-100" />
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">Story Not Found</h2>
                    <p className="text-slate-500 mb-12 font-medium leading-relaxed">
                        The news article requested could not be located in our active feed. It may have been archived or is temporarily unavailable.
                    </p>
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 text-[11px] uppercase tracking-widest group"
                    >
                        <LucideArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Return to News Feed
                    </Link>
                </motion.div>
            </div>
        );
    }

    const imageUrl = getImageUrl(post);
    const date = new Date(post.created_at);
    const day = date.toLocaleDateString(locale, { day: "2-digit" });
    const month = date.toLocaleDateString(locale, { month: "short" }).toUpperCase();
    const year = date.getFullYear();

    return (
        <div className="relative min-h-screen bg-[#F9FAFB] dark:bg-slate-950 pb-32">
            {/* Immersive Header Layer */}
            <div className="absolute top-0 inset-x-0 h-[65vh] bg-slate-900 overflow-hidden">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt=""
                            fill
                            className="object-cover opacity-50 scale-105 blur-[1px]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-[#F9FAFB] dark:to-slate-950" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #80EF80 1px, transparent 0)', backgroundSize: '60px 60px' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9FAFB] dark:to-slate-950" />
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12">
                {/* Navigation & Transmit actions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-20"
                >
                    <Link
                        href="/news"
                        className="group flex items-center gap-5 text-white/70 hover:text-white transition-all duration-300"
                    >
                        <div className="size-14 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow-md transition-all duration-500">
                            <LucideArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100">Back To</span>
                            <span className="text-sm font-black tracking-tight">Main Feed</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/5 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                            <LucideShare2 size={16} />
                            Share
                        </button>
                        <div className="px-6 py-4 rounded-2xl bg-primary text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] shadow-glow-md">
                            Industry Insight
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Story Content */}
                    <div className="lg:col-span-8">
                        <motion.article
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white dark:bg-slate-900 rounded-[4rem] shadow-floating overflow-hidden border border-slate-100 dark:border-slate-800"
                        >
                            {/* Article Header Details */}
                            <div className="p-10 sm:p-20 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-800/50 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                    <LucideNewspaper size={240} />
                                </div>

                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col items-center justify-center size-20 rounded-[2rem] bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700">
                                            <span className="text-2xl font-bold text-primary leading-none uppercase">{month}</span>
                                            <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{day}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">Press Release</span>
                                            <span className="text-base font-black text-slate-900 dark:text-white tracking-tight">{post.category?.name || "Corporate News"} • {year}</span>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.02] tracking-tighter">
                                        {post.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-4 py-2 px-3 pr-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                            <div className="size-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-400">
                                                <LucideUser size={20} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Post Author</span>
                                                <span className="text-xs font-black text-slate-900 dark:text-white">FSF Newsroom</span>
                                            </div>
                                        </div>
                                        <div className="h-8 w-px bg-slate-100 hidden sm:block" />
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <LucideClock size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">7 Min Read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Story Graphic */}
                            {imageUrl && (
                                <div className="px-10 sm:px-20 pt-16">
                                    <div className="relative aspect-[21/10] rounded-[3.5rem] overflow-hidden shadow-2xl group border-8 border-white">
                                        <Image
                                            src={imageUrl}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </div>
                            )}

                            {/* Story Body Content */}
                            <div className="p-10 sm:p-20 py-20">
                                <div
                                    className="prose prose-slate dark:prose-invert prose-xl max-w-none text-slate-600 dark:text-slate-300 leading-[1.9]
                                        prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter
                                        prose-p:mb-12 prose-p:text-lg prose-p:font-medium
                                        prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-black
                                        prose-img:rounded-[3rem] prose-img:shadow-2xl prose-a:text-primary prose-a:font-black
                                        prose-blockquote:border-l-8 prose-blockquote:border-primary prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:px-12 prose-blockquote:py-10 prose-blockquote:rounded-[3rem] prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:text-slate-900 dark:prose-blockquote:text-white prose-blockquote:relative"
                                    dangerouslySetInnerHTML={{ __html: post.content || post.summary || "" }}
                                />
                            </div>

                            {/* Verification Badge */}
                            <div className="p-10 sm:p-20 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-[2rem] bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-xl border border-slate-100 dark:border-slate-700">
                                            <LucideShieldCheck size={32} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Official Communication</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Fincha Sugar Factory Media</p>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right space-y-2">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Publically Released</p>
                                        <p className="text-sm font-bold text-slate-900">{formatDate(post.created_at, locale)}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    {/* Side Feed Panel */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        {/* Newsroom Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-floating relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 -mr-24 -mt-24 size-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-1000" />

                            <div className="relative z-10 space-y-12">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-3xl bg-white/10 flex items-center justify-center text-primary border border-white/5 shadow-inner">
                                        <LucideNewspaper size={24} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-[0.2em]">Newsroom</h3>
                                </div>

                                <div className="space-y-12">
                                    <div className="group/stat">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-3 group-hover/stat:text-primary transition-colors">Access Hub</p>
                                        <div className="flex items-center gap-4 group-hover/stat:translate-x-2 transition-transform duration-500">
                                            <p className="text-xl font-black text-white">Public Press</p>
                                            <div className="size-3 rounded-full bg-primary shadow-glow-md" />
                                        </div>
                                    </div>

                                    <div className="group/stat">
                                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-3 group-hover/stat:text-primary transition-colors">Internal Index</p>
                                        <p className="text-2xl font-black text-white group-hover/stat:translate-x-2 transition-transform duration-500">
                                            NW-{post.id.toString().padStart(4, '0')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Stories Widget (Mental Placeholder - Could be implemented if needed) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 border border-slate-100 dark:border-slate-800 shadow-floating relative overflow-hidden text-center"
                        >
                            <div className="size-20 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary mx-auto mb-8">
                                <LucideCheckCircle2 size={40} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Official Release</h4>
                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-widest">
                                This article is an authorized publication of Fincha Sugar Factory's media department and follows our core transparency guidelines.
                            </p>
                            <Link href="/news" className="inline-flex items-center gap-2 mt-10 text-[10px] font-black text-primary uppercase tracking-[0.3em] group">
                                Browse Archives <LucideArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
