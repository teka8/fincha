import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideHeart, LucideSprout, LucideUsers, LucideGraduationCap, LucideGlobe } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import Image from "next/image";

type CSRPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: CSRPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.csr"),
    description: "Discover our commitment to community empowerment, environmental stewardship, and sustainable manufacturing.",
  };
}

const pillars = [
  {
    icon: LucideUsers,
    title: "Community Livelihoods",
    description: "Empowering thousands of outgrower households through technology transfer, credit facilities, and guaranteed market access.",
    color: "bg-primary-50 text-primary"
  },
  {
    icon: LucideSprout,
    title: "Environment & Climate",
    description: "Protecting the Fincha watershed through massive reforestation and promoting climate-smart sugarcane cultivation.",
    color: "bg-accent-50 text-accent"
  },
  {
    icon: LucideGraduationCap,
    title: "Education & Skills",
    description: "Supporting local schools and providing vocational training to equip the youth with technical industrial skills.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: LucideHeart,
    title: "Health & Wellness",
    description: "Providing quality healthcare services through our factory clinic and community health outreach programs.",
    color: "bg-red-50 text-red-600"
  }
];

export default async function CSRPage({ params }: CSRPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="flex flex-col">
      <PageHero
        title="Grown with Purpose"
        subtitle="Experience our dedication to social empowerment, environmental guardianship, and sustainable industrial growth."
        image="/images/community-header.jpg"
        badge="CSR & Sustainability"
      />

      {/* Intro Section */}
      <SectionContainer className="bg-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <SectionHeading 
                eyebrow="Our Commitment" 
                title="Rooted in the Community" 
                description="Sustainability at Fincha isn&apos;t just about business—it&apos;s about people. We believe our growth is only meaningful if it&apos;s shared with the community that surrounds us."
                align="left"
              />
              <p className="mt-8 text-muted leading-relaxed">
                As one of the largest employers in the region, we take our responsibility to the Fincha Valley 
                community seriously. Our integrated corporate social responsibility framework focuses on 
                long-term impact and self-reliance rather than transactional aid.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 text-center">
                 <p className="text-4xl font-black text-primary mb-2">10k+</p>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Outgrowers supported</p>
              </div>
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 text-center">
                 <p className="text-4xl font-black text-primary mb-2">1M+</p>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trees planted yearly</p>
              </div>
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 text-center">
                 <p className="text-4xl font-black text-primary mb-2">25+</p>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Local schools engaged</p>
              </div>
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 text-center">
                 <p className="text-4xl font-black text-primary mb-2">31MW</p>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Renewable energy</p>
              </div>
           </div>
        </div>
      </SectionContainer>

      {/* Four Pillars */}
      <div className="bg-slate-50/50">
        <SectionContainer>
          <SectionHeading 
            eyebrow="The Four Pillars" 
            title="Our Strategic Focus" 
            description="We concentrate our resources where we can make the most significant and lasting difference."
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="group p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2">
                <div className={`size-14 rounded-2xl ${pillar.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 shadow-sm`}>
                  <pillar.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      {/* Large Featured Story / Quote */}
      <div className="bg-primary-900 py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('/images/nature-pattern.png')] opacity-5" />
         <div className="relative max-w-4xl mx-auto px-8 text-center">
            <LucideGlobe size={64} className="text-accent mx-auto mb-10 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
              &quot;We strive to leave the Fincha Valley better than we found it, for every generation to come.&quot;
            </h2>
            <div className="flex items-center justify-center gap-4">
               <div className="h-px w-10 bg-accent/40" />
               <span className="text-accent text-sm font-bold uppercase tracking-[0.3em]">Our Environmental Pledge</span>
               <div className="h-px w-10 bg-accent/40" />
            </div>
         </div>
      </div>
    </div>
  );
}
