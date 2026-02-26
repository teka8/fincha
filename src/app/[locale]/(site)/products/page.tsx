import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideBox, LucideDroplets, LucideFlame, LucideArrowRight, LucideIcon } from "lucide-react";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import { getProducts } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type ProductsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("navigation.products"),
    description: "Explore our range of high-quality sugar, ethanol, and agro-industrial by-products.",
  };
}

const productTypeIcons: Record<string, LucideIcon> = {
  sugar: LucideBox,
  ethanol: LucideDroplets,
  energy: LucideFlame,
  molasses: LucideDroplets,
};

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const productsRes = await getProducts(locale);
  const products = productsRes.data;

  return (
    <div className="flex flex-col">
      {/* Products Hero */}
      <section className="relative py-24 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50/30 opacity-60" />
        <div className="relative max-w-layout mx-auto px-8">
           <SectionHeading 
              eyebrow="Our Products" 
              title="Sweetening Progress, Powering Industry" 
              description="From premium refined sugar to renewable energy, Fincha's integrated output supports households and industries across the nation."
              align="left"
           />
        </div>
      </section>

      {/* Products Grid */}
      <SectionContainer className="bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? products.map((product) => {
            const Icon = productTypeIcons[product.category?.slug ?? "sugar"] ?? LucideBox;
            return (
              <div 
                key={product.id}
                className="group relative flex flex-col bg-white rounded-[40px] border border-slate-100 p-8 shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute -right-4 -top-4 size-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                
                <div className="relative mb-8 aspect-square rounded-3xl overflow-hidden bg-slate-100">
                  {product.hero_image || product.thumbnail ? (
                    <Image 
                      src={(product.hero_image || product.thumbnail) as string} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary-200">
                       <Icon size={64} strokeWidth={1} />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {product.category?.name ?? "Product"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {product.short_description ?? product.description}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                   <Link 
                      href={{ pathname: "/products/[slug]", params: { slug: product.slug || product.id.toString() } }}
                      className="inline-flex items-center gap-2 font-bold text-primary group/link"
                    >
                      {t("actions.learn_more")}
                      <LucideArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                   </Link>
                </div>
              </div>
            );
          }) : (
            // Fallback product cards if none from API
            [
              { title: "White Refined Sugar", type: "sugar", desc: "Premium grade sugar produced for industrial and wholesale markets." },
              { title: "Retail Crystal Sugar", type: "sugar", desc: "Available in 5kg and 2kg packs for household consumption." },
              { title: "Ethanol (Fuel Grade)", type: "ethanol", desc: "99.5% pure ethanol distilled from high-quality molasses." },
              { title: "Cane Molasses", type: "molasses", desc: "Rich in nutrients, ideal for cattle feed and industrial fermentation." },
              { title: "Bagasse Bales", type: "energy", desc: "Pressed cane fiber used as carbon-neutral biofuel for industrial boilers." }
            ].map((p, i) => (
              <div key={i} className="group relative flex flex-col bg-white rounded-[40px] border border-slate-100 p-8 shadow-card transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden opacity-80">
                <div className="relative mb-8 aspect-square bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                   <LucideBox size={64} strokeWidth={1} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{p.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-8">{p.desc}</p>
                <div className="mt-auto inline-block font-bold text-primary opacity-50">Coming Soon</div>
              </div>
            ))
          )}
        </div>
      </SectionContainer>
      
      {/* Commitment Section */}
      <div className="bg-primary-900 text-white">
        <SectionContainer>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div>
                <SectionHeading 
                  eyebrow="Quality Control" 
                  title="International Standards, Local Excellence" 
                  description="Our laboratory uses state-of-the-art testing to ensure every kilo of sugar and every liter of ethanol meets global purity specifications."
                  align="left"
                  className="!text-white"
                />
                <ul className="mt-12 space-y-4">
                  {[
                    "ISO 9001:2015 Certified Management",
                    "Advanced ICUMSA testing protocols",
                    "Automated packaging for shelf-life stability",
                    "Continuous process monitoring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-primary-100/80">
                      <div className="size-2 rounded-full bg-accent shadow-glow-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="relative rounded-[40px] overflow-hidden aspect-video bg-white/10 backdrop-blur-sm border border-white/5 flex items-center justify-center">
                <span className="text-accent text-3xl font-black italic tracking-widest">CERTIFIED QUALITY</span>
             </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
