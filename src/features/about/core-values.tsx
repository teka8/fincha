"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { LucideShieldCheck, LucideLeaf, LucideAward, LucideHeart } from "lucide-react";

export function CoreValues() {
  const t = useTranslations("about.values");
  const prefersReducedMotion = useReducedMotion();

  const icons = [LucideShieldCheck, LucideLeaf, LucideAward, LucideHeart];

  return (
    <SectionContainer className="bg-white">
      <SectionHeading 
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="center"
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        {[0, 1, 2, 3].map((index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={index}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <Icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t(`items.${index}.title`)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t(`items.${index}.description`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
