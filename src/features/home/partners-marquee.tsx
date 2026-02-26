"use client";

import { motion, useReducedMotion } from "framer-motion";

type PartnersMarqueeProps = {
  eyebrow: string;
  title: string;
  description: string;
};

const defaultPartners = [
  "Ethiopian Investment Holdings",
  "African Development Bank",
  "Ministry of Agriculture",
  "Ethiopian Sugar Corporation",
  "Ethio Telecom",
  "Commercial Bank of Ethiopia",
];

export function PartnersMarquee({ eyebrow, title, description }: PartnersMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const partners = defaultPartners;
  const repeated = [...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/50 via-transparent to-surface/50" />

      <div className="relative mx-auto flex w-full max-w-layout flex-col gap-12 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-primary"
            >
              {eyebrow}
            </motion.p>
            <motion.h2
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              {title}
            </motion.h2>
          </div>
          <p className="max-w-xl text-sm text-muted md:text-base leading-relaxed">{description}</p>
        </div>

        {/* Marquee row 1 */}
        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
          <motion.div
            className="flex items-center gap-6"
            animate={prefersReducedMotion ? undefined : { x: [0, -60 * partners.length] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {repeated.map((partner, index) => (
              <span
                key={`${partner}-${index}`}
                className="group inline-flex shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-card hover:text-primary"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary-200/20 text-xs font-bold text-primary transition-all group-hover:from-primary group-hover:to-primary-400 group-hover:text-white">
                  {partner.charAt(0)}
                </span>
                {partner}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Marquee row 2 (reverse direction) */}
        <div className="relative -mt-4 overflow-hidden py-4">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
          <motion.div
            className="flex items-center gap-6"
            animate={prefersReducedMotion ? undefined : { x: [-60 * partners.length, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
          >
            {[...repeated].reverse().map((partner, index) => (
              <span
                key={`rev-${partner}-${index}`}
                className="group inline-flex shrink-0 items-center gap-3 rounded-2xl border border-slate-100 bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-accent/20 hover:shadow-card hover:text-accent"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/10 to-accent-200/20 text-xs font-bold text-accent transition-all group-hover:from-accent group-hover:to-accent-400 group-hover:text-white">
                  {partner.charAt(0)}
                </span>
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
