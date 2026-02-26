

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideArrowRight, LucideTrendingUp, LucideCalendar, LucideArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LocalizedRoute } from "@/i18n/routing";
import type { NewsPreview } from "@/features/home/hooks";
import { useLatestNews } from "@/features/home/hooks";
import { useLocaleContext } from "@/providers/providers";
import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { Link } from "@/i18n/routing";

type NewsItem = NewsPreview & { 
  summary?: string; 
  link?: string; 
  image?: string;
  category?: string;
};

export function LatestNews() {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("news.title");
  const description = t("news.description");
  const { data: latestNews } = useLatestNews();

  
  const fallbackItems: NewsItem[] = [

    {
      title: "Fincha scales ethanol production to support clean fuels",
      summary: "New distillation upgrades improve efficiency and reduce emissions across the campus.",
      link: "/news",
      slug: "fincha-ethanol-upgrade",
      excerpt: "New distillation upgrades improve efficiency and reduce emissions across the campus.",
      created_at: "2026-02-01",
      image: "/images/hero-factory.jpg",
      category: "Sustainability",
    },
    {
      title: "Community outgrower program expands irrigated hectares",
      summary: "Smallholder farmers gain access to agronomy training and guaranteed offtake agreements.",
      link: "/news",
      slug: "community-outgrower-expansion",
      excerpt: "Smallholder farmers gain access to agronomy training and guaranteed offtake agreements.",
      created_at: "2026-01-18",
      image: "/images/4.jpg",
      category: "Community",
    },
    {
      title: "Fincha inaugurates vocational training center",
      summary: "Technical apprenticeships prepare youth for skilled roles in agro-industrial operations.",
      link: "/news",
      slug: "vocational-training-center",
      excerpt: "Technical apprenticeships prepare youth for skilled roles in agro-industrial operations.",
      created_at: "2026-01-05",
      image: "/images/5.jpg",
      category: "Education",
    },
  ];

  
  const items: NewsItem[] =
    Array.isArray(latestNews) && latestNews.length > 0 ? latestNews : fallbackItems;

  const featured = items[0];
  const secondary = items.slice(1, 3);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const categories = ["Sustainability", "Community", "Education", "Innovation"];
  const categoryColors: Record<string, string> = {
    Sustainability: "from-green-500 to-emerald-600",
    Community: "from-primary to-primary-600",
    Education: "from-amber-500 to-orange-600",
    Innovation: "from-purple-500 to-violet-600",

  };

  return (
    <SectionContainer className="bg-transparent">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-10">
          <SectionHeading eyebrow="Latest Updates" title={title} description={description} />
          <Link href={"/news" as LocalizedRoute} className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/25">
            View all news
            <LucideArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured Article */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 group relative overflow-hidden rounded-3xl bg-slate-900 cursor-pointer shadow-2xl"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/70 via-primary-800/50 to-slate-900/95 z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                style={{ backgroundImage: `url('${featured.image || '/images/hero-factory.jpg'}')` }}
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />

            <div className="relative z-20 flex flex-col justify-end h-full min-h-[480px] p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-5">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[featured.category || 'Sustainability'] || 'bg-primary'}`}>
                  {featured.category || "News"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 bg-accent">
                  <LucideTrendingUp size={12} />
                  Featured
                </span>
              </div>

              <div className="flex items-center gap-4 mb-5 text-sm text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <LucideCalendar size={14} />
                  {featured.created_at ? formatDate(featured.created_at) : ""}
                </span>
              </div>
              
              <h3 className="text-2xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-accent transition-colors">
                {featured.title}
              </h3>
              
              <p className="text-slate-300 text-base lg:text-lg max-w-2xl mb-8 line-clamp-3">
                {featured.excerpt || featured.summary}
              </p>

              
              <Link 
                href={(featured.slug ? `/news/${featured.slug}` : featured.link ?? "/news") as LocalizedRoute}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-accent hover:gap-3 shadow-lg"

              >
                Read More
                <LucideArrowRight size={14} />
              </Link>

            </div>
          </motion.div>

          {/* Secondary Articles - Small List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {secondary.map((article, index) => {
              const articleImage = article.image || (index === 0 ? "/images/4.jpg" : "/images/5.jpg");
              return (
                <motion.article
                  key={article.slug ?? article.title}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="group flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer"
                >
                  <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-md">
                    <div 
                      className="w-full h-full bg-cover bg-center group-hover:scale-125 transition-transform duration-700"
                      style={{ backgroundImage: `url('${articleImage}')` }}
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold text-white w-fit bg-gradient-to-r ${categoryColors[article.category || categories[index + 1]] || 'bg-primary'}`}>
                      {article.category || categories[index + 1]}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 mt-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                      {article.created_at ? formatDate(article.created_at) : ""}
                      <LucideArrowUpRight size={10} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}