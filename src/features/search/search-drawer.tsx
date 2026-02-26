import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

export function SearchDrawer() {
  return (
    <SectionContainer className="bg-white">
      <SectionHeading
        eyebrow="Search"
        title="Find products and updates"
        description="Search across products, projects, and news."
        align="center"
      />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search the site"
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          type="button"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Search
        </button>
      </div>
    </SectionContainer>
  );
}
