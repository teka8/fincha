"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LucideArrowRight } from "lucide-react";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

export function WhoWeAre() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.who_we_are");

  return (
    <SectionContainer className="bg-white dark:bg-slate-900 relative overflow-hidden">
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        align="center"
        className="relative z-10"
      />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
        >
          <p>{t("description_1")}</p>
          <p>{t("description_2")}</p>

          <ul className="space-y-4 pt-4 pb-4">
            <li className="flex items-center gap-3 font-medium text-slate-800 dark:text-slate-200">
              <div className="size-2 rounded-full bg-primary flex-shrink-0" />
              {t("bullet_1")}
            </li>
            <li className="flex items-center gap-3 font-medium text-slate-800 dark:text-slate-200">
              <div className="size-2 rounded-full bg-primary flex-shrink-0" />
              {t("bullet_2")}
            </li>
            <li className="flex items-center gap-3 font-medium text-slate-800 dark:text-slate-200">
              <div className="size-2 rounded-full bg-primary flex-shrink-0" />
              {t("bullet_3")}
            </li>
          </ul>

          <Link
            href="/about"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
          >
            {t("cta")}
            <LucideArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden shadow-2xl"
        >
          {/* Main Image Base */}
          <div className="absolute inset-0 bg-primary-900">
            <div className="absolute inset-0 bg-[url('/images/land-o-lakes-inc-PCITNW3g85Q-unsplash.jpg')] bg-cover bg-center mix-blend-overlay opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 via-transparent to-accent/20" />
          </div>

          {/* Decorative floating elements */}
          <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-accent/30 blur-[40px]" />
          <div className="absolute -right-10 -top-10 size-60 rounded-full bg-primary/40 blur-[60px]" />

          {/* Branding Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="size-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4 shadow-[0_0_40px_rgba(0,0,0,0.2)]">
              {/* Simple stylized 'F' or logo representation */}
              <span className="text-4xl font-black text-white mix-blend-overlay">F</span>
            </div>
          </div>
        </motion.div>

      </div>
    </SectionContainer>
  );
}
