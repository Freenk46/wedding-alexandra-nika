import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs:  "375px",
      sm:  "390px",
      md:  "430px",
      lg:  "768px",
      xl:  "1024px",
      "2xl": "1280px",
      "3xl": "1440px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textMuted: "var(--text-muted)",
        accent: "var(--accent)",
        glassBg: "var(--glass-bg)",
        glassBorder: "var(--border-color)",
        cream: "#EAE6DD",
        black: "#111111",
        obsidian: "#0A0A0A",
        midnight: "#13151A",
        champagne: "#D4AF37",
        rosegold: "#E0BFB8",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
        hand: ["var(--font-great-vibes)", "cursive"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
