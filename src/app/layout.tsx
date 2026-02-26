import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://finchasugar.com"),
  title: {
    default: "Fincha Sugar Factory",
    template: "%s | Fincha Sugar Factory",
  },
  description:
    "Fincha Sugar Factory public website showcasing products, projects, news, CSR initiatives, careers, and resources.",
  applicationName: "Fincha Sugar Factory",
  keywords: [
    "Fincha Sugar Factory",
    "Fincha",
    "Sugar",
    "Ethiopia",
    "Manufacturing",
    "Agro-industrial",
    "CSR",
  ],
  authors: [{ name: "Fincha Sugar Factory" }],
  openGraph: {
    title: "Fincha Sugar Factory",
    description:
      "Explore Fincha Sugar Factory’s products, projects, CSR programs, tenders, and career opportunities.",
    url: "https://finchasugar.com",
    siteName: "Fincha Sugar Factory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fincha Sugar Factory",
    description:
      "Explore Fincha Sugar Factory’s products, projects, CSR programs, tenders, and career opportunities.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-surface text-foreground antialiased selection:bg-primary/20 selection:text-primary-900">
        {children}
      </body>
    </html>
  );
}
