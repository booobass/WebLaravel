import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: '/storage/images/**'
      },
      {
        protocol: "https",
        hostname: "weblaravel-production-30a4.up.railway.app",
        pathname: "/storage/images/**",
      }
    ]
  }
};

export default nextConfig;
