import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/providers/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A4B78",
          50: "#E3F2FB",
          100: "#C7E4F7",
          200: "#8DC8EF",
          300: "#54ABE7",
          400: "#1B8FDF",
          500: "#0A4B78",
          600: "#08395C",
          700: "#052840",
          800: "#031624",
          900: "#010308",
        },
        accent: {
          DEFAULT: "#F4A300",
          100: "#FDE0A4",
          200: "#FCD17D",
          300: "#FAB456",
          400: "#F79F30",
          500: "#F4A300",
          600: "#C37F00",
          700: "#925C00",
        },
        surface: "#F5F7FA",
        muted: "#667085",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        floating: "0 20px 45px -15px rgba(15, 23, 42, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
