import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        paper: "#f7f8f6",
        mist: "#e9efeb",
        teal: {
          DEFAULT: "#157f72",
          dark: "#0f5e56",
          soft: "#d8eee9"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(22, 54, 49, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
