import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";

type PartnersSectionProps = {
  title: string;
  description: string;
  partners: string[];
};

export function PartnersSection({ title, description, partners }: PartnersSectionProps) {
  return (
    <SectionContainer className="bg-white">
      <SectionHeading title={title} description={description} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner) => (
          <div
            key={partner}
            className="flex items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-700"
          >
            {partner}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
