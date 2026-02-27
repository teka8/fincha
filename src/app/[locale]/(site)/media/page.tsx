import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/components/ui/page-hero";
import { SectionContainer } from "@/components/ui/section-heading";
import { getMedia } from "@/lib/cms";
import { MediaGallery } from "@/components/media/media-gallery";

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
    description: "Explore photos, videos, and audio media assets showcasing Fincha's industrial operations and community engagements.",
  };
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { locale } = await params;
  const mediaItems = await getMedia(locale);

  // Normalize items from the API into the shape MediaGallery expects
  const normalized = mediaItems.map((item) => ({
    id: String(item.id),
    type: item.type as "image" | "video" | "audio",
    title: item.title,
    src: item.url,
    thumbnail: item.thumbnail ?? (item.type === "image" ? item.url : ""),
  }));

  return (
    <div className="flex flex-col">
      <PageHero
        title="Through the Lens"
        subtitle="Visual stories and documentaries capturing the essence of Fincha's industrial journey and social impact."
        image="/images/4.jpg"
        badge="Media Library"
      />

      <SectionContainer className="bg-white">
        <MediaGallery initialItems={normalized} />
      </SectionContainer>
    </div>
  );
}
