import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideGavel, LucideClock, LucideFileText, LucideInfo, LucideArrowRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getTenders } from "@/lib/cms";
import { Link } from "@/i18n/routing";

type TendersPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: TendersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.tenders"),
    description: "View active procurement opportunities, invitation to bid, and tender results from Fincha Sugar Factory.",
  };
}

export default async function TendersPage({ params }: TendersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const tendersRes = await getTenders(locale);
  const tenders = tendersRes.data;

  return (
    <div className="flex flex-col">
      <PageHero
        title="Business Opportunities"
        subtitle="Review our latest invitations for bids and supply chain opportunities. We value transparency and excellence in all our partnerships."
        image="/images/hero-factory.jpg"
        badge="Procurement"
      />

      {/* Tenders Selection */}
      <SectionContainer className="bg-white">
        <div className="flex flex-col gap-12">
           <div className="flex items-center gap-4 border-b border-slate-100 pb-8 flex-wrap">
              <button className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-sm">Active Tenders</button>
              <button className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-200">Recent Awards</button>
              <button className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-500 font-bold text-sm hover:bg-slate-200">Archive</button>
           </div>

           <div className="grid gap-6">
              {tenders.length > 0 ? tenders.map((tender) => (
                <div 
                  key={tender.id}
                  className="group flex flex-col lg:flex-row lg:items-center gap-8 p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm transition-all hover:shadow-xl hover:border-primary/20"
                >
                  <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                           Ref: {tender.reference_number ?? 'FSF/001/2024'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-700 text-[10px] font-black uppercase tracking-widest border border-accent/10">
                           {tender.status ?? 'Active'}
                        </span>
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{tender.title}</h3>
                     <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
                        {tender.description ?? "Invitation to bid for the supply of industrial chemicals and maintenance components for the factory phase two upgrade."}
                     </p>
                  </div>
                  
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-10">
                     <div className="space-y-1 min-w-[140px]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                           <LucideClock size={12} /> Deadline
                        </p>
                        <p className="text-sm font-black text-slate-700">
                           {tender.deadline ? new Date(tender.deadline).toLocaleDateString(locale, {day: 'numeric', month: 'short', year: 'numeric'}) : 'TBD'}
                        </p>
                     </div>
                     
                     <div className="flex gap-2">
                        <Link 
                          href={{ pathname: "/tenders/[id]", params: { id: tender.id.toString() } }}
                          className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm transition-all hover:bg-primary shadow-sm hover:shadow-glow-sm active:scale-95"
                        >
                          Details
                        </Link>
                        <button className="size-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                           <LucideFileText size={20} />
                        </button>
                     </div>
                  </div>
                </div>
              )) : (
                 // Fallback tenders
                 [1, 2, 3].map((i) => (
                    <div key={i} className="p-10 bg-slate-50 border border-slate-100 rounded-[40px] opacity-60">
                       <div className="h-6 w-32 bg-slate-200 rounded mb-4" />
                       <div className="h-8 w-64 bg-slate-200 rounded mb-4" />
                       <div className="h-12 w-full bg-slate-200 rounded" />
                    </div>
                 ))
              )}
           </div>

           <div className="p-8 rounded-[40px] bg-primary-50 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
              <div className="size-16 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
                 <LucideInfo size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                 <h4 className="text-lg font-bold text-primary-950 mb-1">Procurement Guidelines</h4>
                 <p className="text-sm text-primary-900/60 leading-relaxed">
                   Be sure to review our updated vendor registration requirements for 2024 before submitting your bid.
                 </p>
              </div>
              <Link href="/downloads" className="px-8 py-3.5 rounded-2xl bg-white text-primary font-bold text-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
                 Download forms
              </Link>
           </div>
        </div>
      </SectionContainer>
      
      {/* FAQ Link / Help section */}
      <section className="bg-slate-50 py-20">
         <div className="max-w-layout mx-auto px-8 grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-[40px] bg-white shadow-sm border border-slate-200 flex flex-col items-center text-center">
               <LucideGavel size={48} className="text-primary mb-6" />
               <h3 className="text-xl font-bold mb-4">Supplier Registration</h3>
               <p className="text-sm text-slate-500 mb-8 leading-relaxed">Join our certified database of suppliers and stay notified about upcoming procurement cycles.</p>
               <button className="flex items-center gap-2 font-bold text-primary group">
                  Register now <LucideArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
               </button>
            </div>
            <div className="p-10 rounded-[40px] bg-white shadow-sm border border-slate-200 flex flex-col items-center text-center">
               <LucideFileText size={48} className="text-accent mb-6" />
               <h3 className="text-xl font-bold mb-4">Tender FAQ</h3>
               <p className="text-sm text-slate-500 mb-8 leading-relaxed">Have questions about our bidding process? Read our detailed guide for prospective suppliers.</p>
               <Link href="/faq" className="flex items-center gap-2 font-bold text-accent group">
                  Common questions <LucideArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
