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


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fincha.tewostechsolutions.com/api/v1";


type PaginatedResponse<T> = {
  data: T[];
  meta?: Record<string, unknown> & {
    current_page?: number;
    last_page?: number;
    total?: number;
  };
  links?: Record<string, unknown>;
};

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
    next: { revalidate: init?.next?.revalidate ?? 60 },
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
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
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
    const data = await fetchJson<{ data: Post }>(`/posts/${postType}/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return data.data;
  } catch (error) {
    console.error("Failed to load post", error);
    return null;
  }
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

export async function getMedia(locale: string): Promise<MediaItem[]> {
  try {
    const data = await fetchJson<{ data?: MediaItem[] }>("/media", {
      headers: { "Accept-Language": locale },
    });
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error("Failed to load media", error);
    return [];
  }
}

export async function getProjects(locale: string, params?: URLSearchParams) {
  const query = params && params.size > 0 ? `?${params.toString()}` : "";
  return fetchJson<PaginatedResponse<Record<string, unknown>>>(`/projects${query}`, {
    headers: { "Accept-Language": locale },
  });
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
  try {
    const data = await fetchJson<{ data: Tender }>(`/tenders/${id}`, {
      headers: { "Accept-Language": locale },
    });
    return data.data;
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
