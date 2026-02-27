"use client";

import { LucideCalendar, LucideMapPin, LucideClock, LucideArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { Event } from "@/types/cms";

function formatEventDate(dateStr: string | undefined) {
    if (!dateStr) return { day: "--", month: "---" };
    const d = new Date(dateStr);
    return {
        day: d.toLocaleDateString("en-US", { day: "2-digit" }),
        month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    };
}

type EventCardProps = { item: Event };

export function EventCard({ item }: EventCardProps) {
    if (!item) return null;

    const dateStr = item.event_date ?? item.start_date;
    const imageUrl = item.event_image ?? item.hero_image;
    const { day, month } = formatEventDate(dateStr);
    const isConfirmed = item.status === "Confirmed";

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                        <LucideCalendar size={48} className="text-primary/30" strokeWidth={1} />
                    </div>
                )}

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl px-3 py-2 text-center shadow-lg min-w-[48px]">
                    <span className="block text-primary font-black text-xl leading-none">{day}</span>
                    <span className="block text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{month}</span>
                </div>

                {/* Status badge */}
                {item.status && (
                    <div className="absolute top-4 right-4">
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${isConfirmed
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-400 text-amber-900"
                            }`}>
                            {item.status}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                        {item.category ?? "Event"}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                </h3>

                {/* Meta */}
                <div className="space-y-2 mb-5 flex-1">
                    {(item.location) && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <LucideMapPin size={14} className="text-primary flex-shrink-0" />
                            <span className="truncate">{item.location}</span>
                        </div>
                    )}
                    {item.start_time && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                            <LucideClock size={14} className="text-primary flex-shrink-0" />
                            <span>{item.start_time}{item.end_time ? ` – ${item.end_time}` : ""}</span>
                        </div>
                    )}
                </div>

                {/* CTA */}
                <Link
                    href={{ pathname: "/event/[id]", params: { id: String(item.id) } }}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-primary hover:text-white text-slate-900 dark:text-white font-bold rounded-2xl transition-all duration-300 group/btn text-sm"
                >
                    View Details
                    <LucideArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
