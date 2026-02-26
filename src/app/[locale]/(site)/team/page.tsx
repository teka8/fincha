import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getLeaders } from "@/lib/cms";

type TeamPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: `Our Team - ${t("brand")}`,
    description: "Meet the leadership team at Fincha Sugar Factory",
  };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const leaders = await getLeaders(locale);

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden bg-primary-900 flex items-center">
        {/* Background Image - Full Coverage with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-900/80 to-primary-900/40 z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5">
            <div className="size-full bg-[url('/images/hero-factory.jpg')] bg-cover bg-center scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-primary-950/50 via-transparent to-transparent z-10" />
        </div>
        
        {/* Content */}
        <div className="relative z-20 max-w-layout mx-auto px-8 w-full py-24">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
              Our Team
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg drop-shadow-md">
              Meet the dedicated professionals driving Fincha Sugar Factory's success. Our team brings decades of experience in agriculture, engineering, and sustainable manufacturing.
            </p>
            <a 
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-primary-900 transition-all"
            >
              Learn about our company
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <SectionContainer className="bg-slate-50 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The talented individuals who make Fincha Sugar Factory a success. Together, we work towards a sustainable future.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
          {leaders.length > 0 ? leaders.map((leader) => (
            <div key={leader.id} className="group flex flex-col items-center text-center bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all">
              <div className="relative size-40 mb-6 overflow-hidden rounded-full border-4 border-slate-100 shadow-lg">
                <div className="size-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <span className="text-3xl font-bold">{leader.name.charAt(0)}</span>
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
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-3">{leader.title}</p>
              <p className="text-sm text-muted leading-relaxed">
                {leader.bio ?? "Leading our operations with a focus on efficiency and social responsibility."}
              </p>
            </div>
          )) : (
            // Fallback leaders
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center text-center opacity-50">
                <div className="size-40 bg-slate-200 rounded-full mb-6" />
                <div className="h-6 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
            ))
          )}
        </div>
      </SectionContainer>
    </main>
  );
}
