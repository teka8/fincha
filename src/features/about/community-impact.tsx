"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { LucideCheckCircle2 } from "lucide-react";

export function CommunityImpact() {
  const t = useTranslations("about.impact");
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer className="bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        {/* Visual / Masonry Grid Placeholder */}
        <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
          <motion.div 
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-[32px] bg-primary/20 bg-[url('/images/land-o-lakes-inc-PCITNW3g85Q-unsplash.jpg')] bg-cover bg-center"
          />
          <motion.div 
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aspect-[4/5] rounded-[32px] bg-accent/20 flex items-center justify-center p-8 text-center"
          >
             <p className="text-accent font-black text-xl leading-tight">Empowering 10,000+ Families</p>
          </motion.div>
          <motion.div 
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="aspect-[5/4] rounded-[32px] bg-primary/30 flex items-center justify-center p-8 text-center col-span-2"
          >
             <p className="text-white font-black text-2xl uppercase tracking-widest">Fincha Valley Community</p>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-1 lg:order-2 space-y-8"
        >
          <SectionHeading 
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            align="left"
          />
          
          <ul className="space-y-6">
            {[0, 1, 2, 3].map((index) => (
              <li key={index} className="flex gap-4 group">
                <div className="flex-shrink-0 size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <LucideCheckCircle2 size={16} />
                </div>
                <p className="text-slate-700 font-medium">{t(`achievements.${index}`)}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
