"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideCalendar, LucideArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LocalizedRoute } from "@/i18n/routing";
import type { NewsPreview } from "@/features/home/hooks";
import { useLatestNews } from "@/features/home/hooks";
import { useLocaleContext } from "@/providers/providers";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/routing";

const newsColors = [
  "from-primary/5 to-primary-100/20",
  "from-accent/5 to-accent-100/20",
  "from-primary-50 to-primary-100/30",
];

export function LatestNews() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("news.title");
  const description = t("news.description");
  const ctaLabel = t("news.cta");
  const { data: latestNews } = useLatestNews();
  const { locale } = useLocaleContext();
  const fallbackItems: Array<NewsPreview & { summary?: string; link?: string; id?: number }> = [
    {
      title: "Fincha scales ethanol production to support clean fuels",
      summary: "New distillation upgrades improve efficiency and reduce emissions across the campus.",
      link: "/news",
      slug: "fincha-ethanol-upgrade",
      id: 1,
      excerpt: "New distillation upgrades improve efficiency and reduce emissions across the campus.",
      created_at: "2026-02-01",
    },
    {
      title: "Community outgrower program expands irrigated hectares",
      summary: "Smallholder farmers gain access to agronomy training and guaranteed offtake agreements.",
      link: "/news",
      slug: "community-outgrower-expansion",
      id: 2,
      excerpt: "Smallholder farmers gain access to agronomy training and guaranteed offtake agreements.",
      created_at: "2026-01-18",
    },
    {
      title: "Fincha inaugurates vocational training center",
      summary: "Technical apprenticeships prepare youth for skilled roles in agro-industrial operations.",
      link: "/news",
      slug: "vocational-training-center",
      id: 3,
      excerpt: "Technical apprenticeships prepare youth for skilled roles in agro-industrial operations.",
      created_at: "2026-01-05",
    },
  ];
  const items: Array<NewsPreview & { summary?: string; link?: string; id?: number }> =
    Array.isArray(latestNews) && latestNews.length > 0 ? latestNews : fallbackItems;

  return (
    <SectionContainer className="bg-transparent">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading eyebrow={ctaLabel} title={title} description={description} />
        <Link href={"/news" as LocalizedRoute} className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white">
          {t("actions.view_all", { default: "View all news" })}
          <LucideArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((article, index) => (
          <motion.article
            key={article.slug ?? article.title}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="hover-lift group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card"
          >
            {/* Image placeholder */}
            <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${newsColors[index]}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-xl bg-white/80 p-3 backdrop-blur">
                  <LucideCalendar size={24} className="text-primary" />
                </div>
              </div>
              {/* Date badge */}
              <div className="absolute left-4 top-4 rounded-xl bg-white/90 px-3 py-1.5 text-[11px] font-bold text-primary shadow-sm backdrop-blur">
                {"created_at" in article && article.created_at
                  ? new Date(article.created_at).toLocaleDateString()
                  : ""}
              </div>
              {/* Category */}
              <div className="absolute right-4 top-4 rounded-full bg-primary/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                News
              </div>
            </div>

            <div className="p-6">
              <p className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary line-clamp-2">
                {article.title}
              </p>
              {"excerpt" in article && article.excerpt ? (
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">{article.excerpt}</p>
              ) : article.summary ? (
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">{article.summary}</p>
              ) : null}
              <Link
                href={(article.id ? `/news/${String(article.id)}` : "/news") as LocalizedRoute}
                locale={locale as "en" | "am"}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
              >
                {ctaLabel}
                <LucideArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionContainer>
  );
}
