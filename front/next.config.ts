import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: '/**'
      },
      // {
      //   protocol: "https",
      //   hostname: "weblaravel-production-30a4.up.railway.app",
      //   pathname: "/**",
      // }
      {
        protocol: 'https',
        hostname: 'web-laravel-bucket.s3.ap-northeast-1.amazonaws.com',
        pathname: '/**',
      },
    ]
  }
};

export default nextConfig;
