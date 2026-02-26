import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { SectionContainer } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getLeaders } from "@/lib/cms";

type TeamPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: TeamPageProps): Promise< Metadata> {
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
      {/* Hero Section - Using PageHero like about page */}
      <PageHero
        title="Meet Our Team"
        subtitle="The talented individuals who make Fincha Sugar Factory a success. Together, we work towards a sustainable future for Ethiopia."
        image="/images/hero-factory.jpg"
        badge="Our People"
      />

      {/* Team Grid */}
      <SectionContainer className="bg-gradient-to-b from-slate-50 to-white py-24">
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
