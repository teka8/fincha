"use client";

import { useEffect } from "react";
import { LucideX, LucideChevronLeft, LucideChevronRight, LucideImage, LucideVideo, LucideMusic } from "lucide-react";
import Image from "next/image";

export type ModalMediaItem = {
    id: string | number;
    type: "image" | "video" | "audio";
    title: string;
    src: string;
    thumbnail?: string;
};

type MediaModalProps = {
    item: ModalMediaItem | null;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasMultiple: boolean;
    activeIndex: number;
    totalItems: number;
};

export function MediaModal({ item, onClose, onNext, onPrev, hasMultiple, activeIndex, totalItems }: MediaModalProps) {
    useEffect(() => {
        if (!item) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && hasMultiple) onNext();
            if (e.key === "ArrowLeft" && hasMultiple) onPrev();
        };
        document.addEventListener("keydown", onKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prev;
        };
    }, [item, onClose, onNext, onPrev, hasMultiple]);

    if (!item) return null;

    return (
        <div
            className="fixed inset-0 z-[120] bg-black/90 p-4 backdrop-blur-md sm:p-6 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                    aria-label="Close"
                >
                    <LucideX size={20} />
                </button>

                {/* Prev / Next */}
                {hasMultiple && (
                    <>
                        <button
                            onClick={onPrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
                            aria-label="Previous"
                        >
                            <LucideChevronLeft size={22} />
                        </button>
                        <button
                            onClick={onNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-primary"
                            aria-label="Next"
                        >
                            <LucideChevronRight size={22} />
                        </button>
                    </>
                )}

                <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                                {item.type} viewer
                            </p>
                            <h3 className="mt-0.5 text-base font-bold text-white">{item.title}</h3>
                        </div>
                        {totalItems > 0 && (
                            <div className="text-right">
                                <p className="text-xs text-slate-400">{activeIndex + 1} / {totalItems}</p>
                                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-slate-600">Esc to close</p>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex min-h-[300px] items-center justify-center bg-black sm:min-h-[520px]">
                        {item.type === "image" && (
                            <img
                                src={item.src}
                                alt={item.title}
                                className="max-h-[76vh] w-full object-contain"
                            />
                        )}
                        {item.type === "video" && (
                            <video
                                src={item.src}
                                controls
                                autoPlay
                                playsInline
                                poster={item.thumbnail}
                                className="max-h-[76vh] w-full"
                            />
                        )}
                        {item.type === "audio" && (
                            <div className="w-full space-y-6 px-6 py-10 text-center">
                                {item.thumbnail && (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="mx-auto h-48 w-48 rounded-2xl border border-white/10 object-cover shadow-xl"
                                    />
                                )}
                                {!item.thumbnail && (
                                    <LucideMusic size={64} className="mx-auto text-primary opacity-40 mb-4" />
                                )}
                                <audio src={item.src} controls autoPlay className="mx-auto w-full max-w-xl" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
