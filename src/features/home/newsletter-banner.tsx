"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideMail, LucideBell } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionContainer } from "@/components/ui/section-heading";

export function NewsletterBanner() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

  return (
    <SectionContainer className="bg-transparent">
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 shadow-2xl md:p-12 xl:p-16"
      >
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 size-60 rounded-full bg-accent/20 blur-[80px]" />
          <div className="absolute -left-20 bottom-0 size-40 rounded-full bg-primary-400/20 blur-[60px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <LucideBell size={24} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Stay Updated
              </p>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("newsletter.title")}
            </h2>
            <p className="text-base leading-relaxed text-primary-100/70">
              {t("newsletter.description")}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <LucideMail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-4 pl-11 pr-5 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:border-accent/40 focus:bg-white/15 focus:ring-2 focus:ring-accent/20 backdrop-blur"
              />
            </div>
            <button
              type="button"
              className="group rounded-2xl bg-gradient-to-r from-accent to-accent-400 px-8 py-4 text-sm font-bold text-primary-900 shadow-glow-accent transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("newsletter.cta")}
            </button>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
