"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideArrowRight, LucideMapPin, LucidePhone, LucideMail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { SectionContainer } from "@/components/ui/section-heading";

export function ContactBanner() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Get in Touch</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {t("contact.title")}
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              {t("contact.description")}
            </p>
            <Link
              href="/contact"
              className="group mt-2 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-400 px-8 py-4 text-sm font-bold text-white shadow-glow-sm transition-all hover:shadow-glow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("contact.cta")}
              <LucideArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Contact info cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: LucideMapPin, label: "Fincha Valley, Oromia" },
              { icon: LucidePhone, label: "+251 XX XXX XXXX" },
              { icon: LucideMail, label: "info@finchasugar.com" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-surface px-4 py-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon size={16} className="text-primary" />
                </div>
                <p className="text-sm text-slate-700">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
