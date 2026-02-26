import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
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
    ],
  },
};

export default withNextIntl(nextConfig);
