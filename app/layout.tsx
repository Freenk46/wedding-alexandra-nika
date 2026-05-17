import type { Metadata } from "next";
import {
  Playfair_Display,
  Montserrat,
  Great_Vibes,
  DM_Serif_Display,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Alexandra × Nika | October 21, 2026",
  description: "Join us to celebrate our wedding in Batumi, Georgia",
  openGraph: {
    title: "Alexandra × Nika · 21.10.2026",
    description: "Join us to celebrate our wedding at ERA Hall, Batumi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra × Nika · 21.10.2026",
    description: "Join us to celebrate our wedding at ERA Hall, Batumi.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      data-theme="light"
      className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} ${dmSerifDisplay.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
