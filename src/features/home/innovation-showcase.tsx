"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideLightbulb, LucideArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

type InnovationShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  pillLabel: string;
  learnMoreLabel: string;
  items: {
    title: string;
    description: string;
    link: string;
  }[];
};

const cardGradients = [
  "from-primary/5 via-transparent to-primary-100/10",
  "from-accent/5 via-transparent to-accent-100/10",
  "from-primary-50/50 via-transparent to-primary-50/30",
];

const iconColors = [
  "from-primary to-primary-400",
  "from-accent to-accent-400",
  "from-primary-400 to-primary-600",
];

export function InnovationShowcase({ eyebrow, title, description, pillLabel, learnMoreLabel, items }: InnovationShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-60 rounded-full bg-accent/5 blur-[80px]" />

      <div className="relative mx-auto flex w-full max-w-layout flex-col gap-14 px-8 sm:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-400 text-white shadow-glow-accent">
              <LucideLightbulb size={18} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{pillLabel}</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((innovation, index) => (
            <motion.article
              key={innovation.title}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="hover-lift group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-card"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cardGradients[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${iconColors[index]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

              <div className="relative space-y-5">
                {/* Number + icon */}
                <div className="flex items-center justify-between">
                  <div className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${iconColors[index]} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <LucideLightbulb size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-5xl font-black text-slate-100/80 transition-colors group-hover:text-primary/10">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 transition-colors group-hover:text-primary">
                  {innovation.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{innovation.description}</p>
              </div>

              <div className="relative mt-auto">
                <Button variant="ghost" className="group/btn gap-2 text-primary" asChild>
                  <Link href={innovation.link}>
                    {learnMoreLabel}
                    <LucideArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
