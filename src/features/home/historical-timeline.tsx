"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/section-heading";

const milestones = [
  { year: "1998", title: "Factory Established", desc: "Phase I construction completed, launching our visionary sugar production facility." },
  { year: "2007", title: "Ethanol Distillation", desc: "Integrated state-of-the-art distillery to convert molasses into fuel-grade ethanol." },
  { year: "2012", title: "Phase II Expansion", desc: "Doubled crushing capacity and expanded sugarcane plantation footprint." },
  { year: "2015", title: "Co-Generation", desc: "Began exporting green electricity to the national grid using bagasse turbines." },
  { year: "2024", title: "Digital Era", desc: "Implemented smart agricultural monitoring and enterprise-grade traceability operations." },
];

export function HistoricalTimeline() {
  const t = useTranslations("home.timeline");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <div className="bg-white dark:bg-slate-900 py-8 relative" ref={containerRef}>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="mb-8"
      />

      <div className="max-w-5xl mx-auto px-8 relative">
        {/* Vertical Line */}
        <div className="absolute left-[28px] md:left-1/2 inset-y-0 w-0.5 bg-slate-100 dark:bg-slate-800 rounded-full z-0" />

        {/* Animated Line Progress */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-[28px] md:left-1/2 inset-y-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary origin-top z-0"
            style={{ scaleY: pathLength }}
          />
        )}

        <div className="space-y-6 md:-space-y-4">
          {milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className={`relative flex items-center md:justify-between flex-col md:flex-row gap-6 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 size-14 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-sm">
                  <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="size-2.5 rounded-full bg-primary shadow-glow-sm" />
                  </div>
                </div>

                {/* Content Panel */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? 'md:pr-10 text-left md:text-right' : 'md:pl-10 text-left'}`}>
                  <div className="p-4 md:p-6 rounded-2xl md:rounded-[24px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-primary/20 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 group">
                    <div className={`flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                      <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary transition-colors tracking-tighter shrink-0">
                        {milestone.year}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
