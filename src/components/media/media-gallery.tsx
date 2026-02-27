"use client";

import { useMemo, useState } from "react";
import { LucideGrid, LucideImage, LucideVideo, LucideMusic, LucidePlay, LucideArrowRight, LucideRefreshCw } from "lucide-react";
import { MediaModal, type ModalMediaItem } from "./media-modal";

type MediaItem = ModalMediaItem & {
    thumbnail?: string;
};

type Props = {
    initialItems: MediaItem[];
};

const FILTERS = [
    { key: "all" as const, label: "All", Icon: LucideGrid },
    { key: "image" as const, label: "Photos", Icon: LucideImage },
    { key: "video" as const, label: "Videos", Icon: LucideVideo },
    { key: "audio" as const, label: "Audio", Icon: LucideMusic },
];

const TYPE_STYLE: Record<string, { color: string; badge: string; Icon: typeof LucideImage }> = {
    image: { color: "text-blue-500", badge: "Photo", Icon: LucideImage },
    video: { color: "text-red-500", badge: "Video", Icon: LucideVideo },
    audio: { color: "text-primary", badge: "Audio", Icon: LucideMusic },
};

export function MediaGallery({ initialItems }: Props) {
    const [items, setItems] = useState<MediaItem[]>(initialItems);
    const [filter, setFilter] = useState<"all" | "image" | "video" | "audio">("all");
    const [activeId, setActiveId] = useState<string | number | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const counts = {
        all: items.length,
        image: items.filter((i) => i.type === "image").length,
        video: items.filter((i) => i.type === "video").length,
        audio: items.filter((i) => i.type === "audio").length,
    };

    const filtered = useMemo(
        () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
        [filter, items]
    );

    const activeIndex = filtered.findIndex((i) => i.id === activeId);
    const activeItem = activeIndex >= 0 ? filtered[activeIndex] : null;

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const res = await fetch(`/api/media`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) setItems(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <>
            {/* Stats Header */}
            <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
                    <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-primary">Gallery</p>
                        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl leading-tight">
                            Media <span className="gradient-text">Showcase</span>
                        </h1>
                        <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-primary to-primary/40" />
                        <p className="max-w-xl text-slate-500 leading-relaxed">
                            Browse image, video, and audio assets in a single polished viewer. Click any item to open it in a full-screen modal.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Asset Summary</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Total", value: counts.all, color: "text-slate-900" },
                                { label: "Photos", value: counts.image, color: "text-blue-500" },
                                { label: "Videos", value: counts.video, color: "text-red-500" },
                                { label: "Audio", value: counts.audio, color: "text-primary" },
                            ].map(({ label, value, color }) => (
                                <div key={label} className="rounded-xl border border-white bg-white px-4 py-3 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                                    <p className={`mt-1 text-2xl font-black ${color}`}>{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {FILTERS.map(({ key, label, Icon }) => (
                        <button
                            key={key}
                            onClick={() => { setFilter(key); setActiveId(null); }}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all ${filter === key
                                    ? "border-primary bg-primary text-white shadow-glow-sm"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary"
                                }`}
                        >
                            <Icon size={14} />
                            {label}
                            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${filter === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                                }`}>
                                {counts[key]}
                            </span>
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                        Showing <strong className="text-slate-800">{filtered.length}</strong> of{" "}
                        <strong className="text-slate-800">{items.length}</strong>
                    </span>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-primary/30 hover:text-primary disabled:opacity-50"
                    >
                        <LucideRefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 py-20 text-slate-400">
                    <LucideGrid size={40} className="mb-3 opacity-40" />
                    <p className="font-semibold">No media in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((item, index) => {
                        const meta = TYPE_STYLE[item.type] ?? TYPE_STYLE.image;
                        const TypeIcon = meta.Icon;
                        const preview = item.thumbnail || (item.type === "image" ? item.src : "");
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-xl"
                            >
                                <div className="relative h-60 overflow-hidden bg-slate-100">
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt={item.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                            <TypeIcon size={52} className={`${meta.color} opacity-50`} />
                                        </div>
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                                    {/* Type badge */}
                                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm">
                                        <TypeIcon size={11} className={meta.color} />
                                        {meta.badge}
                                    </span>
                                    {/* Index */}
                                    <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-black/40 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
                                        #{String(index + 1).padStart(2, "0")}
                                    </span>
                                    {/* Play icon for video */}
                                    {item.type === "video" && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white transition-transform group-hover:scale-110">
                                                <LucidePlay size={24} fill="currentColor" />
                                            </div>
                                        </div>
                                    )}
                                    {/* CTA arrow */}
                                    <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-primary text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <LucideArrowRight size={16} />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        {meta.badge} asset
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            <MediaModal
                item={activeItem}
                onClose={() => setActiveId(null)}
                onNext={() => {
                    if (filtered.length && activeIndex >= 0)
                        setActiveId(filtered[(activeIndex + 1) % filtered.length].id);
                }}
                onPrev={() => {
                    if (filtered.length && activeIndex >= 0)
                        setActiveId(filtered[(activeIndex - 1 + filtered.length) % filtered.length].id);
                }}
                hasMultiple={filtered.length > 1}
                activeIndex={activeIndex}
                totalItems={filtered.length}
            />
        </>
    );
}
