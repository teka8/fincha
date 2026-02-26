"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideSprout, LucideZap, LucideDroplets } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import type { LocalizedRoute } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import type { ProjectSummary } from "@/types/cms";
import { useProjectsPreview } from "@/features/home/hooks";

const projectIcons = [LucideSprout, LucideZap, LucideDroplets];
const projectAccents = ["from-emerald-500 to-teal-500", "from-amber-500 to-orange-500", "from-primary-400 to-primary"];
const projectBgs = [
  "bg-gradient-to-br from-emerald-50 via-white to-teal-50/50",
  "bg-gradient-to-br from-amber-50 via-white to-orange-50/50",
  "bg-gradient-to-br from-primary-50 via-white to-sky-50/50",
];

export function ProjectsCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("projects.title");
  const description = t("projects.description");
  const ctaLabel = t("projects.cta");
  const { data: projects } = useProjectsPreview();
  let rawItems: unknown;
  try {
    rawItems = t.raw("projects.items");
  } catch {
    rawItems = [];
  }
  const fallbackItems = Array.isArray(rawItems) && rawItems.length > 0
    ? (rawItems as string[]).map((item, index) => ({
        id: `fallback-${index}`,
        title: item,
        slug: undefined,
        summary: undefined,
      }))
    : [
        {
          id: "fallback-1",
          title: "Greenfield sugarcane expansion",
          slug: undefined,
          summary: "Scaling irrigated acreage to secure reliable cane throughput across seasons.",
        },
        {
          id: "fallback-2",
          title: "Bagasse co-generation upgrade",
          slug: undefined,
          summary: "Modern turbines elevating renewable power output for grid and factory resilience.",
        },
        {
          id: "fallback-3",
          title: "Irrigation modernization phase II",
          slug: undefined,
          summary: "Precision water management improving yields while conserving watershed resources.",
        },
      ];

  const items =
    Array.isArray(projects) && projects.length > 0
      ? projects.map((project, index) => {
          const cmsProject = project as ProjectSummary;
          return {
            id: String(cmsProject.id ?? index),
            title: cmsProject.title ?? cmsProject.name ?? fallbackItems[index]?.title ?? "Project",
            slug: cmsProject.slug ?? (cmsProject.id ? String(cmsProject.id) : undefined),
            summary:
              cmsProject.summary ?? cmsProject.description ??
              fallbackItems[index % fallbackItems.length]?.summary,
          };
        })
      : fallbackItems;

  return (
    <SectionContainer className="bg-white">
      <SectionHeading eyebrow={ctaLabel} title={title} description={description} />
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((project, index) => {
          const Icon = projectIcons[index] ?? LucideSprout;
          return (
            <motion.div
              key={project.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30, scale: 0.97 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`hover-lift group relative overflow-hidden rounded-3xl border border-slate-100 ${projectBgs[index]} p-8 shadow-card`}
            >
              {/* Side accent bar */}
              <div className={`absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b ${projectAccents[index]} opacity-60 transition-opacity group-hover:opacity-100`} />

              {/* Number badge */}
              <div className="mb-4 flex items-center gap-4">
                <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${projectAccents[index]} text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <span className="text-5xl font-black text-slate-100 transition-colors group-hover:text-primary/10">
                  0{index + 1}
                </span>
              </div>

              <p className="text-lg font-semibold text-slate-900">{project.title}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {project.summary ?? "Driving transformation through strategic investments in cutting-edge technology and sustainable practices."}
              </p>

              <Link
                href={(project.slug ? `/projects/${project.slug}` : "/projects") as LocalizedRoute}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
              >
                {ctaLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
