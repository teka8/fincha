"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LucideChevronDown } from "lucide-react";

type FaqItem = {
    id: number;
    question: string;
    answer: string;
};

type Props = {
    faqs: FaqItem[];
};

export function FaqAccordion({ faqs }: Props) {
    const [open, setOpen] = useState<number | null>(null);

    const mockFaqs: FaqItem[] = [
        { id: 1, question: "How can I purchase sugar in bulk?", answer: "Wholesale sugar purchases are managed through our sales department. You'll need a valid trade license and VAT registration to initiate a contract." },
        { id: 2, question: "Does Fincha export ethanol to international markets?", answer: "Yes, our fuel-grade ethanol is certified for export. Please contact our international trade office for export quotas and pure-grade specifications." },
        { id: 3, question: "How can smallholder farmers join the outgrower program?", answer: "Farmers within the designated irrigation command area can apply at our outgrower coordination office in the Fincha Valley complex." },
        { id: 4, question: "Are there any current open tenders for supplies?", answer: "All active tenders are listed on our Procurement page. We update these weekly every Monday morning." },
    ];

    const items = faqs.length > 0 ? faqs : mockFaqs;

    return (
        <div className="space-y-3">
            {items.map((faq, i) => {
                const isOpen = open === faq.id;
                return (
                    <div
                        key={faq.id}
                        className={`rounded-3xl border transition-all duration-200 ${isOpen ? "border-primary/20 bg-primary/5 shadow-sm" : "border-slate-100 bg-white hover:border-primary/10"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : faq.id)}
                            className="flex w-full items-center justify-between px-8 py-6 text-left"
                        >
                            <h3 className={`flex items-center gap-4 text-base font-bold transition-colors sm:text-lg ${isOpen ? "text-primary" : "text-slate-900"
                                }`}>
                                <span className={`inline-flex size-8 items-center justify-center rounded-lg text-xs font-black shrink-0 transition-colors ${isOpen ? "bg-primary text-white" : "bg-primary/5 text-primary"
                                    }`}>
                                    {i + 1}
                                </span>
                                {faq.question}
                            </h3>
                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 shrink-0"
                            >
                                <LucideChevronDown size={20} className={isOpen ? "text-primary" : "text-slate-300"} />
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-8 pb-7 pt-0 ml-12">
                                        <p className="text-sm leading-relaxed text-slate-500">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
