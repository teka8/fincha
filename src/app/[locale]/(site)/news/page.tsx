import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideCalendar, LucideUser, LucideArrowRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getPosts } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type NewsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.news"),
    description: "Stay updated with the latest news, announcements, and industrial insights from Fincha Sugar Factory.",
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const newsRes = await getPosts(locale, "news");
  const news = newsRes.data;

  return (
    <div className="flex flex-col">
      {/* News Header */}
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-layout mx-auto px-8">
           <SectionHeading 
              eyebrow="News & Media" 
              title="Voice of the Valley" 
              description="Discover the latest stories on industrial expansion, community impact, and agricultural innovation at Fincha."
              align="left"
           />
        </div>
      </section>

      {/* Featured / Latest News */}
      <SectionContainer className="pt-0">
        <div className="grid lg:grid-cols-1 gap-12">
          {news.length > 0 ? (
            <div className="space-y-16">
              {/* Latest News Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {news.map((item) => (
                  <article 
                    key={item.id}
                    className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <LucideCalendar size={48} strokeWidth={1} />
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm text-primary text-[11px] font-bold shadow-sm">
                          {item.created_at ? new Date(item.created_at).toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                         <span className="text-accent">{item.category?.name ?? 'UPDATE'}</span>
                         <span className="size-1 rounded-full bg-slate-200" />
                         <span className="flex items-center gap-1">
                           <LucideUser size={12} />
                           Factory Press
                         </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-snug">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-8">
                        {item.excerpt ?? item.summary ?? "Stay up to date with the latest developments in our production capacity and community engagements."}
                      </p>

                      <div className="mt-auto">
                        <Link 
                          href={{ pathname: "/news/[id]", params: { id: (item.slug ?? item.id.toString()) } }}
                          className="inline-flex items-center gap-2 font-bold text-primary group/link"
                        >
                          Read full story
                          <LucideArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
             <div className="py-24 text-center">
                <p className="text-slate-400">Loading latest news...</p>
             </div>
          )}
        </div>
      </SectionContainer>
      
      {/* Search / Archive Banner */}
      <div className="bg-slate-50">
        <SectionContainer className="py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-[40px] bg-white shadow-sm border border-slate-200/50">
             <div className="max-w-md">
                <h3 className="text-2xl font-bold mb-2">Looking for a specific update?</h3>
                <p className="text-sm text-slate-500">Search through our archives for past announcements, tender results, and environmental reports.</p>
             </div>
             <div className="flex w-full md:w-auto gap-3">
                <button className="flex-1 md:flex-none px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold transition-transform hover:scale-105">
                  Archives
                </button>
             </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
