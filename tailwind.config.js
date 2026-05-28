/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#09131F", // Obsidian Navy
          purple: "#A08A72", // Champagne Gold
          lavender: "#C0B29E", // Sand Gold
          soft: "#D2C5B3", // Warm Brass
          light: "#FDFBF7", // Silk Cream
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        "soft-border": "#E4E7EC",
        "soft-text": "#667085",
        "dark-text": "#1F2937",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "float-medium": "floatMedium 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        floatMedium: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".6" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "luxury-sm": "0 2px 8px -1px rgba(0, 67, 148, 0.05)",
        "luxury": "0 10px 30px -10px rgba(0, 67, 148, 0.1), 0 1px 1px 0 rgba(255, 255, 255, 0.5) inset",
        "luxury-lg": "0 20px 40px -15px rgba(104, 38, 129, 0.15), 0 1px 2px 0 rgba(255, 255, 255, 0.6) inset",
        "brand-glow": "0 0 20px rgba(0, 67, 148, 0.15)",
        "purple-glow": "0 0 20px rgba(104, 38, 129, 0.15)",
      },
    },
  },
  plugins: [],
}
