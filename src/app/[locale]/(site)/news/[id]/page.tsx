import type { Metadata } from "next";
import { getPostById } from "@/lib/cms";
import { NewsDetailView } from "@/features/news/news-detail-view";

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
      title: post?.title ? `${post.title} | Fincha News` : "News Detail",
      description: post?.excerpt ?? post?.summary,
   };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
   const { id } = await params;

   return (
      <div className="bg-surface min-h-screen">
         <NewsDetailView id={id} />
      </div>
   );
}
