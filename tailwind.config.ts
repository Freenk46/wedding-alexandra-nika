import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
        cream: "#EAE6DD",
        black: "#111111",
        accent: "#F05235",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
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
