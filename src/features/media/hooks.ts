import { useQuery } from "@tanstack/react-query";

import { useLocaleContext } from "@/providers/providers";
import type { MediaItem } from "@/types/cms";

async function fetchMedia(locale: string, limit: number) {
  const response = await fetch(`/api/media?locale=${locale}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to load media");
  }
  const { data } = (await response.json()) as { data: MediaItem[] };
  return data;
}

export function useMediaGallery(limit = 8) {
  const { locale } = useLocaleContext();

  return useQuery<MediaItem[]>({
    queryKey: ["media", "gallery", locale, limit],
    queryFn: () => fetchMedia(locale, limit),
    staleTime: 1000 * 60 * 5,
  });
}
