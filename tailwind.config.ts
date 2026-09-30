import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12152b",
        paper: "#f7f7fb",
        mist: "#eef0fb",
        brand: {
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
          soft: "#e6e4fc",
          accent: "#38bdf8"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(79, 70, 229, 0.10)",
        glow: "0 12px 40px rgba(79, 70, 229, 0.28)"
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6366f1 0%, #4f46e5 45%, #38bdf8 100%)",
        "brand-mesh": "radial-gradient(60% 55% at 15% 15%, rgba(99,102,241,0.16) 0%, rgba(99,102,241,0) 60%), radial-gradient(55% 50% at 85% 25%, rgba(56,189,248,0.14) 0%, rgba(56,189,248,0) 60%), radial-gradient(70% 60% at 50% 100%, rgba(79,70,229,0.08) 0%, rgba(79,70,229,0) 60%)"
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } }
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.16,1,.3,1) both",
        "fade-in": "fade-in .8s ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
