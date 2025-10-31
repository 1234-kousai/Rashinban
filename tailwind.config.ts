import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': '1440px', // ← 既存デザインが1440pxなので明示的に設定（デフォルトは1536px）
      },
      colors: {
        primary: "#2947A9",
        secondary: "#F9995D",
        neutral: {
          900: "#14171F",
          800: "#292E3D",
          700: "#3D445C",
          600: "#525B7A",
          500: "#667299",
          400: "#858EAD",
          300: "#A3AAC2",
          200: "#C2C7D6",
          100: "#E0E3EB",
          50: "#F6F8F7",
        },
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["72px", { lineHeight: "100%", fontWeight: "600" }],
        "heading-2": ["60px", { lineHeight: "100%", fontWeight: "700" }],
        "heading-4": ["36px", { lineHeight: "100%", fontWeight: "700" }],
        "body-large": ["24px", { lineHeight: "100%", fontWeight: "400" }],
        "body-medium": ["20px", { lineHeight: "100%", fontWeight: "400" }],
        "body-default": ["18px", { lineHeight: "100%", fontWeight: "400" }],
        caption: ["16px", { lineHeight: "100%", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};
export default config;
