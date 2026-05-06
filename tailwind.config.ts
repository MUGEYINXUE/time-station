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
        ink: {
          50: "#f5f0e8",
          100: "#e8dfd2",
          200: "#d4c9b4",
          300: "#b8a88e",
          400: "#9c8a6e",
          500: "#846f54",
          600: "#6d5a43",
          700: "#574736",
          800: "#3d3328",
          900: "#1a1a2e",
          950: "#0f0f1a",
        },
        river: {
          50: "#e6faf8",
          100: "#c5f2ed",
          200: "#9be5db",
          300: "#6dd4c8",
          400: "#4ecdc4",
          500: "#35b8b0",
          600: "#2a9a93",
          700: "#247d78",
          800: "#216461",
          900: "#1f5350",
          950: "#1a3433",
        },
        memory: {
          50: "#fff9e6",
          100: "#ffefb3",
          200: "#ffe380",
          300: "#ffd93d",
          400: "#ffc800",
          500: "#e6b400",
          600: "#cc9f00",
          700: "#997700",
          800: "#665000",
          900: "#332800",
          950: "#1a1400",
        },
        mood: {
          joy: "#ffd93d",
          peace: "#4ecdc4",
          love: "#ff6b9d",
          sad: "#7c9cbf",
          angry: "#e74c3c",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Noto Serif SC", "serif"],
        sans: ["Inter", "Noto Sans SC", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "glow-soft": "glow-soft 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "river-flow": "river-flow 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow-soft": {
          "0%": { boxShadow: "0 0 5px rgba(78, 205, 196, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(78, 205, 196, 0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "river-flow": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      backgroundImage: {
        "paper-texture":
          "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
