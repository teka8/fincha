"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { LucideQuote } from "lucide-react";
import Image from "next/image";

export function GMMessage() {
  const t = useTranslations("about.gm_message");
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionContainer className="bg-slate-50 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual / Image */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl bg-primary-900 order-2 lg:order-1"
        >
          {/* Transition to actual leader image when available */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 via-primary-800 to-accent/20" />
          <div className="absolute inset-0 bg-[url('/images/land-o-lakes-inc-PCITNW3g85Q-unsplash.jpg')] bg-cover bg-center mix-blend-overlay opacity-30" />
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center text-white/40 space-y-4">
                <LucideQuote size={48} className="mx-auto" />
                <p className="font-bold uppercase tracking-[0.2em] text-sm">Portrait Placeholder</p>
             </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-transparent" />
        </motion.div>

        {/* Quote Content */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, x: -30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative order-1 lg:order-2"
        >
          <div className="absolute -top-12 -left-8 text-primary/10 select-none">
            <LucideQuote size={160} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <SectionHeading 
              eyebrow={t("eyebrow")}
              title={t("title")}
              align="left"
            />
            
            <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 leading-tight italic">
              &quot;{t("quote")}&quot;
            </blockquote>
            
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
               <div className="size-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                 GM
               </div>
               <div>
                 <p className="font-bold text-slate-900">{t("name")}</p>
                 <p className="text-sm font-medium text-primary uppercase tracking-widest">{t("role")}</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
