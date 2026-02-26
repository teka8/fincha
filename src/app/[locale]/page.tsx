import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Hero } from "@features/home/hero";
import { Highlights } from "@features/home/highlights";
import { ProductShowcase } from "@features/home/product-showcase";
import { ProjectsCarousel } from "@features/home/projects-carousel";
import { CSRSpotlight } from "@features/home/csr-spotlight";
import { OperationalMetrics } from "@features/home/operational-metrics";
import { LatestNews } from "@features/home/latest-news";
import { MediaGallery } from "@features/home/media-gallery";
import { PartnersMarquee } from "@features/home/partners-marquee";
import { InnovationShowcase } from "@features/home/innovation-showcase";
import { FAQsPreview } from "@features/home/faqs-preview";
import { NewsletterBanner } from "@features/home/newsletter-banner";
import { ContactBanner } from "@features/home/contact-banner";
import { HistoricalTimeline } from "@features/home/historical-timeline";
import { DistributionMap } from "@features/home/distribution-map";
import { TestimonialsSlider } from "@features/home/testimonials-slider";
import { CertificationsBanner } from "@features/home/certifications-banner";
import { VideoFeaturette } from "@features/home/video-featurette";
import { WhoWeAre } from "@features/home/who-we-are";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        am: "/am",
      },
    },
  } satisfies Metadata;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <main className="flex min-h-screen flex-col">
      <Hero title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <WhoWeAre />

      <section className="relative border-b border-primary/5 bg-[#eeeeee]">
        <Highlights
          title={t("highlights.title")}
          description={t("highlights.description")}
          items={[t("highlights.product"), t("highlights.community"), t("highlights.sustainability")]}
        />
      </section>

      <HistoricalTimeline />

      <section className="relative border-b border-slate-100 bg-[#eeeeee]">
        <ProductShowcase />
      </section>

      <section className="relative bg-white">
        <ProjectsCarousel />
      </section>

      <section className="relative border-y border-primary/5 bg-[#eeeeee]">
        <CSRSpotlight
          title={t("csr.title")}
          description={t("csr.description")}
          focusTitle={t("csr.focus.title", { default: t("csr.title") })}
          focusDescription={t("csr.focus.description", { default: t("csr.description") })}
          impactTitle={t("csr.impact.title", { default: t("csr.title") })}
          impactDescription={t("csr.impact.description", { default: t("csr.description") })}
        />
      </section>

      <OperationalMetrics
        eyebrow={t("metrics.eyebrow")}
        title={t("metrics.title")}
        description={t("metrics.description")}
        locale={locale}
        metrics={[
          {
            label: t("metrics.sugar"),
            value: 270,
            suffix: " K",
            description: t("metrics.sugar_desc"),
          },
          {
            label: t("metrics.ethanol"),
            value: 20,
            suffix: " M",
            description: t("metrics.ethanol_desc"),
          },
          {
            label: t("metrics.energy"),
            value: 31,
            suffix: " MW",
            description: t("metrics.energy_desc"),
          },
          {
            label: t("metrics.jobs"),
            value: 10000,
            description: t("metrics.jobs_desc"),
          },
        ]}
      />

      <VideoFeaturette />

      <section className="relative bg-white">
        <LatestNews />
      </section>

      <DistributionMap />

      <section className="relative border-y border-slate-100 bg-slate-50/30">
        <MediaGallery />
      </section>

      <section className="relative bg-white">
        <PartnersMarquee
          eyebrow={t("partners.eyebrow")}
          title={t("partners.title")}
          description={t("partners.description")}
        />
      </section>

      <section className="relative border-y border-primary/5 bg-primary-50/15">
        <InnovationShowcase
          eyebrow={t("innovation.eyebrow")}
          title={t("innovation.title")}
          description={t("innovation.description")}
          pillLabel={t("innovation.pill")}
          learnMoreLabel={tCommon("actions.learn_more")}
          items={[
            {
              title: t("innovation.smart_irrigation"),
              description: t("innovation.smart_irrigation_desc"),
              link: "/projects",
            },
            {
              title: t("innovation.green_energy"),
              description: t("innovation.green_energy_desc"),
              link: "/csr",
            },
            {
              title: t("innovation.digital_transformation"),
              description: t("innovation.digital_transformation_desc"),
              link: "/news",
            },
          ]}
        />
      </section>

      <TestimonialsSlider />

      <section className="relative bg-white pb-10">
        <FAQsPreview />
      </section>

      <CertificationsBanner />
      <NewsletterBanner />
      <ContactBanner />
    </main>
  );
}
