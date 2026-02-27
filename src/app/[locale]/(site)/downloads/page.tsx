import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideFileText, LucideDownload, LucideSearch, LucideFileArchive, LucideChevronRight } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getResources, getDownloadCategories } from "@/lib/cms";

type DownloadsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: DownloadsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.downloads"),
    description: "Access official documents, reports, and media assets in our centralized download center.",
  };
}

export default async function DownloadsPage({ params }: DownloadsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const resourcesRes = await getResources(locale);
  const categories = await getDownloadCategories(locale);
  const resources = resourcesRes.data;

  return (
    <div className="flex flex-col">
      {/* Downloads Hero */}
      <section className="bg-slate-50 dark:bg-slate-900/50 pt-32 pb-16">
        <div className="max-w-layout mx-auto px-8">
          <SectionHeading
            eyebrow="Download Center"
            title="Resources & Documents"
            description="A centralized hub for all public records, policy documents, and corporate media kits."
            align="left"
          />
        </div>
      </section>

      {/* Categories & Search */}
      <SectionContainer className="pt-0">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar Filter */}
          <div className="lg:col-span-1 space-y-10">
            <div className="relative">
              <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Filter by name..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-4 focus:ring-primary/10 dark:text-white transition-all outline-none"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Categories</h4>
              <div className="flex flex-col gap-1">
                <button className="flex items-center justify-between px-4 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-glow-sm">
                  All Documents
                  <LucideChevronRight size={16} />
                </button>
                {categories.length > 0 ? categories.map((cat) => (
                  <button key={cat.id} className="flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-colors text-left">
                    {cat.name}
                    <LucideChevronRight size={16} className="opacity-0 group-hover:opacity-100" />
                  </button>
                )) : (
                  <div className="space-y-2 mt-4">
                    {["Annual Reports", "CSR Policies", "Media Kit", "Tender Forms"].map((c, i) => (
                      <button key={i} className="flex items-center justify-between px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-colors text-left w-full">
                        {c}
                        <LucideChevronRight size={16} className="text-slate-200 dark:text-slate-700" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-6">
              {resources.length > 0 ? resources.map((res) => (
                <div key={res.id} className="group p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[32px] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="size-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                      <LucideFileText size={28} />
                    </div>
                    <a
                      href={res.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="size-10 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-500 flex items-center justify-center hover:bg-slate-900 dark:hover:bg-primary hover:text-white transition-all"
                    >
                      <LucideDownload size={18} />
                    </a>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-4">
                    {res.size ?? '2.4 MB'} • {res.format ?? 'PDF'}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {res.description ?? "Download the official document for reference and offline review."}
                  </p>
                </div>
              )) : (
                // Display some mock files
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="group p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[32px] opacity-60">
                    <div className="size-14 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-6" />
                    <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                    <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                  </div>
                ))
              )}
            </div>

            <div className="mt-16 p-10 rounded-[40px] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-10">
              <div className="size-20 rounded-[30px] bg-white/10 flex items-center justify-center text-primary shrink-0">
                <LucideFileArchive size={32} />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-xl font-bold mb-2">Request Custom Records?</h4>
                <p className="text-primary-100/60 text-sm leading-relaxed">Can&apos;t find what you&apos;re looking for? Registered researchers and partners can request archival records directly.</p>
              </div>
              <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-glow transition-transform hover:scale-105">
                Contact Archive
              </button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
