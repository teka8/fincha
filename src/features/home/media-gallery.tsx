"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LucidePlay, LucideCamera } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { useMediaGallery } from "@/features/media/hooks";
import type { MediaItem } from "@/types/cms";

export function MediaGallery() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

  const title = t("media.title");
  const description = t("media.description");

  const { data: mediaItems } = useMediaGallery(5);

  // Fallback data
  const fallbackItems: MediaItem[] = [
    {
      id: 1,
      title: "Cane harvest at dawn",
      type: "image",
      url: "/images/1.jpg",
    },
    {
      id: 2,
      title: "Ethanol distillation control room",
      type: "image",
      url: "/images/2.jpg",
    },
    {
      id: 3,
      title: "Community health outreach",
      type: "image",
      url: "/images/3.jpg",
    },
    {
      id: 4,
      title: "Bagasse power turbines",
      type: "video",
      url: "/images/4.jpg",
      thumbnail: "/images/4.jpg",
    },
    {
      id: 5,
      title: "Factory expansion progress",
      type: "image",
      url: "/images/5.jpg",
    },
  ];

  const items: MediaItem[] =
    Array.isArray(mediaItems) && mediaItems.length > 0
      ? mediaItems.slice(0, 5)
      : fallbackItems;

  return (
    <SectionContainer className="bg-transparent">
      <SectionHeading eyebrow="Gallery" title={title} description={description} />

      {/* Fixed Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px]">
        {items.map((item, index) => {
          const isLarge = index === 0;
          const isVideo = item.type === "video";
          const hasThumbnail = !!(item.thumbnail || item.thumb_url);
          const imageUrl = hasThumbnail ? (item.thumbnail || item.thumb_url) : (!isVideo ? item.url : null);

          return (
            <motion.a
              key={item.id ?? index}
              href="/media"
              initial={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 0, scale: 0.95 }
              }
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl shadow-card ${
                isLarge ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              {/* Image Container */}
              <div className="relative h-full w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500">
                    <LucideCamera
                      size={isLarge ? 40 : 28}
                      className="text-white"
                    />
                  </div>
                )}
              </div>

              {/* Video Play Overlay */}
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/50 p-4 backdrop-blur-sm">
                    <LucidePlay
                      size={isLarge ? 40 : 28}
                      className="text-white fill-white"
                    />
                  </div>
                </div>
              )}

              {/* Dark Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-base font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  {isVideo ? "Video" : "Gallery"}
                </p>
              </div>

              {/* Top Badge */}
              <div className="absolute right-3 top-3 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {isVideo ? "Video" : "Gallery"}
              </div>
            </motion.a>
          );
        })}
      </div>
    </SectionContainer>
  );
}
