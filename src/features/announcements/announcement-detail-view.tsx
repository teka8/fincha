"use client";

import { motion } from "framer-motion";
import {
    LucideArrowLeft, LucideMegaphone, LucideCalendar,
    LucideDownload, LucideExternalLink,
    LucideLoader2, LucideShare2, LucideCheckCircle2,
    LucideShieldCheck, LucideInfo, LucideFileText
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useAnnouncementDetail } from "@/hooks/use-announcements-list";
import { clsx } from "clsx";

type Props = { id: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
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

export function AnnouncementDetailView({ id }: Props) {
    const { data: announcement, isLoading, isError } = useAnnouncementDetail(id);

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
                        <LucideMegaphone size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-slate-900 font-black tracking-[0.4em] text-xs uppercase text-center animate-pulse">
                            Establishing Secure Link
                        </p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                            Accessing Fincha Central Registry
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (isError || !announcement) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 bg-white dark:bg-slate-900">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-xl p-16 rounded-[4rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-floating relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-rose-500/20" />
                    <LucideMegaphone size={80} strokeWidth={1} className="mx-auto mb-10 text-slate-100" />
                    <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">Registry Entry Not Found</h2>
                    <p className="text-slate-500 mb-12 font-medium leading-relaxed">
                        The announcement requested could not be located in our active archives. It may have been relocated or is currently restricted.
                    </p>
                    <Link
                        href="/announcement"
                        className="inline-flex items-center gap-4 px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-900/10 text-[11px] uppercase tracking-widest group"
                    >
                        <LucideArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Index
                    </Link>
                </motion.div>
            </div>
        );
    }

    const imageUrl = getImageUrl(announcement);
    const date = new Date(announcement.created_at);
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
    const year = date.getFullYear();

    return (
        <div className="relative min-h-screen bg-white dark:bg-slate-900 pb-32">
            {/* Cinematic Background Layer */}
            <div className="absolute top-0 inset-x-0 h-[60vh] bg-slate-900 overflow-hidden">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt=""
                            fill
                            className="object-cover opacity-40 scale-105 blur-[2px]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-white dark:to-slate-900" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #80EF80 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-12">
                {/* Back Button & Top Actions */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-16"
                >
                    <Link
                        href="/announcement"
                        className="group flex items-center gap-5 text-white/60 hover:text-white transition-all duration-300"
                    >
                        <div className="size-14 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow-md transition-all duration-500">
                            <LucideArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 group-hover:opacity-100">Browse All</span>
                            <span className="text-sm font-black tracking-tight">Archives Index</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/5 text-white/60 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                            <LucideShare2 size={16} />
                            Transmit
                        </button>
                        <div className="px-6 py-4 rounded-2xl bg-primary text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] shadow-glow-md">
                            Verified Entry
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Content Card */}
                    <div className="lg:col-span-8">
                        <motion.article
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white dark:bg-slate-800 rounded-[4rem] shadow-floating overflow-hidden border border-slate-100 dark:border-slate-700"
                        >
                            {/* Article Header */}
                            <div className="p-10 sm:p-20 bg-gradient-to-b from-slate-50 dark:from-slate-900 to-white dark:to-slate-800 border-b border-slate-100 dark:border-slate-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                                    <LucideMegaphone size={240} />
                                </div>

                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col items-center justify-center size-20 rounded-[2rem] bg-white shadow-xl border border-slate-100">
                                            <span className="text-2xl font-black text-primary leading-none">{day}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{month}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">Official Registry</span>
                                            <span className="text-base font-black text-slate-900 tracking-tight">{year} • Internal Archive</span>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.02] tracking-tighter">
                                        {announcement.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6">
                                        <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-900/10">
                                            <LucideShieldCheck size={16} className="text-primary" />
                                            Authentic Document
                                        </div>
                                        <div className="h-6 w-[1px] bg-slate-200" />
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Archive Index</span>
                                            <span className="text-sm font-black text-slate-900">FSA-{announcement.id.toString().padStart(4, '0')}</span>
                                        </div>
                                        <div className="h-6 w-[1px] bg-slate-200" />
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                Status: <span className="text-slate-900 ml-1">{announcement.status || "Active Announcement"}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Visual */}
                            {imageUrl && (
                                <div className="px-10 sm:px-20 pt-16">
                                    <div className="relative aspect-[16/9] rounded-[3.5rem] overflow-hidden shadow-2xl group border-8 border-white">
                                        <Image
                                            src={imageUrl}
                                            alt={announcement.title}
                                            fill
                                            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </div>
                                </div>
                            )}

                            {/* Article Body */}
                            <div className="p-10 sm:p-20 py-20">
                                <div
                                    className="prose prose-slate prose-xl max-w-none text-slate-600 leading-[1.8]
                                        prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tighter
                                        prose-p:mb-10 prose-p:text-lg prose-p:font-medium
                                        prose-strong:text-slate-900 prose-strong:font-black
                                        prose-img:rounded-[3rem] prose-img:shadow-2xl prose-a:text-primary prose-a:font-black
                                        prose-blockquote:border-l-0 prose-blockquote:bg-slate-50 prose-blockquote:px-12 prose-blockquote:py-10 prose-blockquote:rounded-[3rem] prose-blockquote:not-italic prose-blockquote:font-black prose-blockquote:text-slate-900 prose-blockquote:relative
                                        prose-ul:list-disc prose-li:marker:text-primary prose-li:text-lg prose-li:font-medium"
                                    dangerouslySetInnerHTML={{ __html: announcement.content || announcement.description || "" }}
                                />
                            </div>

                            {/* Footer Authentication */}
                            <div className="p-10 sm:p-20 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                                    <div className="flex items-center gap-6">
                                        <div className="size-20 rounded-[2rem] bg-white flex items-center justify-center text-primary shadow-xl border border-slate-100">
                                            <LucideCheckCircle2 size={32} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black text-slate-900 tracking-tight">Verified Publication</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Corporate Registry Seal</p>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-right space-y-2">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Digital Timestamp</p>
                                        <p className="text-sm font-bold text-slate-900">{formatDate(announcement.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    {/* Side Info Panel */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-32">
                        {/* Documents Section */}
                        {announcement.attachments && announcement.attachments.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-floating relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 -mr-24 -mt-24 size-80 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors duration-1000" />

                                <div className="relative z-10 space-y-10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/5 shadow-inner">
                                                <LucideFileText size={20} />
                                            </div>
                                            <h3 className="text-lg font-black uppercase tracking-[0.2em]">Documents</h3>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {announcement.attachments.map((a, i) => (
                                            <a
                                                key={i}
                                                href={a.path ?? "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 hover:bg-white text-white hover:text-slate-900 group transition-all duration-500 border border-white/5 hover:border-white shadow-2xl"
                                            >
                                                <div className="size-14 rounded-[1.2rem] bg-white/10 flex items-center justify-center text-white group-hover:text-primary transition-all duration-500 shadow-xl border border-white/10 group-hover:bg-white">
                                                    <LucideDownload size={24} className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-black truncate uppercase tracking-tight">{a.file_name || "Official File"}</p>
                                                    <p className="text-[9px] font-bold opacity-40 group-hover:opacity-100 uppercase tracking-widest mt-1.5 transition-opacity">Authorized PDF</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-emerald-50/50 rounded-[4rem] p-12 border border-emerald-100 flex flex-col items-center text-center gap-8"
                            >
                                <div className="size-20 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-xl border border-emerald-50">
                                    <LucideShieldCheck size={40} />
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-tight">Verified Archive</h4>
                                    <p className="text-[11px] font-bold text-emerald-600/70 leading-relaxed uppercase tracking-widest">
                                        This announcement is digitally signed and authenticated by Fincha Central Registry.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {announcement.external_link && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a
                                    href={announcement.external_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-4 w-full p-8 bg-white text-slate-900 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 shadow-floating group/link border border-slate-100"
                                >
                                    Access Source Node
                                    <LucideExternalLink size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            </motion.div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}
