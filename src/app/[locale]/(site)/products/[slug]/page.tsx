import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LucideCheckCircle2, LucideArrowLeft, LucideInfo } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import { getProductById } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

type ProductDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductById(locale, slug);

  return {
    title: product?.name ?? "Product Detail",
    description: product?.short_description ?? product?.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "common" });
  const product = await getProductById(locale, slug);

  if (!product) {
    return (
      <SectionContainer className="py-48 text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="text-primary font-bold hover:underline">
          Back to products
        </Link>
      </SectionContainer>
    );
  }

  return (
    <div className="flex flex-col">
      <SectionContainer className="pt-32">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors mb-12 group">
          <LucideArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to all products
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="relative aspect-square rounded-[60px] overflow-hidden bg-slate-50 shadow-2xl border border-slate-100">
             {product.hero_image || product.thumbnail ? (
               <Image src={(product.hero_image || product.thumbnail) as string} alt={product.name} fill className="object-cover" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <LucideInfo size={120} strokeWidth={1} />
               </div>
             )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-8">
             <div className="space-y-4">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">
                   {product.category?.name ?? "Featured Product"}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed italic">
                  {product.short_description}
                </p>
             </div>

             <div className="prose prose-slate prose-lg max-w-none text-muted leading-relaxed">
                {product.description?.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
             </div>

             {/* Specifications / Features Table-like */}
             <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Refined to ICUMSA 45 Standard",
                  "Automated weighing & packing",
                  "Available in 50kg, 25kg, 5kg",
                  "ISO 9001:2015 Certified"
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                     <LucideCheckCircle2 size={24} className="text-primary shrink-0" />
                     <span className="text-sm font-bold text-slate-700">{spec}</span>
                  </div>
                ))}
             </div>

             <div className="pt-8 border-t border-slate-100">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-slate-900 text-white font-black text-lg transition-all hover:bg-primary shadow-glow hover:shadow-glow-sm"
                >
                  Order Inquiry
                </Link>
             </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* Additional Detail Section */}
      <div className="bg-slate-50 mt-12">
         <SectionContainer className="py-24">
            <div className="max-w-3xl mx-auto text-center space-y-8">
               <h2 className="text-3xl font-black italic">Sustainable Sourcing</h2>
               <p className="text-muted leading-relaxed">
                 Every grain of {product.name} is produced using climate-smart agriculture and integrated 
                 energy from our co-generation plants. We ensure that our industrial output has a minimal 
                 environmental footprint while providing maximum value to our consumers.
               </p>
            </div>
         </SectionContainer>
      </div>
    </div>
  );
}
