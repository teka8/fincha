import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionContainer } from "@/components/ui/section-heading";
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
      <SectionContainer className="bg-gradient-to-b from-slate-50 to-white py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The talented individuals who make Fincha Sugar Factory a success. Together, we work towards a sustainable future.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {leaders.length > 0 ? leaders.map((leader, index) => (
            <div 
              key={leader.id} 
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Decorative gradient top */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />

              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent z-10" />
                {leader.avatar ? (
                  <Image 
                    src={leader.avatar} 
                    alt={leader.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="size-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-8xl font-black text-primary/20">{leader.name.charAt(0)}</span>
                  </div>
                )}

                {/* Decorative circle */}
                <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl" />
              </div>

              {/* Content Section */}
              <div className="relative p-6 text-center -mt-4">
                {/* Role Badge */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {leader.title}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {leader.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {leader.bio ?? "Dedicated professional driving Fincha Sugar Factory's success with expertise and commitment."}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )) : (
            // Fallback leaders
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden shadow-lg">
                <div className="h-80 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-8xl font-black text-primary/20">{String.fromCharCode(64 + i)}</span>
                </div>
                <div className="p-6 text-center -mt-4">
                  <div className="h-6 w-32 bg-slate-200 rounded mx-auto mb-2" />
                  <div className="h-4 w-24 bg-slate-200 rounded mx-auto" />
                </div>
              </div>
            ))
          )}
        </div>
      </SectionContainer>
    </main>
  );
}
