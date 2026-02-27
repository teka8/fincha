import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucidePhone, LucideMail, LucideMapPin, LucideClock, LucideGithub, LucideLinkedin, LucideFacebook } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";

type ContactPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.contact"),
    description: "Get in touch with Fincha Sugar Factory for sales inquiries, partnerships, or community outreach.",
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "common" });

  return (
    <div className="flex flex-col">
      <PageHero
        title="Let's Start a Conversation"
        subtitle="Whether you're a prospective partner, a wholesaler, or a member of the community, we're here to listen and collaborate."
        image="/images/4.jpg"
        badge="Get in touch"
      />

      {/* Main Contact Section */}
      <SectionContainer className="pt-0">
        <div className="grid lg:grid-cols-12 gap-12 bg-white rounded-[60px] p-8 md:p-12 lg:p-16 border border-slate-100 shadow-2xl overflow-hidden relative">
           {/* Background Accents */}
           <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 size-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

           {/* Contact Info Sidebar */}
           <div className="lg:col-span-5 relative z-10 space-y-12">
              <div className="grid sm:grid-cols-1 gap-8">
                 <div className="flex gap-6 group">
                    <div className="size-14 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0 shadow-sm border border-primary/10">
                       <LucideMapPin size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Primary Office</h4>
                       <p className="text-slate-500 text-sm leading-relaxed">
                          Fincha Sugar Factory Complex<br />
                          Fincha Valley, Oromia<br />
                          Ethiopia
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-6 group">
                    <div className="size-14 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0 shadow-sm border border-primary/10">
                       <LucidePhone size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Direct Line</h4>
                       <p className="text-slate-500 text-sm leading-relaxed">
                          +251-011-000-0000<br />
                          +251-011-000-1111
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-6 group">
                    <div className="size-14 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0 shadow-sm border border-primary/10">
                       <LucideMail size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Email Inquiries</h4>
                       <p className="text-slate-500 text-sm leading-relaxed">
                          info@finchasugar.com<br />
                          sales@finchasugar.com
                       </p>
                    </div>
                 </div>

                 <div className="flex gap-6 group">
                    <div className="size-14 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white shrink-0 shadow-sm border border-primary/10">
                       <LucideClock size={24} />
                    </div>
                    <div>
                       <h4 className="text-lg font-bold text-slate-900 mb-2">Working Hours</h4>
                       <p className="text-slate-500 text-sm leading-relaxed">
                          Monday – Friday: 8:00 AM – 5:00 PM<br />
                          Saturday: 8:30 AM – 12:30 PM
                       </p>
                    </div>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
                 <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Follow our progress</h4>
                 <div className="flex gap-4">
                    <a href="#" className="size-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                       <LucideFacebook size={20} />
                    </a>
                    <a href="#" className="size-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                       <LucideLinkedin size={20} />
                    </a>
                    <a href="#" className="size-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                       <LucideGithub size={20} />
                    </a>
                 </div>
              </div>
           </div>

           {/* Contact Form */}
           <div className="lg:col-span-7 relative z-10 bg-slate-50/50 p-8 rounded-[40px] border border-slate-100">
              <form className="space-y-6">
                 <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                        type="text" 
                        placeholder="e.g. Abebe Bikila"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                       <input 
                        type="email" 
                        placeholder="name@company.com"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                       />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Inquiry Type</label>
                    <select className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer">
                       <option>Wholesale Sugar Sales</option>
                       <option>Ethanol Procurement</option>
                       <option>Community & CSR</option>
                       <option>Tenders & Careers</option>
                       <option>Other / General</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      rows={6}
                      placeholder="How can we help you?"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all resize-none"
                    />
                 </div>

                 <button className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-lg tracking-wide hover:bg-primary hover:shadow-glow transition-all active:scale-95">
                    Send Message
                 </button>
              </form>
           </div>
        </div>
      </SectionContainer>
      
      {/* Map Placeholder */}
      <div className="h-[400px] w-full bg-slate-200 relative">
         <div className="absolute inset-0 bg-[url('/images/map-texture.png')] opacity-10 grayscale" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
               <LucideMapPin size={48} className="text-primary shadow-glow-sm" />
            </div>
         </div>
      </div>
    </div>
  );
}
