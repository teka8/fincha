"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { LucideBox, LucideDroplets, LucideFlame } from "lucide-react";
import { useTranslations } from "next-intl";

import { SectionContainer, SectionHeading } from "@/components/ui/section-heading";
import type { LocalizedRoute } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useLocaleContext } from "@/providers/providers";
import type { Product } from "@/types/cms";

const productIcons = [LucideBox, LucideDroplets, LucideFlame];
const productColors = [
  { bg: "from-primary/5 to-primary-100/30", icon: "from-primary to-primary-400", border: "border-primary/10" },
  { bg: "from-accent/5 to-accent-100/30", icon: "from-accent to-accent-400", border: "border-accent/10" },
  { bg: "from-primary-50 to-primary-100/50", icon: "from-primary-400 to-primary-600", border: "border-primary-200/30" },
];

type ProductShowcaseProps = {
  products?: Product[];
};

export function ProductShowcase({ products: serverProducts }: ProductShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const t = useTranslations("home");
  const title = t("products.title");
  const description = t("products.description");
  const { locale } = useLocaleContext();

  const fallbackItems = [
    {
      id: "1",
      title: "Premium white sugar (50kg)",
      slug: "premium-white-sugar-50kg",
      description: "Refined crystals packaged for wholesale and institutional buyers.",
      image: "/images/Premium white sugar (50kg)1.jpg",
    },
    {
      id: "2",
      title: "Retail crystal sugar (5kg)",
      slug: "retail-crystal-sugar-5kg",
      description: "Household-friendly packs sourced directly from Ethiopian cane fields.",
      image: "/images/Retail crystal sugar (5kg).jpg",
    },
    {
      id: "3",
      title: "Industrial molasses supply",
      slug: "industrial-molasses-supply",
      description: "Reliable feedstock volumes tailored for ethanol and feed processors.",
      image: "/images/Industrial molasses supply.jpg",
    },
  ];

  const items = serverProducts && serverProducts.length > 0
    ? serverProducts.slice(0, 3).map((p) => ({
        id: String(p.id),
        title: p.name || "",
        slug: p.slug || "",
        description: p.short_description || p.description || "",
        image: p.hero_image || p.thumbnail || "",
      }))
    : fallbackItems;

  return (
    <SectionContainer className="relative overflow-hidden bg-transparent">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 size-60 rounded-full bg-accent/5 blur-3xl" />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
        <SectionHeading eyebrow={t("products.cta")} title={title} description={description} />
        <Link
          href="/products"
          locale={locale as "en" | "am"}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-5 py-2.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 shrink-0"
        >
          View All Products
          <span aria-hidden>→</span>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((product, index) => {
          const Icon = productIcons[index] ?? LucideBox;
          const colors = productColors[index] ?? productColors[0];
          return (
            <motion.div
              key={product.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`hover-lift group relative overflow-hidden rounded-3xl ${colors.border} border bg-gradient-to-br ${colors.bg} p-8 shadow-card`}
            >
              {/* Animated gradient strip at top */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ animation: "gradient-rotate 3s ease infinite" }} />

              {/* Product image */}
              <div className="mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-white/50">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className={`rounded-2xl bg-gradient-to-br ${colors.icon} p-4 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                )}
              </div>

              <p className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors">{product.title}</p>
              {product.description && (
                <p className="mt-3 text-sm text-muted/80 leading-relaxed line-clamp-3">{product.description}</p>
              )}
              <Link
                href={(product.slug ? `/products/${product.slug}` : "/products") as LocalizedRoute}
                locale={locale as "en" | "am"}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2"
              >
                View Detail
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
