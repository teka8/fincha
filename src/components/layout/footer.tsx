"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LucideFacebook, LucideLinkedin, LucideYoutube, LucideSend, LucideMail, LucideMapPin, LucidePhone, LucideArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type FooterLink = {
  id: number;
  label: string;
  href: string;
  section?: string;
};

type FooterCompany = {
  name: string;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  social?: Record<string, string>;
};

const socialIcons: Record<string, typeof LucideFacebook> = {
  facebook: LucideFacebook,
  linkedin: LucideLinkedin,
  youtube: LucideYoutube,
  telegram: LucideSend,
};

type FooterProps = {
  links?: FooterLink[];
  company?: FooterCompany | null;
};

export function Footer({ links = [], company }: FooterProps = {}) {
  const t = useTranslations("common");
  const prefersReducedMotion = useReducedMotion();

  const sectionAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.45, ease: "easeOut" },
      };

  const services = links.filter((link) => link.section === "services");
  const support = links.filter((link) => link.section === "support");

  return (
    <footer
      className="relative mt-20 overflow-hidden bg-[#090909] text-white"
      aria-labelledby="footer-heading"
    >
      {/* Background decorations - Mesh & Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 size-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 size-[500px] rounded-full bg-accent/10 blur-[100px]" />
        
        {/* Subtle mesh/shimmer effect */}
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        
        {/* State of the art dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, black, transparent)"
          }}
        />
      </div>

      <h2 id="footer-heading" className="sr-only">
        {t("navigation.footer", { default: "Footer" })}
      </h2>

      <div className="relative mx-auto w-full max-w-layout px-8 py-24 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid gap-16 lg:grid-cols-[2fr,1fr,1fr,1.5fr]">
          {/* Brand column */}
          <motion.div {...sectionAnimation} className="space-y-8">
            <div className="flex items-center gap-4">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-black text-primary-900 shadow-glow-md">
                F
              </span>
              <p className="text-2xl font-black tracking-tight text-white">
                {company?.name ?? t("brand")}
              </p>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-slate-400">
              {company?.tagline ?? t("tagline")}
            </p>

            {/* Contact info */}
            <div className="space-y-4 pt-4">
              {company?.address && (
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <LucideMapPin size={14} className="text-accent" />
                  </div>
                  <span>{company.address}</span>
                </div>
              )}
              {company?.email && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <LucideMail size={14} className="text-accent" />
                  </div>
                  <Link href={`mailto:${company.email}`} className="text-slate-400 transition hover:text-white">
                    {company.email}
                  </Link>
                </div>
              )}
              {company?.phone && (
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <LucidePhone size={14} className="text-accent" />
                  </div>
                  <Link href={`tel:${company.phone}`} className="text-slate-400 transition hover:text-white">
                    {company.phone}
                  </Link>
                </div>
              )}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 pt-6">
              {Object.entries(company?.social ?? {}).map(([key, url]) => {
                if (!url) return null;
                const Icon = socialIcons[key] ?? LucideSend;
                return (
                  <Link
                    key={key}
                    href={url as string}
                    className="group flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition-all hover:scale-110 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                  >
                    <Icon size={20} className="transition-transform group-hover:rotate-6" />
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Nav column 1 */}
          <motion.div {...sectionAnimation} className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent">
              Explore
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Products", href: "/products" },
                { label: "Latest News", href: "/news" },
                { label: "CSR Programs", href: "/csr" },
                { label: "Strategic Projects", href: "/projects" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 transition-all hover:text-white hover:translate-x-2 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support column */}
          <motion.div {...sectionAnimation} className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent">
              Resources
            </h3>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { label: "Media Gallery", href: "/media" },
                { label: "Careers", href: "/careers" },
                { label: "Tender Notices", href: "/tenders" },
                { label: "Download Center", href: "/downloads" },
                { label: "Help & FAQ", href: "/faq" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 transition-all hover:text-white hover:translate-x-2 inline-block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter column */}
          <motion.div {...sectionAnimation} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent">
                Newsletter
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Stay updated with our latest industrial insights and procurement alerts.
              </p>
            </div>
            
            <form className="flex flex-col gap-4" noValidate>
              <div className="relative">
                <LucideMail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="footer-newsletter"
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-all focus:border-accent/40 focus:bg-white/10 focus:ring-4 focus:ring-accent/10"
                  placeholder="Your email address"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="relative">
                <select
                  name="interest"
                  className="w-full rounded-2xl border border-white/10 bg-transparent py-4 pl-4 pr-4 text-sm text-white outline-none transition-all focus:border-accent/40 focus:bg-white/5 focus:ring-4 focus:ring-accent/10"
                  required
                >
                  <option value="" className="bg-slate-900 text-slate-400">Select your interest</option>
                  <option value="all" className="bg-slate-900 text-white">All News</option>
                  <option value="announcement" className="bg-slate-900 text-white">Announcements</option>
                  <option value="event" className="bg-slate-900 text-white">Events</option>
                  <option value="newsletter" className="bg-slate-900 text-white">Newsletter</option>
                </select>
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-slate-950 transition-all hover:bg-primary hover:text-primary-900 active:scale-[0.98]"
              >
                Join Newsletter
                <LucideArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
              Zero spam. High utility procurement updates.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 bg-slate-950/30">
        <div className="mx-auto flex w-full max-w-layout flex-col md:flex-row items-center justify-between gap-6 p-8 sm:px-12 lg:px-16 xl:px-20">
          <p className="text-xs font-medium text-slate-500">
            © {new Date().getFullYear()} {company?.name ?? t("brand")}. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-slate-500 transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 transition hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
