"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideCalendar, LucideMap, LucideTrendingUp, LucideUsers } from "lucide-react";

export function AboutStats() {
  const t = useTranslations("about.stats");
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    {
      icon: LucideCalendar,
      value: t("established"),
      label: t("established_label"),
      color: "text-primary",
      bg: "bg-primary/5",
    },
    {
      icon: LucideMap,
      value: t("hectares"),
      label: t("hectares_label"),
      color: "text-accent",
      bg: "bg-accent/5",
    },
    {
      icon: LucideTrendingUp,
      value: t("production"),
      label: t("production_label"),
      color: "text-primary-600",
      bg: "bg-primary-600/5",
    },
    {
      icon: LucideUsers,
      value: t("employees"),
      label: t("employees_label"),
      color: "text-accent-600",
      bg: "bg-accent-600/5",
    },
  ];

  return (
    <div className="relative z-20 -mt-24 max-w-layout mx-auto px-8 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:border-primary/20 transition-all duration-300"
            >
              <div className={`size-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={28} />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
