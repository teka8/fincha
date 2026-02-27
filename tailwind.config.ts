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
          DEFAULT: "#80EF80",
          50: "#F0FFF0",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#80EF80",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },
        accent: {
          DEFAULT: "#F4A300",
          50: "#FFF8E7",
          100: "#FDE0A4",
          200: "#FCD17D",
          300: "#FAB456",
          400: "#F79F30",
          500: "#F4A300",
          600: "#C37F00",
          700: "#925C00",
          800: "#7A4D00",
          900: "#613D00",
        },
        surface: "hsl(var(--surface))",
        muted: "#64748B",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        floating: "0 20px 45px -15px rgba(15, 23, 42, 0.25)",
        "glow-sm": "0 0 15px rgba(128, 239, 128, 0.12)",
        "glow-md": "0 0 30px rgba(128, 239, 128, 0.15)",
        "glow-accent": "0 0 30px rgba(244, 163, 0, 0.15)",
        "card": "0 4px 24px -4px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 20px 50px -12px rgba(128, 239, 128, 0.18)",
        "inner-glow": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      maxWidth: {
        layout: "1800px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "spin-slow": "spin-slow 120s linear infinite",
        "gradient": "gradient-rotate 6s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-rotate": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-gradient": "radial-gradient(at 40% 20%, hsla(120, 77%, 25%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(40, 95%, 48%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(120, 77%, 72%, 0.1) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
