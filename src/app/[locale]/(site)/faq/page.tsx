import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideMessageCircle, LucideHelpCircle, LucideChevronDown, LucideArrowRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getFaqs } from "@/lib/cms";
import { Link } from "@/i18n/routing";

type FAQPageProps = {
  params: Promise<{
    locale: string;
  }>;
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
  const t = await getTranslations({ locale, namespace: "common" });
  const faqs = await getFaqs(locale);

  return (
    <div className="flex flex-col">
      {/* FAQ Hero */}
      <section className="bg-slate-50 pt-32 pb-16">
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
      <SectionContainer className="pt-0 bg-white">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.length > 0 ? faqs.map((faq, i) => (
            <div 
              key={faq.id} 
              className="group border border-slate-100 rounded-3xl overflow-hidden bg-white transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <details className="w-full">
                 <summary className="flex items-center justify-between p-8 cursor-pointer list-none select-none">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-4">
                       <span className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                         {i + 1}
                       </span>
                       {faq.question}
                    </h3>
                    <LucideChevronDown size={20} className="text-slate-300 transition-transform group-open:rotate-180" />
                 </summary>
                 <div className="px-8 pb-8 pt-0 ml-12">
                    <div className="prose prose-slate prose-sm max-w-none text-slate-500 leading-relaxed italic">
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
                className="group border border-slate-100 rounded-3xl overflow-hidden bg-white transition-all hover:border-primary/20 shadow-sm"
              >
                <div className="flex items-center justify-between p-8">
                   <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-4">
                      <span className="size-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center text-xs font-bold shrink-0">Q</span>
                      {item.q}
                   </h3>
                   <LucideChevronDown size={20} className="text-slate-300" />
                </div>
                <div className="px-8 pb-8 pt-0 ml-12">
                   <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Support CTA */}
        <div className="mt-24 text-center p-16 rounded-[60px] bg-slate-50 relative overflow-hidden">
           <div className="absolute top-0 left-0 size-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
           <div className="relative z-10">
              <LucideMessageCircle size={48} className="text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-black mb-4">Still have questions?</h2>
              <p className="text-muted max-w-md mx-auto mb-10">Our team is ready to help you with detailed information about any aspect of our operations.</p>
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
