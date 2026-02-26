"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  description?: string;
};

type OperationalMetricsProps = {
  eyebrow?: string;
  title: string;
  description: string;
  metrics: Metric[];
  locale: string;
};

function AnimatedCounter({ value, suffix = "", locale }: { value: number; suffix?: string; locale: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const duration = 2000;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, prefersReducedMotion]);

  const formatted =
    count >= 1000
      ? new Intl.NumberFormat(locale, { notation: "compact", compactDisplay: "short" }).format(count)
      : new Intl.NumberFormat(locale).format(count);

  return <span>{formatted}{suffix}</span>;
}

export function OperationalMetrics({ eyebrow, title, description, metrics, locale }: OperationalMetricsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 bg-[#ffffff]">
      {/* Animated subtle shapes for light theme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute -right-20 -top-20 size-[500px] rounded-full bg-primary/5 blur-[120px]"
        />
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute -bottom-40 -left-20 size-[600px] rounded-full bg-accent/10 blur-[150px]"
        />
      </div>

      {/* Subtle Grid Pattern for industrial feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center, black, transparent)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-layout flex-col gap-16 px-8 sm:px-12 lg:px-16 xl:px-20">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="[&_h2]:text-slate-900 [&_p]:text-slate-600"
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-[40px] border border-white bg-white/60 p-10 shadow-sm backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:bg-white hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Highlight bar */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-primary/10 transition-all duration-500 group-hover:bg-primary group-hover:w-2" />

              <div className="relative space-y-6">
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tight text-slate-900">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} locale={locale} />
                  </span>
                </div>
                {metric.description && (
                  <p className="text-sm font-medium leading-relaxed text-slate-500/80">
                    {metric.description}
                  </p>
                )}
                
                {/* Visual indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 flex-1 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "70%" }}
                      transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-primary italic">ON TRACK</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
