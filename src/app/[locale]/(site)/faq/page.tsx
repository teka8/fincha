import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideMessageCircle, LucideArrowRight, LucideHelpCircle } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getFaqs } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { FaqAccordion } from "@/components/ui/faq-accordion";

type FAQPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  return {
    title: t("navigation.faq"),
    description: "Find quick answers to common questions about our products, business opportunities, and community impact.",
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;
  const faqs = await getFaqs(locale);

  return (
    <div className="flex flex-col">
<<<<<<< HEAD
      {/* FAQ Hero */}
      <section className="bg-slate-50 dark:bg-slate-900/50 pt-32 pb-16">
        <div className="max-w-layout mx-auto px-8">
          <SectionHeading
            eyebrow="Support Center"
            title="Frequently Asked Questions"
            description="Quick answers to our most common inquiries regarding products, wholesale, and community relations."
            align="left"
          />
        </div>
      </section>

      {/* Accordion Section */}
      <SectionContainer className="pt-0 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.length > 0 ? faqs.map((faq, i) => (
            <div
              key={faq.id}
              className="group border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:border-primary/20 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80"
            >
              <details className="w-full">
                <summary className="flex items-center justify-between p-8 cursor-pointer list-none select-none">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-4">
                    <span className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <LucideChevronDown size={20} className="text-slate-300 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-8 pb-8 pt-0 ml-12">
                  <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-500 dark:text-slate-400 leading-relaxed italic">
                    {faq.answer}
                  </div>
                </div>
              </details>
            </div>
          )) : (
            // Mock FAQs
            [
              { q: "How can I purchase sugar in bulk?", a: "Wholesale sugar purchases are managed through our sales department. You&apos;ll need a valid trade license and VAT registration to initiate a contract." },
              { q: "Does Fincha export ethanol to international markets?", a: "Yes, our fuel-grade ethanol is certified for export. Please contact our international trade office for export quotas and pure-grade specifications." },
              { q: "How can smallholder farmers join the outgrower program?", a: "Farmers within the designated irrigation command area can apply at our outgrower coordination office in the Fincha Valley complex." },
              { q: "Are there any current open tenders for supplies?", a: "All active tenders are listed on our Procurement page. We update these weekly every Monday morning." }
            ].map((item, i) => (
              <div
                key={i}
                className="group border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm transition-all hover:border-primary/20"
              >
                <div className="flex items-center justify-between p-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-4">
                    <span className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center text-xs font-bold shrink-0">Q</span>
                    {item.q}
                  </h3>
                  <LucideChevronDown size={20} className="text-slate-300" />
                </div>
                <div className="px-8 pb-8 pt-0 ml-12">
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Support CTA */}
        <div className="mt-24 text-center p-16 rounded-[60px] bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 size-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <LucideMessageCircle size={48} className="text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4 dark:text-white">Still have questions?</h2>
            <p className="text-muted dark:text-slate-400 max-w-md mx-auto mb-10">Our team is ready to help you with detailed information about any aspect of our operations.</p>
=======
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Quick answers to our most common inquiries regarding products, wholesale, and community relations."
        image="/images/5.jpg"
        badge="Support Center"
      />

      <SectionContainer className="bg-white">
        {/* Stats row */}
        <div className="mb-12 flex flex-wrap gap-6">
          {[
            { label: "Questions Answered", value: faqs.length > 0 ? faqs.length : "4+", color: "text-primary" },
            { label: "Topics Covered", value: "6", color: "text-blue-500" },
            { label: "Avg. Response Time", value: "24h", color: "text-amber-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 px-6 py-4">
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto">
          <FaqAccordion faqs={faqs} />
        </div>

        {/* Support CTA */}
        <div className="mt-24 text-center p-16 rounded-[60px] bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 size-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 size-48 bg-amber-400/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="relative z-10">
            <LucideMessageCircle size={48} className="text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-10">
              Our team is ready to help you with detailed information about any aspect of our operations.
            </p>
>>>>>>> 41d8bfce7b06977bd0e03c2a0783425e638d7d1d
            <Link
              href={{ pathname: "/contact" }}
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-primary transition-all shadow-glow hover:shadow-glow-sm"
            >
              Get in Touch
              <LucideArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
