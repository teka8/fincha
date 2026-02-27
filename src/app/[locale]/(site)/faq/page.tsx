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
