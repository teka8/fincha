import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideVideo, LucideImage, LucideFileText, LucideDownload } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/ui/page-hero";
import { getMedia } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type MediaPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: MediaPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.media"),
    description: "Explore photos, videos, and documents showcasing our industrial operations and community engagements.",
  };
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;
  const mediaItems = await getMedia(locale);

  return (
    <div className="flex flex-col">
      <PageHero
        title="Through the Lens"
        subtitle="Visual stories and documentaries capturing the essence of Fincha's industrial journey and social impact."
        image="/images/4.jpg"
        badge="Media Library"
      />

      {/* Gallery Section */}
      <SectionContainer className="bg-white">
        <div className="flex items-center gap-4 mb-12 flex-wrap">
           {["All", "Photos", "Videos", "Documents"].map((filter, i) => (
             <button 
              key={i}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-primary text-white shadow-glow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
             >
               {filter}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaItems.length > 0 ? mediaItems.map((item, i) => (
            <div key={i} className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 shadow-sm">
               {item.thumbnail ? (
                 <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                 />
               ) : (
                 <div className="size-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-300">
                    {item.type === 'video' ? <LucideVideo size={48} /> : <LucideImage size={48} />}
                 </div>
               )}
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
               
               <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-white text-sm font-bold mb-1">{item.title}</p>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                    {item.type === 'video' ? 'Video Feature' : 'Industrial Gallery'}
                  </p>
               </div>
               
               {item.type === 'video' && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-transform group-hover:scale-110">
                    <LucideVideo size={24} fill="currentColor" />
                 </div>
               )}
            </div>
          )) : (
            // Fallback gallery items
            [1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100">
                 <div className="size-full flex items-center justify-center text-slate-200">
                    <LucideImage size={64} strokeWidth={1} />
                 </div>
                 <div className="absolute inset-0 bg-slate-900/5 transition-colors group-hover:bg-slate-900/0" />
              </div>
            ))
          )}
        </div>
      </SectionContainer>
      
      {/* Downloads / Resources Banner */}
      <div className="bg-slate-50">
        <SectionContainer className="py-20">
          <div className="max-w-layout mx-auto grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl font-black mb-6">Annual Reports & <br/><span className="text-primary">Corporate Downloads</span></h2>
                <p className="text-muted leading-relaxed mb-8">Access our latest environmental impact assessments, annual production reports, and official branding guidelines.</p>
                <Link href={{ pathname: "/downloads" }} className="inline-flex items-center gap-3 font-bold text-slate-900 hover:text-primary transition-colors">
                  <LucideDownload size={20} className="text-primary" />
                  Browse download center
                </Link>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "2024 Production Review", size: "4.2 MB" },
                  { name: "Sustainability Charter", size: "1.8 MB" },
                  { name: "Outgrower Guidelines", size: "2.5 MB" },
                  { name: "FSF Brand Assets", size: "15.0 MB" }
                ].map((doc, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
                     <div className="size-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                        <LucideFileText size={20} />
                     </div>
                     <div className="overflow-hidden">
                        <p className="text-sm font-bold truncate">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.size} • PDF</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
