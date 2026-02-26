export type NavigationLink = {
  id: number;
  title: string;
  slug: string;
  section?: string;
  url: string;
};

export type CompanyInfo = {
  name: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    telegram?: string;
  };
  logo?: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  hero_image?: string;
  thumbnail?: string;
  status: "active" | "inactive";
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  terms?: Array<{
    id: number;
    name: string;
    taxonomy: string;
  }>;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  summary?: string;
  content: string;
  image?: string;
  featured_image?: string;
  created_at: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
};

export type Event = {
  id: number;
  title: string;
  slug?: string;
  description: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  hero_image?: string;
  // Extended fields from the real API
  event_date?: string;
  start_time?: string;
  end_time?: string;
  event_image?: string;
  category?: string;
  status?: string;
  target_audience?: string;
  cost_amount?: string;
  registration_link?: string;
  google_map_location_link?: string;
  attachments?: Array<{ path?: string; file_name?: string }>;
};

export type Leader = {
  id: number;
  name: string;
  title: string;
  bio?: string;
  avatar?: string;
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type MediaItem = {
  id: number;
  title: string;
  type: "image" | "video";
  thumbnail?: string;
  url: string;
  created_at: string;
};

export type Tender = {
  id: number;
  title: string;
  reference_number?: string;
  status?: string;
  description: string;
  deadline: string;
  documents?: Array<{
    id: number;
    title: string;
    file_url: string;
  }>;
};

export type Job = {
  id: number;
  title: string;
  department?: string;
  type?: string;
  description: string;
  location: string;
  closing_date: string;
  created_at?: string;
};

export type ResourceDocument = {
  id: number;
  title: string;
  file_url: string;
  document_type: string;
  size?: string;
  format?: string;
  description?: string;
  publication_date?: string;
  download_count?: number;
};

export type ProjectSummary = {
  id?: number | string;
  title?: string;
  name?: string;
  slug?: string;
  summary?: string;
  description?: string;
  image?: string | null;
  status?: string | null;
};
