import "server-only";

import type {
  CompanyInfo,
  Event,
  Faq,
  Job,
  Leader,
  MediaItem,
  NavigationLink,
  Post,
  Product,
  ResourceDocument,
  Tender,
} from "@/types/cms";


// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fincha.tewostechsolutions.com/api/v1";


type PaginatedResponse<T> = {
  data: T[];
  meta?: Record<string, unknown> & {
    current_page?: number;
    last_page?: number;
    total?: number;
  };
  links?: Record<string, unknown>;
};

const DEFAULT_REVALIDATE = 300;

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Accept-Language": init?.headers instanceof Headers
        ? init.headers.get("Accept-Language") ?? "en"
        : typeof init?.headers === "object" && init?.headers !== null
          ? (init.headers as Record<string, string>)["Accept-Language"] ?? "en"
          : "en",
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    next: { revalidate: init?.next?.revalidate ?? DEFAULT_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getNavigation(locale: string): Promise<NavigationLink[]> {
  try {
    const data = await fetchJson<{ pages?: NavigationLink[] }>("/navigation", {
      headers: {
        "Accept-Language": locale,
      },
      next: { revalidate: 3600 },
    });
    return Array.isArray(data.pages) ? data.pages : [];
  } catch (error) {
    console.error("Failed to load navigation", error);
    return [];
  }
}

export async function getFooter(locale: string): Promise<NavigationLink[]> {
  try {
    const data = await fetchJson<{ pages?: NavigationLink[] }>("/footer", {
      headers: {
        "Accept-Language": locale,
      },
      next: { revalidate: 3600 },
    });
    return Array.isArray(data.pages) ? data.pages : [];
  } catch (error) {
    console.error("Failed to load footer", error);
    return [];
  }
}

export async function getCompanyInfo(locale: string): Promise<CompanyInfo | null> {
  try {
    return await fetchJson<CompanyInfo>("/company-info", {
      headers: { "Accept-Language": locale },
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error("Failed to load company info", error);
    return null;
  }
}

export async function getProducts(locale: string, params?: URLSearchParams): Promise<PaginatedResponse<Product>> {
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
  return fetchJson<PaginatedResponse<Product>>(`/products${query}`, {
    headers: { "Accept-Language": locale },
  });
}

export async function getFeaturedProducts(locale: string): Promise<Product[]> {
  try {
    const data = await getProducts(locale, new URLSearchParams({ per_page: "6" }));
    return data.data.slice(0, 6);
  } catch (error) {
    console.error("Failed to load products", error);
    return [];
  }
}

export async function getProductById(locale: string, id: string): Promise<Product | null> {
  try {
    const data = await fetchJson<{ data: Product }>(`/products/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load product", error);
    return null;
  }
}

export async function getPosts(locale: string, postType = "news", params?: URLSearchParams): Promise<PaginatedResponse<Post>> {
  const cleanParams = new URLSearchParams();
  if (params) {
    params.forEach((value, key) => {
      // Skip locale as it's in the headers, and skip empty values
      if (key !== "locale" && value.trim() !== "") {
        cleanParams.append(key, value);
      }
    });
  }

  const query = cleanParams.size > 0 ? `?${cleanParams.toString()}` : "";
  return fetchJson<PaginatedResponse<Post>>(`/posts/${postType}${query}`, {
    headers: { "Accept-Language": locale },
  });
}

export async function getLatestPosts(locale: string, limit = 4): Promise<Post[]> {
  try {
    const posts = await getPosts(locale, "news", new URLSearchParams({ per_page: String(limit) }));
    return posts.data.slice(0, limit);
  } catch (error) {
    console.error("Failed to load posts", error);
    return [];
  }
}

export async function getPostById(locale: string, postType: string, id: string): Promise<Post | null> {
  try {
    const data = await fetchJson<{ data: Post } | Post>(`/posts/${postType}/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return (data as { data: Post }).data ?? (data as Post) ?? null;
  } catch (error) {
    console.error("Failed to load post:", error);
    return null;
  }
}

export async function getAnnouncements(locale: string, params?: URLSearchParams) {
  return getPosts(locale, "announcement", params);
}

export async function getAnnouncementById(locale: string, id: string) {
  return getPostById(locale, "announcement", id);
}

export async function getEvents(locale: string, params?: URLSearchParams): Promise<PaginatedResponse<Event>> {
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
  return fetchJson<PaginatedResponse<Event>>(`/events${query}`, {
    headers: { "Accept-Language": locale },
  });
}

export async function getEventById(locale: string, id: string): Promise<Event | null> {
  try {
    const data = await fetchJson<{ data: Event } | Event>(`/events/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return (data as { data: Event }).data ?? (data as Event) ?? null;
  } catch (error) {
    console.error("Failed to load event", error);
    return null;
  }
}

export async function getLeaders(locale: string): Promise<Leader[]> {
  try {
    const data = await fetchJson<{ data: Leader[] }>("/fincha-leaders", {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load leaders", error);
    return [];
  }
}

export async function getFaqs(locale: string): Promise<Faq[]> {
  try {
    const data = await fetchJson<{ data: Faq[] }>("/faqs", {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load faqs", error);
    return [];
  }
}

const guessTypeFromUrl = (url: string): "image" | "video" | "audio" => {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (!ext) return "image";
  if (["mp4", "webm", "ogg", "mov", "m4v"].includes(ext)) return "video";
  if (["mp3", "wav", "aac", "m4a", "flac"].includes(ext)) return "audio";
  return "image";
};

export async function getMedia(locale: string): Promise<MediaItem[]> {
  try {
    const data = await fetchJson<Record<string, unknown>>("/media", {
      headers: { "Accept-Language": locale },
    });

    // Flat array of media items (old format)
    if (Array.isArray(data)) {
      return (data as MediaItem[]);
    }

    // { data: MediaItem[] } shape
    if (Array.isArray((data as { data?: unknown }).data)) {
      return (data as { data: MediaItem[] }).data;
    }

    // { folders: [{ preview_media: [...] }] } shape from real API
    if (Array.isArray((data as { folders?: unknown }).folders)) {
      const folders = (data as { folders: Array<{ preview_media?: Array<Record<string, unknown>>; media?: Array<Record<string, unknown>> }> }).folders;
      const items: MediaItem[] = [];
      let counter = 1;
      for (const folder of folders) {
        const raw = folder.preview_media ?? folder.media ?? [];
        for (const m of raw) {
          const src = String(m.url ?? m.src ?? m.file_url ?? "");
          if (!src) continue;
          const thumb = String(m.thumb_url ?? m.thumbnail ?? m.preview ?? src);
          const rawType = String(m.type ?? "");
          let type: "image" | "video" | "audio" = "image";
          if (rawType.includes("video")) type = "video";
          else if (rawType.includes("audio")) type = "audio";
          else type = guessTypeFromUrl(src);
          items.push({
            id: Number(m.id ?? counter),
            title: String(m.title ?? m.name ?? m.caption ?? m.original_name ?? `Media ${counter}`),
            type,
            url: src,
            thumbnail: thumb,
            thumb_url: thumb,
            created_at: String(m.created_at ?? ""),
          });
          counter++;
        }
      }
      return items;
    }

    return [];
  } catch (error) {
    console.error("Failed to load media", error);
    return [];
  }
}

export async function getProjects(locale: string, params?: URLSearchParams): Promise<PaginatedResponse<Record<string, unknown>>> {
  try {
    const query = params && params.size > 0 ? `?${params.toString()}` : "";
    return await fetchJson<PaginatedResponse<Record<string, unknown>>>(`/project${query}`, {
      headers: { "Accept-Language": locale },
    });
  } catch (error) {
    console.error("Failed to load projects", error);
    return { data: [] };
  }
}

export async function getProjectById(locale: string, id: string) {
  try {
    const data = await fetchJson<{ data: Record<string, unknown> }>(`/project/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load project", error);
    return null;
  }
}

export async function getTenders(locale: string, params?: URLSearchParams): Promise<PaginatedResponse<Tender>> {
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
  return fetchJson<PaginatedResponse<Tender>>(`/tenders${query}`, {
    headers: { "Accept-Language": locale },
  });
}

export async function getTenderById(locale: string, id: string): Promise<Tender | null> {
  const headers = { "Accept-Language": locale };

  // Prefer the direct endpoint if it exists, but tolerate different response shapes.
  try {
    const data = await fetchJson<{ data?: Tender } | Tender>(`/tenders/${id}`, { headers });
    const tender = (data as { data?: Tender }).data ?? (data as Tender);
    if (tender && typeof tender === "object") {
      return tender;
    }
  } catch {
    // Some API deployments don't expose /tenders/{id}. We'll fallback to list lookup.
  }

  try {
    const list = await getTenders(locale, new URLSearchParams({ per_page: "100" }));
    const tender = list.data?.find((item) => String(item.id) === String(id));
    return tender ?? null;
  } catch (error) {
    console.error("Failed to load tender", error);
    return null;
  }
}

export async function getJobs(locale: string, params?: URLSearchParams): Promise<PaginatedResponse<Job>> {
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
  return fetchJson<PaginatedResponse<Job>>(`/jobs${query}`, {
    headers: { "Accept-Language": locale },
  });
}

export async function getJobById(locale: string, id: string): Promise<Job | null> {
  try {
    const data = await fetchJson<{ data: Job }>(`/jobs/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load job", error);
    return null;
  }
}

export async function getResources(locale: string): Promise<PaginatedResponse<ResourceDocument>> {
  return fetchJson<PaginatedResponse<ResourceDocument>>("/resources", {
    headers: { "Accept-Language": locale },
  });
}

export async function getDownloadCategories(locale: string) {
  try {
    const data = await fetchJson<{ data: Array<{ id: number; name: string }> }>("/resources/categories", {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load resource categories", error);
    return [];
  }
}
