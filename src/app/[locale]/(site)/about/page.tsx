import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getLeaders } from "@/lib/cms";
import Image from "next/image";
import { Linkedin, Facebook, Twitter, Instagram, Youtube, Link2 } from "lucide-react";

import { AboutStats } from "@/features/about/stats-grid";
import { GMMessage } from "@/features/about/gm-message";
import { CoreValues } from "@/features/about/core-values";
import { CommunityImpact } from "@/features/about/community-impact";
import { AboutTimeline } from "@/features/about/milestones-timeline";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.about"),
    description: "Learn more about Fincha Sugar Factory, our history, mission, and leadership.",
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const leaders = await getLeaders(locale);

  return (
    <main className="flex min-h-screen flex-col">
      <PageHero
        title="Sweetening the Nation Since 1998"
        subtitle="Experience the history, scale, and dedication behind one of Africa's most integrated sugar production complexes."
        image="/images/pexels-mikael-blomkvist-64765951.jpg"
        badge="Our Heritage"
      />

      <AboutStats />

      <section className="relative border-b border-primary/5 bg-white">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <SectionHeading 
                eyebrow="Our Legacy" 
                title="A History of Excellence" 
                description="Established in the heart of the Fincha Valley, our journey began with a vision to maximize the potential of Ethiopia&apos;s agricultural resources."
                align="left"
              />
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  From its humble beginnings, Fincha Sugar Factory has expanded into a massive 
                  agro-industrial complex. Our two-phase expansion has significantly increased 
                  our capacity, allowing us to produce high-quality sugar, fuel-grade ethanol, 
                  and renewable energy.
                </p>
                <p>
                  Today, we stand as a model of integrated manufacturing, where nothing goes to waste. 
                  Our by-products power our factory and contribute to the national grid, 
                  embodying the spirit of circular economy.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="p-6 rounded-3xl bg-primary-50/50 border border-primary/10">
                  <h3 className="font-bold text-lg text-primary mb-2">Our Mission</h3>
                  <p className="text-sm text-slate-600">
                    To be the leading producer of sugar and related agro-industrial products in 
                    East Africa through sustainable practices and innovation.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-accent-50/50 border border-accent/10">
                  <h3 className="font-bold text-lg text-accent mb-2">Our Vision</h3>
                  <p className="text-sm text-slate-600">
                    Empowering communities and sweetening progress by delivering world-class 
                    products while preserving the environment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white/20">
                <span className="text-9xl font-black">FINCHA</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-medium text-lg">Aerial view of the Fincha Valley plantation</p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      <GMMessage />
      
      <CoreValues />

      <section className="relative border-y border-primary/5 bg-[#eeeeee]">
        <SectionContainer>
          <SectionHeading 
            eyebrow="Leadership" 
            title="Guided by Visionaries" 
            description="Our leadership team brings decades of experience in management, engineering, and sustainable development."
            align="center"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.length > 0 ? leaders.map((leader) => (
              <div key={leader.id} className="group flex flex-col items-center text-center">
                <div className="relative size-48 mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105">
                  <div className="size-full bg-slate-200 flex items-center justify-center text-slate-400">
                    <span className="text-4xl font-bold">{leader.name.charAt(0)}</span>
                  </div>
                  {leader.avatar && (
                    <Image 
                      src={leader.avatar} 
                      alt={leader.name} 
                      fill 
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{leader.name}</h3>
                <p className="text-sm text-primary font-semibold uppercase tracking-wider">{leader.title}</p>
                
                {leader.social && (
                  <div className="flex items-center justify-center gap-3 mt-3">
                    {leader.social.linkedin && (
                      <a href={leader.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.facebook && (
                      <a href={leader.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877f2] transition-colors" aria-label="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.twitter && (
                      <a href={leader.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1da1f2] transition-colors" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.instagram && (
                      <a href={leader.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#e4405f] transition-colors" aria-label="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.youtube && (
                      <a href={leader.social.youtube} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#ff0000] transition-colors" aria-label="YouTube">
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                    {leader.social.telegram && (
                      <a href={leader.social.telegram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#0088cc] transition-colors" aria-label="Telegram">
                        <Link2 className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
                
                <p className="mt-4 text-sm text-muted leading-relaxed line-clamp-3 px-4">
                  {leader.bio ?? "Leading our operations with a focus on efficiency and social responsibility."}
                </p>
              </div>
            )) : (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="group flex flex-col items-center text-center opacity-50">
                  <div className="size-48 bg-slate-200 rounded-full mb-6" />
                  <div className="h-6 w-32 bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-24 bg-slate-200 rounded" />
                </div>
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <a 
              href={`/${locale}/team`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              Meet Our FSF Team
              <span aria-hidden>→</span>
            </a>
          </div>
        </SectionContainer>
      </section>

      <section className="relative bg-white">
        <CommunityImpact />
      </section>

      <AboutTimeline />

      <section className="relative border-y border-primary/5 bg-[#eeeeee]">
        <SectionContainer>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <SectionHeading 
              eyebrow="Integrated Value Chain" 
              title="Nothing Wasted, Everything Value" 
              description="Learn how we transform sugarcane into multiple valuable products for a sustainable future."
              align="center"
            />
            
            <div className="relative mt-12 p-8 md:p-12 rounded-[50px] bg-gradient-to-br from-primary-900 to-primary-800 text-white overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <span className="text-[200px] font-black leading-none">FSF</span>
              </div>
              <div className="relative z-10 grid md:grid-cols-3 gap-12 text-left">
                <div className="space-y-4">
                  <h4 className="text-accent text-xl font-bold uppercase tracking-widest">Sugar</h4>
                  <p className="text-primary-100/70 text-sm leading-relaxed">
                    Premium white and retail crystal sugar produced using the latest plantation white processing tech.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-accent text-xl font-bold uppercase tracking-widest">Ethanol</h4>
                  <p className="text-primary-100/70 text-sm leading-relaxed">
                    Fuel-grade ethanol distilled from molasses, reducing Ethiopia&apos;s fuel import bill.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-accent text-xl font-bold uppercase tracking-widest">Energy</h4>
                  <p className="text-primary-100/70 text-sm leading-relaxed">
                    Renewable electricity co-generated from bagasse, powering thousands of homes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    </main>
  );
}
