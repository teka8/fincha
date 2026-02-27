"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideHeart, LucideTrendingUp } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

type CSRSpotlightProps = {
  title: string;
  description: string;
  focusTitle: string;
  focusDescription: string;
  impactTitle: string;
  impactDescription: string;
};

export function CSRSpotlight({
  title,
  description,
  focusTitle,
  focusDescription,
  impactTitle,
  impactDescription,
}: CSRSpotlightProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer className="relative overflow-hidden bg-transparent">
      {/* Background decorations */}
      <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-accent/5 blur-[80px]" />

      <SectionHeading eyebrow="CSR" title={title} description={description} />
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="hover-lift group relative overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/20 bg-white dark:bg-slate-800 p-8 shadow-card"
        >
          {/* Gradient accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary via-primary-400 to-accent" />

          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-400 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <LucideHeart size={26} strokeWidth={1.5} />
            </div>
            <p className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{focusTitle}</p>
            <p className="mt-3 text-base leading-relaxed text-muted dark:text-slate-400">{focusDescription}</p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-primary to-primary-300 text-[10px] font-bold text-white">
                    {["👨‍🌾", "👩‍⚕️", "👨‍🏫"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted">10,000+ lives impacted</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hover-lift group relative overflow-hidden rounded-3xl border border-accent/10 dark:border-accent/20 bg-white dark:bg-slate-800 p-8 shadow-card"
        >
          {/* Gradient accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent-400 to-primary" />

          <div className="relative">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-400 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <LucideTrendingUp size={26} strokeWidth={1.5} />
            </div>
            <p className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">{impactTitle}</p>
            <p className="mt-3 text-base leading-relaxed text-muted dark:text-slate-400">{impactDescription}</p>
            {/* Progress bar */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-muted">
                <span>Community Impact</span>
                <span className="font-semibold text-accent">85%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
