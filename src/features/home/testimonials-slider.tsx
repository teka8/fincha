"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideQuote, LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

const testimonials = [
  {
    id: 1,
    quote: "Fincha's outgrower program transformed my yield. With guaranteed market access and technical support, I expanded my farm by 40%.",
    author: "Bekele T.",
    role: "Outgrower Farmer, East Wollega",
    image: "/images/placeholder-farmer.jpg"
  },
  {
    id: 2,
    quote: "Their high-purity ethanol has been a consistent and reliable input for our pharmaceutical manufacturing processes over the last decade.",
    author: "Dr. Samuel Y.",
    role: "Procurement Director, Addis Pharma",
    image: "/images/placeholder-director.jpg"
  },
  {
    id: 3,
    quote: "The skills I learned at the Fincha vocational center allowed me to secure a permanent engineering role at the factory.",
    author: "Alemayehu G.",
    role: "Plant Technician",
    image: "/images/placeholder-tech.jpg"
  }
];

export function TestimonialsSlider() {
  const t = useTranslations("home.testimonials");
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <SectionContainer className="bg-primary-900 text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute -left-40 -top-40 size-96 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute -right-40 -bottom-40 size-96 bg-accent/20 rounded-full blur-[100px]" />

      <SectionHeading 
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="!text-white mb-16 relative z-10"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <LucideQuote size={120} className="absolute -top-10 -left-10 text-white/5 rotate-180 pointer-events-none" />
        
        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={prefersReducedMotion ? undefined : { opacity: 0, x: 50, filter: "blur(4px)" }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, x: -50, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="absolute inset-0 flex flex-col items-center text-center px-4 md:px-12"
            >
              <p className="text-xl md:text-3xl font-medium leading-relaxed text-white mb-8">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                 <div className="size-12 rounded-full bg-slate-800 overflow-hidden relative border-2 border-white/10 shrink-0">
                    <div className="size-full flex items-center justify-center text-slate-500 font-bold bg-slate-800">
                      {testimonials[currentIndex].author.charAt(0)}
                    </div>
                 </div>
                 <div className="text-left">
                   <p className="font-bold text-white tracking-wide">{testimonials[currentIndex].author}</p>
                   <p className="text-xs text-primary font-semibold uppercase tracking-widest">{testimonials[currentIndex].role}</p>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between md:justify-center gap-8 mt-12 px-4">
           <button onClick={prev} className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95" aria-label="Previous testimonial">
             <LucideChevronLeft size={24} />
           </button>
           
           <div className="flex gap-2">
             {testimonials.map((_, i) => (
               <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-primary shadow-glow-sm' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to testimonial ${i + 1}`}
               />
             ))}
           </div>

           <button onClick={next} className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95" aria-label="Next testimonial">
             <LucideChevronRight size={24} />
           </button>
        </div>
      </div>
    </SectionContainer>
  );
}
