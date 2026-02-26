"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideAward, LucideShieldCheck, LucideLeaf } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";

export function CertificationsBanner() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.certifications");

  const certs = [
    { icon: LucideAward, title: t("iso_quality"), desc: t("iso_quality_desc") },
    { icon: LucideLeaf, title: t("environmental"), desc: t("environmental_desc") },
    { icon: LucideShieldCheck, title: t("safety"), desc: t("safety_desc") },
  ];

  return (
    <SectionContainer className="relative overflow-hidden bg-transparent">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -left-40 top-0 size-80 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-60 rounded-full bg-accent/5 blur-[80px]" />

      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[32px] border border-primary/10 bg-white p-8 shadow-card xl:p-12"
      >
        {/* Accent strip */}
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Quality Standards</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("title")}
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {certs.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-surface px-4 py-3"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{cert.title}</p>
                    <p className="text-xs text-slate-500">{cert.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
