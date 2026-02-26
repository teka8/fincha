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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[400px] lg:h-[450px] flex items-center overflow-hidden border-b border-slate-100">
      {/* Lime to White Gradient Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Transition from requested color to white */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9EEB47] via-[#9EEB47]/30 to-white" />
        
        {/* Subtle ambient lights - softened for white transition */}
        <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-white/40 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -left-12 w-[300px] h-[300px] bg-primary-100/10 rounded-full blur-[80px]" />
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-layout mx-auto px-6 h-full flex flex-col lg:flex-row items-center">
        {/* Left Content Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 py-12 lg:py-0 z-20 text-center lg:text-left"
        >
          {badge && (
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-bold text-[10px] uppercase tracking-widest mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              {badge}
            </motion.div>
          )}

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4"
          >
            {title.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 2 ? "text-primary" : ""}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p 
            variants={itemVariants} 
            className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mb-6 font-medium mx-auto lg:mx-0"
          >
            {subtitle}
          </motion.p>

          {children && (
            <motion.div variants={itemVariants}>
              {children}
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
              width: 'calc(100% + 4px)',
              right: '-4px'
            }}
          />
          
          {/* Main Diagonal Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 z-20 overflow-hidden"
            style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            {/* Subtle Overlay on image */}
            <div className="absolute inset-0 bg-primary-950/10 mix-blend-multiply" />
          </motion.div>
        </div>

        {/* Mobile Image Version (Simple rounded cut) */}
        <div className="lg:hidden w-full pb-12 px-4">
           <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <Image src={image} alt={title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
           </div>
        </div>
      </div>
    </section>
  );
}
