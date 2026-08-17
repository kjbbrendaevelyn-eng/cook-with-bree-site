import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F3EBDC",
        },
        terracotta: {
          400: "#D4845F",
          500: "#C4704B",
          600: "#A85A38",
          700: "#8B4A2E",
        },
        sage: {
          400: "#8FA68E",
          500: "#6B8F71",
          600: "#567558",
        },
        warm: {
          brown: "#3D2C29",
          muted: "#6B5E5A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
