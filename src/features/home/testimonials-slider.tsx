"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LucideQuote, LucideChevronLeft, LucideChevronRight, LucideStar } from "lucide-react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <SectionContainer className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden py-8 md:py-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/10 rounded-full" />
      </div>
      
      {/* Abstract Glow */}
      <div className="absolute -left-10 -top-10 size-40 bg-primary-500/20 rounded-full blur-[60px]" />
      <div className="absolute -right-10 -bottom-10 size-40 bg-accent/20 rounded-full blur-[60px]" />

      <SectionHeading 
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        align="center"
        className="!text-white mb-2 relative z-10"
      />

      <div className="relative z-10 px-12">
        {/* Quote Icon */}
        <div className="hidden md:block absolute left-4 top-0">
          <LucideQuote size={48} className="text-primary-300/30" />
        </div>
        
        <div className="relative min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex flex-col items-center text-center gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-1 md:hidden">
                {[...Array(5)].map((_, i) => (
                  <LucideStar key={i} size={12} className="fill-accent text-accent" />
                ))}
              </div>
                
              <div className="max-w-2xl">
                <blockquote className="text-sm md:text-lg font-light text-white/95 leading-relaxed">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </blockquote>
              </div>
              
              <div className="flex items-center gap-3 mt-2">
                <div className="size-10 rounded-full bg-gradient-to-br from-primary-400 to-accent flex items-center justify-center text-white font-bold text-sm ring-3 ring-white/10">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white text-sm">{testimonials[currentIndex].author}</p>
                  <p className="text-xs text-primary-200 font-medium">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-4 px-4">
           <button 
            onClick={prev} 
            className="size-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all" 
            aria-label="Previous testimonial"
          >
             <LucideChevronLeft size={20} />
           </button>
           
           <div className="flex gap-1.5">
             {testimonials.map((_, i) => (
               <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-accent' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
                style={{ height: "6px" }}
                aria-label={`Go to testimonial ${i + 1}`}
               />
             ))}
           </div>

           <button 
            onClick={next} 
            className="size-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40 transition-all" 
            aria-label="Next testimonial"
          >
             <LucideChevronRight size={20} />
           </button>
        </div>
      </div>
    </SectionContainer>
  );
}
