"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

export function AboutTimeline() {
  const t = useTranslations("about.timeline");
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer className="bg-white">
      <SectionHeading 
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="center"
      />
      
      <div className="relative mt-20 max-w-4xl mx-auto">
        {/* Horizontal Line (Hidden on mobile) */}
        <div className="hidden md:block absolute top-[27px] left-0 right-0 h-0.5 bg-slate-100 rounded-full" />
        
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left group"
            >
              {/* Node */}
              <div className="size-14 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center z-10 shadow-sm mb-6 transition-transform duration-500 group-hover:scale-110">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="size-2.5 rounded-full bg-primary" />
                </div>
              </div>
              
              <div className="space-y-3">
                <span className="text-3xl font-black text-slate-200 group-hover:text-primary transition-colors tracking-tighter">
                  {t(`items.${index}.year`)}
                </span>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {t(`items.${index}.title`)}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {t(`items.${index}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
