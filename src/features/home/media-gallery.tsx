"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucidePlay, LucideCamera, LucideImage } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { useMediaGallery } from "@/features/media/hooks";
import type { MediaItem } from "@/types/cms";

const mediaIcons = [LucideCamera, LucidePlay, LucideImage, LucideCamera];
const mediaGradients = [
  "from-primary-700 via-primary-600 to-primary-500",
  "from-accent-600 via-accent-500 to-amber-400",
  "from-primary-600 via-primary-500 to-primary-400",
  "from-accent-700 via-accent-600 to-accent-500",
];

export function MediaGallery() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("media.title");
  const description = t("media.description");
  const caption = t("media.caption", { default: t("media.description") });
  const { data: mediaItems } = useMediaGallery();
  const fallbackItems = [
    { label: "Cane harvest at dawn", meta: "Fincha Valley" },
    { label: "Ethanol distillation control room", meta: "Process Innovation" },
    { label: "Community health outreach", meta: "CSR Spotlight" },
    { label: "Bagasse power turbines", meta: "Renewable Energy" },
  ];
  const items =
    Array.isArray(mediaItems) && mediaItems.length > 0
      ? mediaItems.map((item: MediaItem) => ({
          label: item.title,
          meta: item.type === "video" ? "Video" : "Gallery",
        }))
      : fallbackItems;

  return (
    <SectionContainer className="bg-transparent">
      <SectionHeading eyebrow="Gallery" title={title} description={description} />
      {/* Masonry-like grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = mediaIcons[index] ?? LucideCamera;
          const isLarge = index === 0;

          return (
            <motion.div
              key={item.label}
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl shadow-card ${
                isLarge ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              {/* Gradient background as image placeholder */}
              <div className={`aspect-square bg-gradient-to-br ${mediaGradients[index]} transition-transform duration-700 group-hover:scale-110`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                    <Icon size={isLarge ? 40 : 28} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content at bottom */}
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-base font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs text-white/70">{item.meta ?? caption}</p>
              </div>

              {/* Category badge */}
              <div className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {item.meta ?? "Gallery"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
