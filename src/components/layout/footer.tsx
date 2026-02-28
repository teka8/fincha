"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  LucideFacebook,
  LucideLinkedin,
  LucideYoutube,
  LucideSend,
  LucideMail,
  LucideMapPin,
  LucidePhone,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
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

type FooterProps = {
  links?: FooterLink[];
  company?: FooterCompany | null;
};

const socialIcons: Record<string, LucideIcon> = {
  facebook: LucideFacebook,
  linkedin: LucideLinkedin,
  youtube: LucideYoutube,
  telegram: LucideSend,
};


export function Footer(props: FooterProps = {}) {
  const { links = [], company = null } = props; 
  const t = useTranslations("common");
  const prefersReducedMotion = useReducedMotion();
const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
 

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://fincha.tewostechsolutions.com/api/v1";
      
      const res = await fetch(`${apiUrl}/subscriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interest }),
      });
      
      console.log("Response status:", res.status);
      
      if (res.ok || res.status === 200 || res.status === 201) {
        setSubscribed(true);
        setEmail("");
        setInterest("");
        setTimeout(() => {
          setSubscribed(false);
        }, 2000);
      } else {
        console.error("Server error:", await res.text());
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  const sectionAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.45, ease: "easeOut" },
      };


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
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
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
        {t("navigation.footer")}      
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

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <LucideFacebook size={18} />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <LucideSend size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-primary hover:border-primary hover:scale-110">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>

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
          <motion.div {...sectionAnimation} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent">
                Newsletter
              </h3>
<p className="text-sm text-slate-400 leading-relaxed">
                Stay updated with our latest industrial insights and procurement alerts.
              </p>
            </div>
            {!mounted ? null : subscribed ? (
              <p className="text-green-400 font-medium">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-500"
                  required
                />
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-500 focus:outline-none focus:border-red-500"
                  required
                >
                  <option value="">Select interest</option>
                  <option value="all">All News</option>
                  <option value="events">Events</option>
                  <option value="announcements">Announcements</option>
                  <option value="newsletter">Newsletter</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
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