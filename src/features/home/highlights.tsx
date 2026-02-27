"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideFactory, LucideHeartHandshake, LucideLeaf } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

const icons = [LucideFactory, LucideHeartHandshake, LucideLeaf];
const gradients = [
  "from-primary/10 to-primary-400/5",
  "from-accent/10 to-accent-300/5",
  "from-primary-300/10 to-primary-500/5",
];
const iconBgs = [
  "from-primary to-primary-400",
  "from-accent to-accent-400",
  "from-primary-300 to-primary-500",
];

type HighlightsProps = {
  title: string;
  description: string;
  items: string[];
};

export function Highlights({ title, description, items }: HighlightsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer className="bg-transparent">
      <SectionHeading title={title} description={description} align="center" />
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={item}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="hover-lift group relative overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              {/* Shimmer edge */}
              <div className="absolute -right-12 -top-12 size-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2" />

              <div className="relative">
                <div className={`flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${iconBgs[index]} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <p className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                  {item}
                </p>
                <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary/40 to-accent/40 transition-all duration-500 group-hover:w-20" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
