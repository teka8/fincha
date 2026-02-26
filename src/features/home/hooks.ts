import { useQuery } from "@tanstack/react-query";

import { useLocaleContext } from "@/providers/providers";
import type { Post, Product, ProjectSummary } from "@/types/cms";

export type NewsPreview = Pick<Post, "id" | "title" | "slug" | "excerpt" | "created_at" | "image" | "featured_image" | "category" | "summary">;

export function useLatestNews(limit = 3) {
  const { locale } = useLocaleContext();

  return useQuery<NewsPreview[]>({
    queryKey: ["home", "latest-news", locale, limit],
    queryFn: async () => {
      const response = await fetch(`/api/news?locale=${locale}&per_page=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to load news");
      }
      const json = (await response.json()) as { data?: Post[] } | Post[];
      const posts: Post[] = Array.isArray(json)
        ? json
        : Array.isArray((json as { data?: Post[] }).data)
          ? (json as { data: Post[] }).data
          : [];

      return posts.map((post) => ({
        id: post.id,
        title: String(post.title || ""),
        slug: String(post.slug || ""),
        excerpt: post.excerpt,
        summary: post.summary,
        created_at: post.created_at,
        image: post.image,
        featured_image: post.featured_image,
        category: post.category,
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
