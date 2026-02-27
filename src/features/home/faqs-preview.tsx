"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { LucideChevronDown, LucideMessageCircleQuestion } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    question: "What products are available today?",
    answer: "We offer premium white sugar, retail crystal sugar, industrial molasses, ethanol, and by-products. All products meet ISO 22000 food safety standards.",
  },
  {
    question: "How can suppliers partner with Fincha?",
    answer: "Suppliers can submit partnership proposals through our contact page or tender portal. We regularly publish procurement opportunities and partnership programs.",
  },
  {
    question: "Where are the factory and plantations located?",
    answer: "Fincha Sugar Factory is located in the Horo Guduru Wollega Zone, Oromia Region, Ethiopia, surrounded by extensive sugarcane plantations in the Fincha Valley.",
  },
];

export function FAQsPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");

  return (
    <SectionContainer className="relative overflow-hidden bg-white dark:bg-slate-900/50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-20 size-80 rounded-full bg-primary/5 blur-[100px]" />

      <div className="grid gap-12 lg:grid-cols-[1fr,1.5fr]">
        <div>
          <SectionHeading title={t("faqs.title")} description={t("faqs.description")} />
          <div className="mt-8 flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-400 text-white shadow-glow-sm">
            <LucideMessageCircleQuestion size={36} strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                  ? "border-primary/20 bg-white dark:bg-slate-900 shadow-card"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/10 hover:shadow-sm"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-colors ${isOpen
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary"
                      }`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className={`text-base font-semibold transition-colors ${isOpen ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                      {faq.question}
                    </p>
                  </div>
                  <LucideChevronDown
                    size={18}
                    className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-4">
                        <p className="pl-12 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
