import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
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
        sunshine: {
          100: "#FFF6D6",
          300: "#FFE07A",
          400: "#FFD23F",
          500: "#F5B700",
        },
        mango: {
          100: "#FFE9D6",
          400: "#FF9F45",
          500: "#F7801E",
          600: "#D9650A",
        },
        hibiscus: {
          100: "#FFE0EC",
          400: "#F2649B",
          500: "#E03E7F",
          600: "#BD2766",
        },
        leaf: {
          100: "#DDF5E3",
          400: "#4CBF6E",
          500: "#2E9E52",
          600: "#237D40",
        },
        plum: {
          100: "#F3E6FA",
          500: "#8E44AD",
          600: "#733690",
        },
        lagoon: {
          100: "#D9F3F4",
          400: "#35B6BF",
          500: "#1C959E",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate))" },
          "50%": { transform: "translateY(-8px) rotate(var(--tw-rotate))" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
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
