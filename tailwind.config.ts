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
          50: "#FFFCF0",
          100: "#FFF7DD",
          200: "#FFEFBF",
          300: "#FDE3A0",
          700: "#85660F",
        },
        mango: {
          50: "#FFF7F0",
          100: "#FFEDDF",
          200: "#FFDCC4",
          300: "#FBC6A3",
          700: "#9A4D1E",
        },
        hibiscus: {
          50: "#FFF5F8",
          100: "#FDE6EE",
          200: "#F9D0DF",
          300: "#F2B6CB",
          700: "#9C3461",
        },
        leaf: {
          50: "#F3FBF5",
          100: "#E2F4E7",
          200: "#CBEAD4",
          300: "#AEDCBC",
          700: "#2F6B42",
        },
        plum: {
          50: "#FAF5FD",
          100: "#F1E7F9",
          200: "#E4D3F3",
          300: "#D2BAEA",
          700: "#653A83",
        },
        lagoon: {
          50: "#F2FAFB",
          100: "#DEF2F4",
          200: "#C6E8EC",
          300: "#A7DAE0",
          700: "#23686F",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate))" },
          "50%": { transform: "translateY(-8px) rotate(var(--tw-rotate))" },
        },
      },
      animation: {
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
