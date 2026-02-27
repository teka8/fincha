import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideSprout, LucideCheckCircle2 } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getProjects } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type ProjectsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.projects"),
    description: "Explore our strategic projects in irrigation, renewable energy, and industrial expansion.",
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  await getTranslations({ locale, namespace: "common" });
  const projectsRes = await getProjects(locale);
  const projects = projectsRes.data;

  return (
    <div className="flex flex-col">
      <PageHero
        title="Engineering Sustainable Change"
        subtitle="From precision irrigation to carbon-neutral power, our projects address the dual challenges of industrial productivity and environmental care."
        image="/images/pexels-format-380633-1029757.jpg"
        badge="Strategic Portfolio"
      />

      {/* Projects Portfolio */}
      <SectionContainer className="bg-white">
        <div className="space-y-24">
          {projects.length > 0 ? projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={String(project.id)} 
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                     <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary font-bold">
                       0{index + 1}
                     </span>
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                       {String(project.status ?? "Ongoing Project")}
                     </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 transition-colors group-hover:text-primary">
                    {String(project.title ?? project.name)}
                  </h3>
                  
                  <div className="prose prose-slate leading-relaxed text-muted mb-8">
                    <p>{String(project.summary ?? project.description ?? "Transforming agro-industrial operations through innovative engineering and sustainable resource management.")}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     {["Solar-ready", "99% Efficiency", "Community-fed", "Modular scale"].map((tag, i) => (
                       <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                         <LucideCheckCircle2 size={16} className="text-primary" />
                         {tag}
                       </div>
                     ))}
                  </div>

                  <Link 
                    href={{ pathname: "/projects/[id]", params: { id: String(project.slug || project.id || "0") } }}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-slate-900 text-white font-bold transition-all hover:bg-primary hover:shadow-glow-sm hover:-translate-y-1"
                  >
                    View project details
                  </Link>
                </div>
                
                <div className={`relative rounded-[60px] overflow-hidden aspect-[4/3] bg-slate-100 shadow-2xl ${!isEven ? 'lg:order-1' : ''}`}>
                   {project.image ? (
                     <Image 
                       src={String(project.image)} 
                       alt={String(project.title ?? project.name)} 
                       fill 
                       className="object-cover"
                     />
                   ) : (
                     <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
                        <LucideSprout size={100} className="text-primary opacity-20" />
                     </div>
                   )}
                </div>
              </div>
            );
          }) : (
            <div className="py-24 text-center">
              <p className="text-slate-400">Loading project portfolio...</p>
            </div>
          )}
        </div>
      </SectionContainer>
      
      {/* Visionary Banner */}
      <div className="bg-slate-50 border-y border-slate-100">
         <SectionContainer className="py-20 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">&quot;We don&apos;t just process cane; we cultivate the future of Ethiopia&apos;s agro-industrial self-reliance.&quot;</h2>
            <div className="flex border-t border-slate-200 pt-8 justify-center gap-12">
               <div>
                  <p className="text-3xl font-black text-primary mb-1">2030</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vision target</p>
               </div>
               <div>
                  <p className="text-3xl font-black text-primary mb-1">Zero</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Waste goal</p>
               </div>
               <div>
                  <p className="text-3xl font-black text-primary mb-1">100%</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Renewable</p>
               </div>
            </div>
         </SectionContainer>
      </div>
    </div>
  );
}
