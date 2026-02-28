import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [40, 50, 60, 70, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fincha-backend.test",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.finchasugar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "fincha.tewostechsolutions.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.tewostechsolutions.com",
        pathname: "**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
