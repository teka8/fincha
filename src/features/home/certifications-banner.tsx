"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideAward, LucideShieldCheck, LucideLeaf } from "lucide-react";

export function CertificationsBanner() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home.certifications");

  const certs = [
    { icon: LucideAward, title: t("iso_quality"), desc: t("iso_quality_desc") },
    { icon: LucideLeaf, title: t("environmental"), desc: t("environmental_desc") },
    { icon: LucideShieldCheck, title: t("safety"), desc: t("safety_desc") },
  ];

  return (
    <div className="bg-slate-950 py-16 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 via-transparent to-accent/10" />
      
      <div className="max-w-layout mx-auto px-8 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-24">
          <div className="xl:w-1/3 text-center xl:text-left space-y-4">
            <h2 className="text-3xl font-black text-white">{t("title")}</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto xl:mx-0">
              {t("description")}
            </p>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {certs.map((cert, i) => {
              const Icon = cert.icon;
              return (
                <motion.div 
                  key={i}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="size-16 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform shadow-inner-glow">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold tracking-wide">{cert.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{cert.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
