import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideBriefcase, LucideMapPin, LucideClock, LucideSearch, LucideArrowRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getJobs } from "@/lib/cms";
import { Link } from "@/i18n/routing";

type CareersPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: CareersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.careers"),
    description: "Join the Fincha family. Explore rewarding career opportunities in agro-industrial engineering, management, and sustainable development.",
  };
}

export default async function CareersPage({ params }: CareersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const jobsRes = await getJobs(locale);
  const jobs = jobsRes.data;

  return (
    <div className="flex flex-col">
      {/* Careers Hero */}
      <section className="bg-primary-900 pt-32 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-950 to-primary-900 opacity-90 z-10" />
        {/* Abstract Pattern */}
        <div className="absolute top-0 right-0 p-24 opacity-5 rotate-12 z-0">
           <LucideBriefcase size={400} />
        </div>
        
        <div className="relative z-20 max-w-layout mx-auto px-8">
           <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Build a <span className="text-accent italic">Sweet</span> Career
              </h1>
              <p className="text-xl text-primary-100/80 leading-relaxed">
                Join Ethiopia&apos;s industrial transformation. We&apos;re looking for passionate 
                professionals to help us innovate the sugar value chain.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-4 max-w-xl">
                 <div className="relative flex-1">
                    <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-300" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search roles (e.g. Engineer)"
                      className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-4 focus:ring-accent/20 focus:bg-white/15 transition-all"
                    />
                 </div>
                 <button className="px-8 py-4 bg-accent text-primary-950 font-black rounded-2xl hover:bg-white transition-colors active:scale-95">
                    Search Jobs
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <SectionContainer className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <h2 className="text-2xl font-black text-slate-900">
             Current Openings <span className="ml-2 text-primary text-sm font-bold bg-primary/5 px-3 py-1 rounded-full">{jobs.length}</span>
           </h2>
           <div className="flex gap-3">
              <select className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 focus:outline-none">
                 <option>All Departments</option>
                 <option>Engineering</option>
                 <option>Agriculture</option>
                 <option>Management</option>
              </select>
           </div>
        </div>

        <div className="space-y-4">
          {jobs.length > 0 ? jobs.map((job) => (
            <Link 
              key={job.id}
              href={{ pathname: "/careers/[id]", params: { id: job.id.toString() } }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-slate-100 rounded-[32px] transition-all hover:bg-slate-50 hover:border-primary/20 hover:shadow-card"
            >
              <div className="space-y-4 mb-6 md:mb-0">
                 <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-700 text-[10px] font-bold uppercase tracking-widest">
                      {job.department ?? 'Operational'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-primary/5 text-primary-700 text-[10px] font-bold uppercase tracking-widest">
                      {job.type ?? 'Full-time'}
                    </span>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                 <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
                    <span className="flex items-center gap-2">
                       <LucideMapPin size={16} className="text-slate-300" />
                       {job.location ?? 'Fincha Valley'}
                    </span>
                    <span className="flex items-center gap-2">
                       <LucideClock size={16} className="text-slate-300" />
                       Posted {job.created_at ? new Date(job.created_at).toLocaleDateString(locale) : 'Recently'}
                    </span>
                 </div>
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="hidden sm:flex flex-col items-end mr-6 text-right">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-1">Apply by</span>
                    <span className="text-sm font-bold text-slate-500">{job.closing_date ? new Date(job.closing_date).toLocaleDateString(locale) : 'TBD'}</span>
                 </div>
                 <div className="size-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center transition-all group-hover:bg-primary group-hover:shadow-glow-sm">
                    <LucideArrowRight size={24} />
                 </div>
              </div>
            </Link>
          )) : (
            <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[40px]">
               <LucideBriefcase size={48} className="text-slate-200 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-900 mb-2">No active openings right now</h3>
               <p className="text-slate-400 max-w-sm mx-auto">We&apos;re always looking for talent. Please check back later or send us your CV for future consideration.</p>
            </div>
          )}
        </div>
      </SectionContainer>
      
      {/* Culture Section */}
      <div className="bg-slate-50">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative rounded-[50px] overflow-hidden aspect-video shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                <div className="w-full h-full bg-[url('/images/workers-huddle.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="size-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40">
                      <div className="size-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-white ml-1" />
                   </div>
                </div>
             </div>
             <div>
                <SectionHeading 
                  eyebrow="Our Culture" 
                  title="Life at Fincha" 
                  description="We don&apos;t just offer jobs; we offer a community. Living and working at the Fincha Valley complex is a unique experience focused on mutual growth."
                  align="left"
                />
                <div className="grid sm:grid-cols-2 gap-6 mt-10">
                   {[
                     { title: "Holistic Benefits", desc: "Comprehensive healthcare and performance bonuses." },
                     { title: "Continuous Learning", desc: "Access to vocational and management training." },
                     { title: "Family Support", desc: "Standard housing and school facilities on campus." },
                     { title: "Career Pathing", desc: "Internal promotion first policy for high performers." }
                   ].map((item, i) => (
                     <div key={i} className="space-y-2">
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
