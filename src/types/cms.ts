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

export type Announcement = {
  id: number;
  title: string;
  slug: string;
  content: string;
  description?: string;
  excerpt?: string;
  featured_image?: string;
  image?: string;
  created_at: string;
  status?: string;
  category?: string;
  external_link?: string;
  terms?: Array<{ name: string; taxonomy: string }>;
  attachments?: Array<{ path?: string; file_name?: string }>;
};

export type Leader = {
  id: number;
  name: string;
  title: string;
  bio?: string;
  avatar?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    telegram?: string;
  };
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type MediaItem = {
  id: number;
  title: string;
  type: "image" | "video" | "audio";
  thumbnail?: string;
  url: string;
  thumb_url?: string;
  src?: string;
  created_at?: string;
};

export type TenderDocument = {
  id: number;
  title: string;
  file_url: string;
  file_size?: number;
  file_extension?: string;
};

export type TenderAward = {
  awarded_company_name?: string;
  contract_value?: number;
  award_date?: string;
  award_document_url?: string;
};

export type Tender = {
  id: number;
  title: string;
  reference_number?: string;
  status?: string;
  tender_type?: string;
  visibility?: string;
  description: string;
  requirements?: string;
  submission_guidelines?: string;
  submission_method?: string;
  published_at?: string;
  deadline?: string;
  deadline_at?: string;
  documents?: TenderDocument[];
  award?: TenderAward | null;
  participating_companies?: string[];
};

export type TenderGuideline = {
  content?: string;
  steps?: string[];
  pdf_url?: string;
  pdf_name?: string;
};

export type Job = {
  id: number;
  title: string;
  department?: string;
  type?: string;
  content?: string;
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
