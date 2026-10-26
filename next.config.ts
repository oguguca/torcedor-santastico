import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Qualidades usadas nos <Image> da landing (fundos desfocados pedem menos)
    qualities: [50, 60, 70, 75],
    // Escudos dos times, servidos pelo CDN do 365Scores (fonte da API Santos).
    remotePatterns: [{ protocol: "https", hostname: "imagecache.365scores.com", pathname: "/image/upload/**" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
