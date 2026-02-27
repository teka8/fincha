import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideBriefcase, LucideMapPin, LucideClock, LucideArrowRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getJobs } from "@/lib/cms";
import type { Job } from "@/types/cms";
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
  
  let jobs: Job[] = [];
  try {
    const jobsRes = await getJobs(locale);
    jobs = jobsRes.data;
  } catch (error) {
    console.error("Failed to load jobs:", error);
  }

  // Fallback jobs if API fails
  if (jobs.length === 0) {
    jobs = [
      {
        id: 1,
        title: "Senior Mechanical Engineer",
        department: "Engineering",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: "<p>We are looking for a Senior Mechanical Engineer to join our engineering team.</p><ul><li>5+ years of experience in sugar industry</li><li>Bachelor's degree in Mechanical Engineering</li></ul>",
        closing_date: "2026-03-31",
        created_at: "2026-02-01"
      },
      {
        id: 2,
        title: "Agronomist",
        department: "Agriculture",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: "<p>Join our agriculture team to help improve cane yields.</p>",
        closing_date: "2026-04-15",
        created_at: "2026-02-10"
      },
      {
        id: 3,
        title: "Finance Manager",
        department: "Finance",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: "<p>Manage financial operations for our facility.</p>",
        closing_date: "2026-03-20",
        created_at: "2026-02-05"
      }
    ];
  }

  return (
    <div className="flex flex-col">
      <PageHero
        title="Build a Sweet Career"
        subtitle="Join Ethiopia's industrial transformation. We're looking for passionate professionals to help us innovate the sugar value chain."
        image="/images/pexels-mikael-blomkvist-6476595.jpg"
        badge="Join the Fincha Family"
      />

      {/* Jobs Listing */}
      <SectionContainer className="bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
           <div className="flex items-center gap-4">
             <div className="w-1 h-10 bg-primary rounded-full"></div>
             <h2 className="text-3xl font-black text-slate-900">
               Open Positions
             </h2>
             <span className="ml-2 text-sm font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full">{jobs.length} roles available</span>
           </div>
           <div className="flex gap-3">
               <select title="Filter by department" className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer hover:border-slate-300">
                 <option>All Departments</option>
                 <option>Engineering</option>
                 <option>Agriculture</option>
                 <option>Management</option>
                 <option>Finance</option>
                 <option>Operations</option>
              </select>
           </div>
        </div>

<div className="space-y-4">
          {jobs.length > 0 ? jobs.map((job, index) => (
            <Link 
              key={job.id}
              href={{ pathname: "/careers/[id]", params: { id: job.id.toString() } }}
              className="group block relative overflow-hidden bg-white border border-slate-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-3xl"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                     <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary-700 text-xs font-bold uppercase tracking-wide">
                       {job.department ?? 'Operational'}
                     </span>
                     <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                       {job.type ?? 'Full-time'}
                     </span>
                     {job.closing_date && new Date(job.closing_date) > new Date() && (
                       <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold flex items-center gap-1">
                         <LucideClock size={12} /> 
                         Closing {new Date(job.closing_date).toLocaleDateString(locale)}
                       </span>
                     )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                     <span className="flex items-center gap-2">
                        <LucideMapPin size={16} className="text-primary/70" />
                        {job.location ?? 'Fincha Valley'}
                     </span>
                     <span className="flex items-center gap-2">
                        <LucideClock size={16} className="text-primary/70" />
                        Posted {job.created_at ? new Date(job.created_at).toLocaleDateString(locale) : 'Recently'}
                     </span>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end mr-4 text-right">
                     <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Apply by</span>
                     <span className="text-sm font-bold text-slate-600">{job.closing_date ? new Date(job.closing_date).toLocaleDateString(locale) : 'TBD'}</span>
                  </div>
                  <div className="size-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center transition-all group-hover:bg-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                     <LucideArrowRight size={22} />
                  </div>
               </div>
              </div>
            </Link>
          )) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-[40px] bg-slate-50/50">
               <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
                 <LucideBriefcase size={36} className="text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No openings available</h3>
               <p className="text-slate-500 max-w-sm mx-auto mb-6">We&apos;re always looking for great talent. Send us your CV and we&apos;ll reach out when a position matching your skills opens up.</p>
               <a href="mailto:careers@fincha.com" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                 Contact HR
               </a>
            </div>
          )}
        </div>
      </SectionContainer>
      
      {/* Culture Section */}
      <div className="bg-gradient-to-b from-white to-slate-50">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative rounded-[40px] overflow-hidden aspect-[4/3] shadow-2xl shadow-slate-900/10">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-primary/10 to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
                <div className="w-full h-full bg-[url('/images/workers-huddle.jpg')] bg-cover bg-center" />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                   <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                      <div className="grid grid-cols-3 gap-4 text-center">
                         <div>
                            <div className="text-3xl font-black text-primary">500+</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employees</div>
                         </div>
                         <div>
                            <div className="text-3xl font-black text-primary">50+</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Departments</div>
                         </div>
                         <div>
                            <div className="text-3xl font-black text-primary">24/7</div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Operations</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                <SectionHeading 
                  eyebrow="Why Join Us" 
                  title="Build Your Future at Fincha" 
                  description="Join a dynamic team where your career growth is our priority. We invest in our people through comprehensive training, competitive benefits, and clear advancement paths."
                  align="left"
                />
                <div className="grid sm:grid-cols-2 gap-5 mt-10 relative z-10">
                   {[
                     { icon: "🏥", title: "Health & Wellness", desc: "Comprehensive medical coverage for you and your family" },
                     { icon: "📚", title: "Learning & Growth", desc: "Vocational training and management development programs" },
                     { icon: "🏠", title: "Quality Living", desc: "On-site housing and world-class campus facilities" },
                     { icon: "🚀", title: "Career Pathways", desc: "Internal promotion first policy for top performers" }
                   ].map((item, i) => (
                     <div key={i} className="group p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
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
