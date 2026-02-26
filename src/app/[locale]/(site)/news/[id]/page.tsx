import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideCalendar, LucideUser, LucideArrowLeft, LucideShare2 } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import { getPostById } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type NewsDetailPageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const post = await getPostById(locale, "news", id);

  return {
    title: post?.title ?? "News Detail",
    description: post?.excerpt ?? post?.summary,
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, id } = await params;
  const post = await getPostById(locale, "news", id);

  if (!post) {
    return (
      <SectionContainer className="py-48 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted mb-8">The article you are looking for does not exist or has been moved.</p>
        <Link href="/news" className="text-primary font-bold hover:underline">
          Back to news
        </Link>
      </SectionContainer>
    );
  }

  return (
    <article className="flex flex-col">
      {/* Article Hero */}
      <section className="relative pt-32 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-8">
           <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-12 group">
             <LucideArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
             Back to news
           </Link>

           <div className="space-y-6 mb-12">
              <div className="flex items-center gap-3">
                 <span className="px-3 py-1 rounded-full bg-accent text-primary-950 text-[10px] font-black uppercase tracking-widest">
                    {post.category?.name ?? "Update"}
                 </span>
                 <span className="text-xs font-bold text-slate-400">
                    {new Date(post.created_at).toLocaleDateString(locale, { dateStyle: 'long' })}
                 </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                {post.title}
              </h1>
              <div className="flex items-center justify-between py-6 border-y border-slate-100">
                 <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                       <LucideUser size={20} />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">FSF Newsroom</p>
                       <p className="text-xs text-slate-400">Official Communication</p>
                    </div>
                 </div>
                 <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors">
                    <LucideShare2 size={18} />
                    Share
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-layout mx-auto px-8">
         <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl bg-slate-100 border border-slate-200">
            {post.image || post.featured_image ? (
               <Image 
                src={(post.image || post.featured_image) as string} 
                alt={post.title} 
                fill 
                className="object-cover"
               />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <LucideCalendar size={120} strokeWidth={1} />
               </div>
            )}
         </div>
      </div>

      {/* Content */}
      <SectionContainer className="bg-white">
         <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-slate prose-lg max-w-none text-muted leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <div className="mt-20 pt-10 border-t border-slate-100">
               <h4 className="text-lg font-bold mb-6">Continue Reading</h4>
               <div className="grid sm:grid-cols-2 gap-8">
                  {/* Mock related posts links */}
                  <Link href="/news" className="group">
                     <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Previous Article</p>
                     <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">Phase 2 Expansion Milestone Reached</p>
                  </Link>
                  <Link href="/news" className="group text-right">
                     <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Next Article</p>
                     <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">Annual Environmental Review 2024</p>
                  </Link>
               </div>
            </div>
         </div>
      </SectionContainer>
    </article>
  );
}
