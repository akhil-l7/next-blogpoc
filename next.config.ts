import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/next-blogpoc' : undefined,
  assetPrefix: isProd ? '/next-blogpoc' : undefined,
  trailingSlash: true,
  experimental: {
    viewTransition: true
  }
};

export default nextConfig;
