"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type HeroProps = {
  title: string;
  subtitle: string;
};

const slides = [
  {
    id: 1,
    image: "/images/land-o-lakes-inc-PCITNW3g85Q-unsplash.jpg",
    badge: "Harvesting Excellence",
    title: "The Heart of the Fincha Valley",
    description: "Sustainable plantations spanning thousands of hectares, nurtured by the legacy of generations.",
    color: "primary",
  },
  {
    id: 2,
    image: "/images/pexels-mikael-blomkvist-6476595.jpg",
    badge: "Pure Sweetness",
    title: "Refined with Integrity",
    description: "From crystallization to packaging, we deliver premium quality sugar products to millions of homes.",
    color: "accent",
  },
  {
    id: 3,
    image: "/images/pexels-mikael-blomkvist-64765951.jpg",
    badge: "Operational Might",
    title: "Driving Industrial Progress",
    description: "State-of-the-art facilities powering the nation's energy and sugar needs with efficiency.",
    color: "primary",
  },
];

export function Hero({ title, subtitle }: HeroProps) {
  const t = useTranslations("home.hero");
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-primary-950">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative mx-auto flex h-full max-w-layout items-center px-8 sm:px-12 lg:px-16 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className={`mb-6 inline-flex items-center gap-2 rounded-full border ${slide.color === 'accent' ? 'border-accent/30 bg-accent/10 text-accent-200' : 'border-primary-300/30 bg-primary-900/40 text-primary-200'} px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md`}>
                <span className={`size-1.5 animate-pulse rounded-full ${slide.color === 'accent' ? 'bg-accent' : 'bg-primary-300'}`} />
                {slide.badge}
              </p>
              
              <h1 className="text-5xl font-bold leading-[1.1] text-white sm:text-7xl">
                {current === 2 ? title : slide.title.split(' ').map((word, i) => (
                    <span key={i} className={i === slide.title.split(' ').length - 1 || i === slide.title.split(' ').length - 2 ? (slide.color === 'accent' ? 'text-accent' : 'text-primary-300') : ''}>
                        {word}{' '}
                    </span>
                ))}
              </h1>

              <p className="mt-8 text-xl text-white/70 md:max-w-xl">
                {current === 2 ? subtitle : slide.description}
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className={`h-14 px-10 transition-all ${slide.color === 'accent' ? 'bg-accent text-primary-950 hover:bg-accent-400' : 'bg-primary-400 text-primary-950 hover:bg-primary-300'}`}>
                  <Link href="/products">{t("primaryCta")}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-14 border-white/20 px-10 text-white hover:bg-white/10">
                  <Link href="/media">{t("secondaryCta")}</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-8 z-50 flex items-center gap-4 sm:right-12 lg:right-16 xl:right-20">
        <button
          onClick={() => paginate(-1)}
          className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          <ChevronLeft className="size-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="group flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          <ChevronRight className="size-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 z-50 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 transition-all duration-300 rounded-full ${i === current ? 'w-10 bg-primary-400' : 'w-4 bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
}
