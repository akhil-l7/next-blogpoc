import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/next-blogpoc' : undefined,
  assetPrefix: isProd ? '/next-blogpoc' : undefined,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://ak-blogpoc.vercel.app/',
        permanent: true
      },
      {
        source: '/next-blogpoc',
        destination: 'https://ak-blogpoc.vercel.app/',
        permanent: true
      }
    ]
  },
};

export default nextConfig;
