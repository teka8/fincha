"use client";

import { useState, useMemo, useEffect } from "react";
import { LucideCalendar, LucideList, LucideArrowLeft, LucideArrowRight, LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { useEventsList } from "@/hooks/use-events-list";
import { EventCard } from "./event-card";
import type { Event } from "@/types/cms";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

function startOfWeek(d: Date) {
    const c = new Date(d);
    c.setDate(c.getDate() - c.getDay());
    c.setHours(0, 0, 0, 0);
    return c;
}

function endOfWeek(d: Date) {
    const c = startOfWeek(d);
    c.setDate(c.getDate() + 6);
    c.setHours(23, 59, 59, 999);
    return c;
}

function startOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function getCalendarDays(month: Date): Date[] {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    const days: Date[] = [];
    const cur = new Date(start);
    while (cur <= end) {
        days.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
    }
    return days;
}

function formatMonthYear(d: Date) {
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatFullDate(d: Date) {
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
    return <div className={`animate-pulse rounded-2xl bg-slate-100 ${className ?? ""}`} />;
}

// ─── Main component ────────────────────────────────────────────────────────────

export function EventListView() {
    const [page, setPage] = useState(1);
    const [view, setView] = useState<"calendar" | "list">("calendar");
    const [calMonth, setCalMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: result, isLoading, isError, refetch } = useEventsList(page);
    const events = result?.data ?? [];
    const meta = result?.meta;

    // Reset page on view change
    // (handled in setView handlers below)

    // Map events by date key
    const byDate = useMemo(() => {
        const map: Record<string, Event[]> = {};
        events.forEach((e) => {
            const raw = e.event_date ?? e.start_date;
            if (!raw) return;
            const key = new Date(raw).toISOString().slice(0, 10);
            if (!map[key]) map[key] = [];
            map[key].push(e);
        });
        return map;
    }, [events]);

    const calDays = useMemo(() => getCalendarDays(calMonth), [calMonth]);
    const selectedKey = selectedDate.toISOString().slice(0, 10);
    const selectedDayEvents = byDate[selectedKey] ?? [];

    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => { if (meta && page < meta.last_page) setPage(page + 1); };

    // ── Loading ──────────────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, i) => (
                        <Skeleton key={i} className="h-24 sm:h-32 w-full rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    // ── Error ────────────────────────────────────────────────────────────────────
    if (isError) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-bold text-lg mb-6">Failed to load events.</p>
                <button
                    onClick={() => void refetch()}
                    className="px-8 py-3 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary/90 transition-all shadow-xl uppercase tracking-widest text-xs"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* ── View toggle + month nav ─────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Toggle */}
                <div className="inline-flex p-1 bg-slate-100 rounded-2xl">
                    <button
                        onClick={() => { setView("calendar"); setPage(1); }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${view === "calendar"
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <LucideCalendar size={15} />
                        Calendar
                    </button>
                    <button
                        onClick={() => { setView("list"); setPage(1); }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${view === "list"
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <LucideList size={15} />
                        List
                    </button>
                </div>

                {/* Month navigator — only in calendar view */}
                {view === "calendar" && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                            className="p-2 rounded-xl bg-white border border-slate-100 hover:bg-slate-50 transition shadow-sm"
                            aria-label="Previous month"
                        >
                            <LucideChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => setCalMonth(new Date())}
                            className="px-4 py-2 rounded-xl bg-white border border-slate-100 font-bold text-sm hover:bg-slate-50 transition shadow-sm"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                            className="p-2 rounded-xl bg-white border border-slate-100 hover:bg-slate-50 transition shadow-sm"
                            aria-label="Next month"
                        >
                            <LucideChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* ── LIST VIEW ───────────────────────────────────────────────────── */}
            {view === "list" && (
                <div className="space-y-12">
                    {events.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <LucideCalendar size={48} className="mx-auto mb-4 opacity-30" strokeWidth={1} />
                            <p className="font-medium">No events found.</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((e) => <EventCard key={e.id} item={e} />)}
                        </div>
                    )}

                    {/* Pagination */}
                    {meta && meta.last_page > 1 && (
                        <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-100">
                            <button onClick={handlePrev} disabled={page === 1}
                                className="p-3 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition shadow-sm group"
                                aria-label="Previous page">
                                <LucideArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                            <span className="text-sm font-black text-primary bg-primary/10 px-4 py-2 rounded-xl">
                                Page {page} of {meta.last_page}
                            </span>
                            <button onClick={handleNext} disabled={page >= meta.last_page}
                                className="p-3 rounded-2xl bg-white border border-slate-100 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition shadow-sm group"
                                aria-label="Next page">
                                <LucideArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ── CALENDAR VIEW ───────────────────────────────────────────────── */}
            {view === "calendar" && (
                <div className="space-y-6">
                    {/* Calendar grid */}
                    <div className="bg-white p-4 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100">
                        {/* Month label */}
                        <div className="flex items-center justify-center mb-8">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                                {formatMonthYear(calMonth)}
                            </h3>
                        </div>

                        {/* Day-of-week headers */}
                        <div className="grid grid-cols-7 mb-4 pb-4 border-b border-slate-100">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
                                <div key={w} className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                                    {w}
                                </div>
                            ))}
                        </div>

                        {/* Day cells */}
                        <div className="overflow-x-auto pb-2">
                            <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[320px]">
                                {calDays.map((d) => {
                                    const inMonth = d.getMonth() === calMonth.getMonth();
                                    const isToday = isSameDay(d, new Date());
                                    const isSelected = isSameDay(d, selectedDate);
                                    const key = d.toISOString().slice(0, 10);
                                    const dayEvents = byDate[key] ?? [];

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setSelectedDate(new Date(d))}
                                            className={`min-h-[56px] sm:min-h-[120px] rounded-xl sm:rounded-2xl border p-1 sm:p-2 text-left transition-all ${inMonth
                                                    ? "bg-white border-slate-100 hover:border-primary/40"
                                                    : "bg-slate-50/60 border-transparent text-slate-300"
                                                } ${isToday ? "ring-2 ring-primary ring-inset" : ""} ${isSelected ? "border-primary bg-primary/5" : ""
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className={`text-xs sm:text-sm font-bold ${inMonth ? "text-slate-900" : "text-slate-300"}`}>
                                                    {d.getDate()}
                                                </span>
                                                {dayEvents.length > 0 && (
                                                    <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 text-primary text-[8px] sm:text-[10px] font-black">
                                                        {dayEvents.length}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Desktop: event pill titles */}
                                            <div className="hidden sm:block space-y-1">
                                                {dayEvents.slice(0, 2).map((ev) => (
                                                    <div key={ev.id}
                                                        className="text-[10px] font-bold truncate rounded-lg px-2 py-1 bg-primary/5 text-primary">
                                                        {ev.title}
                                                    </div>
                                                ))}
                                                {dayEvents.length > 2 && (
                                                    <div className="text-[10px] font-bold text-slate-400 text-center">
                                                        +{dayEvents.length - 2} more
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mobile: event dots */}
                                            <div className="flex sm:hidden justify-center gap-0.5 mt-auto pt-1">
                                                {dayEvents.slice(0, 3).map((_, i) => (
                                                    <div key={i} className="w-1 h-1 rounded-full bg-primary" />
                                                ))}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Selected day events panel */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-black text-slate-900">
                                Events on {formatFullDate(selectedDate)}
                            </h3>
                            {selectedDayEvents.length > 0 && (
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                                    {selectedDayEvents.length} {selectedDayEvents.length === 1 ? "Event" : "Events"}
                                </span>
                            )}
                        </div>

                        {selectedDayEvents.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {selectedDayEvents.map((ev) => (
                                    <EventCard key={ev.id} item={ev} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-slate-400">
                                <LucideCalendar size={36} className="mx-auto mb-3 opacity-30" strokeWidth={1} />
                                <p className="text-sm font-medium">No events scheduled for this day.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
