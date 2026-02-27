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
<<<<<<< HEAD
   const { locale, id } = await params;
   const post = await getPostById(locale, "news", id);
=======
  const { locale, id } = await params;
  
  let post;
  try {
    post = await getPostById(locale, "news", id);
  } catch {
    post = null;
  }
>>>>>>> 41d8bfce7b06977bd0e03c2a0783425e638d7d1d

   return {
      title: post?.title ? `${post.title} | Fincha News` : "News Detail",
      description: post?.excerpt ?? post?.summary,
   };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
<<<<<<< HEAD
   const { id } = await params;
=======
  const { locale, id } = await params;
  
  let post;
  try {
    post = await getPostById(locale, "news", id);
  } catch {
    post = null;
  }
>>>>>>> 41d8bfce7b06977bd0e03c2a0783425e638d7d1d

   return (
      <div className="bg-surface min-h-screen">
         <NewsDetailView id={id} />
      </div>
   );
}
