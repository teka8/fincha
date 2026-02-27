"use client";

import {
    LucideArrowLeft, LucideCalendar, LucideClock,
    LucideMapPin, LucideUsers, LucideBanknote, LucideDownload,
    LucideExternalLink, LucideLoader2
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useEventDetail } from "@/hooks/use-events-list";

type Props = { id: string };

function formatDate(dateStr: string | undefined) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
}

export function EventDetailView({ id }: Props) {
    const { data: event, isLoading, isError } = useEventDetail(id);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-40 min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <LucideLoader2 size={40} className="text-primary animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Fetching event…</p>
                </div>
            </div>
        );
    }

    // ── Error / not found
    if (isError || !event) {
        return (
            <div className="flex flex-col items-center justify-center py-40 min-h-[60vh] text-center px-4">
                <div className="bg-white dark:bg-slate-800 p-12 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-700 max-w-md w-full">
                    <LucideCalendar size={48} className="mx-auto mb-6 text-slate-300" strokeWidth={1} />
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Event Not Found</h2>
                    <p className="text-slate-500 mb-8">
                        This event may have passed or the link is no longer valid.
                    </p>
                    <Link
                        href={{ pathname: "/event" }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
                    >
                        <LucideArrowLeft size={16} />
                        Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    const imageUrl = event.event_image ?? event.hero_image;
    const dateStr = event.event_date ?? event.start_date;
    const isFree = !event.cost_amount || parseFloat(event.cost_amount) === 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
            {/* Back link */}
            <div className="mb-10">
                <Link
                    href={{ pathname: "/event" }}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors group"
                >
                    <LucideArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to all events
                </Link>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
                {/* ── Left: Content ──────────────────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Eyebrow + title */}
                    <div>
                        {event.category && (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
                                {event.category}
                            </span>
                        )}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                            {event.title}
                        </h1>
                    </div>

                    {/* Hero image */}
                    {imageUrl && (
                        <div className="relative h-[340px] sm:h-[460px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src={imageUrl}
                                alt={event.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Description card */}
                    <div className="relative bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-[2rem] border-l-8 border-primary shadow-sm overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                        <h2 className="text-primary text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-primary" />
                            About This Event
                        </h2>
                        <div
                            className="relative z-10 prose prose-slate prose-lg max-w-none
                prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed
                prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-extrabold
                prose-ul:list-disc prose-li:marker:text-primary"
                            dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                    </div>
                </div>

                {/* ── Right: Sidebar ────────────────────────────────────────────── */}
                <aside className="space-y-6">
                    {/* Details card */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 sticky top-28">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Event Details</h3>
                        <ul className="space-y-5">

                            {/* Date */}
                            {dateStr && (
                                <li className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                                        <LucideCalendar size={18} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Date</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-200 text-sm">{formatDate(dateStr)}</span>
                                    </div>
                                </li>
                            )}

                            {/* Time */}
                            {(event.start_time || event.end_time) && (
                                <li className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 flex-shrink-0">
                                        <LucideClock size={18} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Time</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-200 text-sm">
                                            {[event.start_time, event.end_time].filter(Boolean).join(" – ")}
                                        </span>
                                    </div>
                                </li>
                            )}

                            {/* Location */}
                            {event.location && (
                                <li className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-red-50 text-red-500 flex-shrink-0">
                                        <LucideMapPin size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Location</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-200 text-sm block">{event.location}</span>
                                        {event.google_map_location_link && (
                                            <a href={event.google_map_location_link} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline mt-1">
                                                View on Map <LucideExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </li>
                            )}

                            {/* Audience */}
                            {event.target_audience && (
                                <li className="flex items-start gap-4">
                                    <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500 flex-shrink-0">
                                        <LucideUsers size={18} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Audience</span>
                                        <span className="font-bold text-slate-900 dark:text-slate-200 text-sm capitalize">{event.target_audience}</span>
                                    </div>
                                </li>
                            )}

                            {/* Cost */}
                            <li className="flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                                    <LucideBanknote size={18} />
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Admission</span>
                                    <span className="font-bold text-slate-900 dark:text-slate-200 text-sm">
                                        {isFree ? "Free" : `${event.cost_amount} ETB`}
                                    </span>
                                </div>
                            </li>
                        </ul>

                        {/* Register CTA */}
                        {event.registration_link && (
                            <a
                                href={event.registration_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full mt-8 px-6 py-4 bg-primary text-white hover:bg-primary/90 font-black rounded-2xl transition-all duration-300 shadow-lg uppercase tracking-widest text-sm"
                            >
                                Register Now
                                <LucideExternalLink size={14} />
                            </a>
                        )}
                    </div>

                    {/* Attachments */}
                    {event.attachments && event.attachments.length > 0 && (
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-5">Attachments</h3>
                            <ul className="space-y-3">
                                {event.attachments.map((a, i) => (
                                    <li key={i}>
                                        <a
                                            href={a.path ?? "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-600 hover:border-primary/30 hover:shadow-sm transition-all group"
                                        >
                                            <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary text-slate-500 transition-colors flex-shrink-0">
                                                <LucideDownload size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 truncate">
                                                {a.file_name ?? "Download"}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
