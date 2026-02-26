"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  children?: ReactNode;
};

export function PageHero({
  title,
  subtitle,
  image,
  badge,
  children,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[450px] lg:h-[550px] flex items-center overflow-hidden border-b border-slate-100">
      {/* Lime to White Gradient Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Transition from requested color to white */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9EEB47] via-[#9EEB47]/20 to-white" />
        
        {/* Subtle ambient lights - softened for white transition */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-white/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -left-12 w-[400px] h-[400px] bg-primary-100/10 rounded-full blur-[100px]" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-layout mx-auto px-8 lg:px-12 h-full flex flex-col lg:flex-row items-center">
        {/* Left Content Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 py-16 lg:py-0 z-20 text-center lg:text-left"
        >
          {/* Eyebrow with decorative line - following the screenshot's aesthetic */}
          {badge && (
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <div className="w-8 h-[1px] bg-accent opacity-60" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-accent">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Premium Serif Title - following the screenshot's typography */}
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl lg:text-7xl font-medium font-serif text-slate-900 leading-[1.05] tracking-tight mb-8"
          >
            {title.split(' ').map((word, i) => {
               // Logic to color specific words (every 3rd word for flair, or can be smarter)
               const isAccent = i % 3 === 1 || word.toLowerCase() === 'digital' || word.toLowerCase() === 'sweet';
               return (
                <span key={i} className={isAccent ? "text-accent italic" : ""}>
                  {word}{' '}
                </span>
               );
            })}
          </motion.h1>

          {/* Clean Subtitle */}
          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-lg text-slate-500 max-w-lg leading-relaxed mb-10 font-sans mx-auto lg:mx-0 opacity-80"
          >
            {subtitle}
          </motion.p>

          {/* CTA / Children - following the screenshot's CTA style */}
          {children ? (
            <motion.div variants={itemVariants}>
              {children}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
               <button className="group relative flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-accent hover:text-slate-900 transition-colors">
                  <span className="relative">
                    Explore our story
                    <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-accent group-hover:bg-slate-900 transition-colors" />
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
               </button>
            </motion.div>
          )}
        </motion.div>

        {/* Right Diagonal Cut Image Container */}
        <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full z-10">
          {/* Gold Accent Line (Tracer) */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="absolute inset-0 bg-accent z-10"
            style={{ 
              clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
              width: 'calc(100% + 4.5px)',
              right: '-4.5px'
            }}
          />
          
          {/* Main Diagonal Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 z-20 overflow-hidden shadow-2xl"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover brightness-95"
              priority
            />
            {/* Subtle Overlay on image to match the warm tone in the screenshot */}
            <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Mobile Image Version (Simple premium card) */}
        <div className="lg:hidden w-full pb-16 px-6">
           <div className="relative aspect-video rounded-4xl overflow-hidden border-8 border-white shadow-2xl">
              <Image src={image} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
           </div>
        </div>
      </div>
    </section>
  );
}
