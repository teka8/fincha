import { useQuery } from "@tanstack/react-query";

import { useLocaleContext } from "@/providers/providers";
import type { Post, Product, ProjectSummary } from "@/types/cms";

export type NewsPreview = Pick<Post, "title" | "slug" | "excerpt" | "created_at">;

export function useLatestNews(limit = 3) {
  const { locale } = useLocaleContext();

  return useQuery<NewsPreview[]>({
    queryKey: ["home", "latest-news", locale, limit],
    queryFn: async () => {
      const response = await fetch(`/api/news?locale=${locale}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to load news");
      }
      const posts = (await response.json()) as Post[];
      return posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        created_at: post.created_at,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProducts(limit = 3) {
  const { locale } = useLocaleContext();

  return useQuery<Product[]>({
    queryKey: ["home", "featured-products", locale, limit],
    queryFn: async () => {
      const response = await fetch(`/api/products?locale=${locale}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to load products");
      }
      const products = (await response.json()) as Product[];
      return products.slice(0, limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProjectsPreview(limit = 3) {
  const { locale } = useLocaleContext();

  return useQuery<ProjectSummary[]>({
    queryKey: ["home", "projects", locale, limit],
    queryFn: async () => {
      const response = await fetch(`/api/projects?locale=${locale}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to load projects");
      }
      const { data } = (await response.json()) as { data: ProjectSummary[] };
      return data.slice(0, limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}
