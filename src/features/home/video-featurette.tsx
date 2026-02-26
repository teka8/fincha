"use client";

import { useTranslations } from "next-intl";
import { LucidePlay } from "lucide-react";

export function VideoFeaturette() {
  const t = useTranslations("home.video");

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden bg-slate-950 flex flex-col justify-end">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/factory-aerial.jpg')] bg-cover bg-center opacity-40 scale-105 transition-transform duration-[20s] hover:scale-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-layout mx-auto w-full px-8 pb-24 flex flex-col md:flex-row items-end justify-between gap-12">
        
        {/* Text Content */}
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-3">
            <span className="size-2.5 rounded-full bg-accent shadow-glow-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-accent">
              {t("eyebrow")}
            </span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            {t("title")}
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            {t("description")}
          </p>
        </div>

        {/* Play Button Trailer */}
        <div className="shrink-0 group cursor-pointer">
           <div className="relative size-32 md:size-40 rounded-full border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:shadow-glow-md">
             {/* Rotating text ring effect placeholder */}
             <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_20s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity">
               <path id="textPath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
               <text className="text-[10px] uppercase font-bold tracking-[0.2em]" fill="currentColor">
                 <textPath href="#textPath" startOffset="0%">{t("cta")} • {t("cta")} • </textPath>
               </text>
             </svg>
             <LucidePlay size={32} className="text-white fill-white group-hover:text-primary-900 group-hover:fill-primary-900 transition-colors ml-2" />
           </div>
        </div>
      </div>
    </section>
  );
}
