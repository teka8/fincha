"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideGlobe2, LucideMapPin, LucideShip, LucideTruck } from "lucide-react";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

export function DistributionMap() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.distribution");

  const markers = [
    { id: 1, x: "55%", y: "45%", label: "Fincha Valley", pulse: true },
    { id: 2, x: "42%", y: "30%", label: "Addis Ababa Hub", pulse: false },
    { id: 3, x: "65%", y: "20%", label: "Djibouti Port", pulse: false },
    { id: 4, x: "35%", y: "60%", label: "Southern Hub", pulse: false },
  ];

  const stats = [
    { icon: LucideTruck, label: "National Distribution", value: "85%" },
    { icon: LucideShip, label: "Regional Export", value: "15%" },
    { icon: LucideMapPin, label: "Active Hubs", value: "12+" },
  ];

  return (
    <SectionContainer className="bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-12">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Icon size={20} />
                  </div>
                  <span className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Abstract Map Visualization */}
        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl p-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, #80EF80 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Connecting Lines */}
          <svg className="absolute inset-0 size-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M55,45 Q48,37 42,30" fill="none" stroke="#80EF80" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M55,45 Q60,32 65,20" fill="none" stroke="#80EF80" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M55,45 Q45,52 35,60" fill="none" stroke="#80EF80" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>

          {/* Markers */}
          {markers.map((marker) => (
            <motion.div
              key={marker.id}
              className="absolute flex flex-col items-center gap-2"
              style={{ left: marker.x, top: marker.y }}
              initial={prefersReducedMotion ? undefined : { scale: 0, opacity: 0 }}
              whileInView={prefersReducedMotion ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: marker.id * 0.1 }}
            >
              <div className="relative flex items-center justify-center">
                {marker.pulse && (
                  <div className="absolute size-full rounded-full bg-primary animate-ping opacity-20" />
                )}
                <div className={`size-4 rounded-full border-2 border-white shadow-glow-sm ${marker.pulse ? 'bg-primary' : 'bg-slate-400'}`} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 whitespace-nowrap bg-slate-900/50 px-2 py-1 rounded backdrop-blur-sm">
                {marker.label}
              </span>
            </motion.div>
          ))}

          <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white/50 text-sm font-medium bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            <LucideGlobe2 size={16} className="text-primary" />
            <span>Logistics Network</span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
