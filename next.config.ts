import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure markdown in /content is bundled into serverless functions on Vercel.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default nextConfig;
