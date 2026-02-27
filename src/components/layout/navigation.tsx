"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { LucideDownload, LucideHelpCircle, LucideImage, LucideQrCode } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import type { LocalizedRoute } from "@/i18n/routing";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocaleContext } from "@/providers/providers";
import type { NavigationLink as NavigationLinkType } from "@/types/cms";

type NavigationProps = {
  locale: string;
  links?: Array<NavigationLinkType | StaticNavEntry>;
  brandName?: string;
};

type StaticNavLinkKey =
  | "home"
  | "about"
  | "products"
  | "news"
  | "projects"
  | "csr"
  | "more"
  | "careers"
  | "tenders"
  | "downloads"
  | "contact";

type StaticNavEntry = {
  href: string;
  key: StaticNavLinkKey;
  label?: string;
};

type NavChild = {
  href: string;
  key: string;
  label: string;
  description?: string;
  Icon?: React.ComponentType<{ size?: number; className?: string }>;
};

type NavItem = {
  href?: string;
  key: string;
  label: string;
  isMega?: boolean;
  children?: NavChild[];
};

const navigationStructure: NavItem[] = [
  { href: "/", key: "home", label: "Home" },
  {
    key: "company",
    label: "Company",
    children: [
      { href: "/about", key: "about", label: "About Us" },
      { href: "/csr", key: "csr", label: "Sustainability" },
      { href: "/careers", key: "careers", label: "Careers" },
    ],
  },

  {
    key: "operations",
    label: "Operations",
    children: [
      { href: "/products", key: "products", label: "Products" },
      { href: "/projects", key: "projects", label: "Strategic Projects" },
      { href: "/tenders", key: "tenders", label: "Tender Notices" },
    ],
  },
  {
    key: "latest",
    label: "Latest News",
    children: [
      { href: "/announcement", key: "announcement", label: "Announcement" },
      { href: "/event", key: "event", label: "Events" },
      { href: "/news", key: "news", label: "News" },
    ],
  },
  {
    key: "media",
    label: "Resources",
    isMega: true,
    children: [
      {
        href: "/media",
        key: "media",
        label: "Media Gallery",
        description: "Browse photos, videos & audio showcasing our operations.",
        Icon: LucideImage,
      },
      {
        href: "/downloads",
        key: "downloads",
        label: "Download Center",
        description: "Annual reports, policies, and official documents.",
        Icon: LucideDownload,
      },
      {
        href: "/faq",
        key: "faq",
        label: "FAQ",
        description: "Quick answers to common questions about Fincha.",
        Icon: LucideHelpCircle,
      },
      {
        href: "/qr-checker",
        key: "qr-checker",
        label: "QR Code Checker",
        description: "Verify the authenticity of any Fincha product.",
        Icon: LucideQrCode,
      },
    ],
  },
  { href: "/contact", key: "contact", label: "Contact" },
];

export function Navigation({ brandName }: NavigationProps) {
  const pathname = usePathname();
  const { locale: contextLocale } = useLocaleContext();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("common.navigation");
  const tActions = useTranslations("common.actions");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const closeMenu = useCallback(() => setIsMobileOpen(false), []);

  const router = useRouter();

  const handleNavigate = useCallback(
    (href: string) => {
      closeMenu();
      router.push(href as LocalizedRoute);
    },
    [closeMenu, router],
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const timeout = setTimeout(() => closeMenu(), 0);
    return () => clearTimeout(timeout);
  }, [pathname, closeMenu, isMobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const animation = prefersReducedMotion
    ? {}
    : {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
    };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled
        ? "border-b border-white/10 bg-white/70 shadow-lg shadow-primary/5 backdrop-blur-xl"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-layout items-center justify-between gap-4 px-8 sm:px-12 lg:px-16 xl:px-20">
        <motion.div {...animation} className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2 text-xl font-bold tracking-tight transition-all hover:scale-[1.02]"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-400 text-sm font-black text-white shadow-glow-sm">
              F
            </span>
            <span className="gradient-text">{brandName ?? tCommon("brand")}</span>
          </Link>
          <nav className="hidden items-center gap-2 lg:flex">
            {navigationStructure.map((item) => {
              if (item.children) {
                const isActive = item.children.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`));
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive || activeDropdown === item.key
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                        }`}
                    >
                      {tNav(item.key as StaticNavLinkKey)}
                      <motion.span
                        animate={{ rotate: activeDropdown === item.key ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-56 origin-top-left rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl"
                        >
                          <div className="space-y-1">
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href || pathname.startsWith(`${child.href}/`);
                              return (
                                <Link
                                  key={child.key}
                                  href={child.href as LocalizedRoute}
                                  className={`block rounded-2xl px-4 py-2.5 text-sm font-medium transition-all ${isChildActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                                    }`}
                                >
                                  {child.label ?? tNav(child.key as StaticNavLinkKey)}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href!));
              return (
                <Link
                  key={item.key}
                  href={item.href as LocalizedRoute}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-primary/5 hover:text-primary"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tNav(item.key as StaticNavLinkKey)}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>

        <motion.div {...animation} className="flex items-center gap-3">
          <LanguageSwitcher currentLocale={contextLocale} />
          {/* <Button asChild className="hidden shadow-glow-sm md:inline-flex">
            <Link href="/contact">{tActions("learn_more")}</Link>
          </Button> */}
          <button
            type="button"
            className="relative inline-flex items-center rounded-xl p-2.5 text-slate-700 transition-all hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 lg:hidden"
            onClick={() => setIsMobileOpen((state) => !state)}
            aria-expanded={isMobileOpen}
            aria-label={
              isMobileOpen
                ? tCommon("actions.close_menu")
                : tCommon("actions.open_menu")
            }
          >
            {isMobileOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-20 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />
            <motion.nav
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-x-0 top-20 z-50 overflow-hidden border-t border-white/20 bg-white/95 backdrop-blur-xl lg:hidden"
            >
              <div className="space-y-1 p-4">
                {navigationStructure.map((item) => {
                  if (item.children) {
                    const isOpen = activeDropdown === item.key;
                    return (
                      <div key={item.key} className="space-y-1">
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(isOpen ? null : item.key)}
                          className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-all ${isOpen ? "text-primary" : "text-slate-900"
                            }`}
                        >
                          {item.label}
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-slate-50/50 rounded-2xl pl-4"
                            >
                              {item.children.map((child) => (
                                <button
                                  key={child.key}
                                  type="button"
                                  onClick={() => handleNavigate(child.href)}
                                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm font-medium ${pathname === child.href ? "text-primary bg-primary/5" : "text-slate-600"
                                    }`}
                                >
                                  {child.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleNavigate(item.href!)}
                      className={`block w-full rounded-2xl px-4 py-3.5 text-left text-base font-bold transition-all ${pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-slate-900 hover:bg-primary/5 hover:text-primary"
                        }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                {/* <div className="pt-2">
                  <Button asChild className="w-full justify-center shadow-glow-sm">
                    <Link href="/contact" onClick={closeMenu}>{tActions("learn_more")}</Link>
                  </Button>
                </div> */}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
