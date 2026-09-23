import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure markdown in /content is bundled into serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  async redirects() {
    return [{ source: "/tools", destination: "/my-kitchen", permanent: true }];
  },
};

export default nextConfig;
