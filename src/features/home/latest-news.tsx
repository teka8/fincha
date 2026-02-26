

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideCalendar, LucideArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LocalizedRoute } from "@/i18n/routing";
import type { NewsPreview } from "@/features/home/hooks";
import { useLatestNews } from "@/features/home/hooks";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/routing";


export function LatestNews() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("news.title");
  const description = t("news.description");
  const ctaLabel = t("news.cta");
  const { data: latestNews, isLoading } = useLatestNews();

  const items = Array.isArray(latestNews) ? latestNews : [];

  if (!isLoading && items.length === 0) return null;

  return (
    <SectionContainer className="bg-transparent">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-12">
        <SectionHeading eyebrow={ctaLabel} title={title} description={description} />
        <Link
          href={"/news" as LocalizedRoute}
          className="group inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-8 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          {t("actions.view_all", { default: "View all news" })}
          <LucideArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm animate-pulse">
              <div className="aspect-[16/11] bg-slate-50" />
              <div className="p-8 space-y-4">
                <div className="h-3 w-24 bg-slate-50 rounded-full" />
                <div className="h-6 w-full bg-slate-50 rounded-xl" />
                <div className="h-6 w-5/6 bg-slate-50 rounded-xl" />
                <div className="pt-4 h-4 w-1/2 bg-slate-50 rounded-lg" />
              </div>
            </div>
          ))
          : items.map((article, index) => {
            const imageUrl = article.featured_image ?? article.image;

            const safeId = (() => {
              const potential = article.id || article.slug || article.title || index;
              const str = String(potential ?? "");
              if (str && !str.includes("[object")) return str;
              return String(index);
            })();

            return (
              <motion.article
                key={article.id ?? index}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Link href={{ pathname: "/news/[id]", params: { id: safeId } } as any} className="block">
                  {/* Image Wrap */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-50">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center p-8 text-slate-200">
                        <LucideCalendar size={80} strokeWidth={0.5} />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-5 left-5">
                      <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                        {article.category?.name ?? "Update"}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Industry Insight</span>
                      <div className="h-px flex-1 bg-slate-50" />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-primary leading-snug line-clamp-2 min-h-[3.5rem]">
                      {article.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-slate-500 line-clamp-2 font-medium">
                      {article.excerpt ?? article.summary ?? "Discover the strategic progress and milestones at Fincha Sugar Factory."}
                    </p>

                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {article.created_at ? new Date(article.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:ml-4">
                        <LucideArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
      </div>
    </SectionContainer>
  );
}
