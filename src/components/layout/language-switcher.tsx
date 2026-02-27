"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideGlobe, LucideChevronDown, LucideCheck } from "lucide-react";
import { locales, usePathname } from "@/i18n/routing";
import { clsx } from "clsx";

const labelMap: Record<(typeof locales)[number], string> = {
  en: "English",
  am: "አማርኛ",
};

type LanguageSwitcherProps = {
  currentLocale: string;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLocale = locales.includes(currentLocale as (typeof locales)[number])
    ? (currentLocale as (typeof locales)[number])
    : locales[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (languageCode: (typeof locales)[number]) => {
    if (languageCode === activeLocale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length === 0) {
        segments.push(languageCode);
      } else {
        segments[0] = languageCode;
      }

      const search = typeof window !== "undefined" ? window.location.search : "";
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      const nextPath = `/${segments.join("/")}${search}${hash}`;
      window.location.href = nextPath;
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2.5 rounded-2xl px-4 py-2 text-sm font-bold transition-all duration-300",
          isOpen
            ? "bg-primary/10 text-primary"
            : "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900"
        )}
      >
        <LucideGlobe size={16} strokeWidth={2.5} className={clsx("transition-transform", isPending && "animate-spin")} />
        <span className="hidden sm:inline">{labelMap[activeLocale]}</span>
        <LucideChevronDown
          size={12}
          strokeWidth={3}
          className={clsx("transition-transform duration-500", isOpen && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 mt-3 min-w-[170px] origin-top-right rounded-3xl border border-slate-100 bg-white p-2.5 z-50 shadow-glow-sm"
          >
            <div className="space-y-1">
              {locales.map((languageCode) => {
                const isActive = activeLocale === languageCode;
                return (
                  <button
                    key={languageCode}
                    type="button"
                    onClick={() => handleLanguageChange(languageCode)}
                    disabled={isPending}
                    className={clsx(
                      "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition-all duration-200",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <span>{labelMap[languageCode]}</span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <LucideCheck size={16} strokeWidth={3} />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
