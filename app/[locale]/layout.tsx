import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MusicPlayer from "@/components/MusicPlayer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable}`}
    >
      <body className="bg-bgPrimary text-textPrimary antialiased transition-colors duration-300">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Mobile-only marquee strip */}
            <div className="mobile-marquee" style={{
              display: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 32,
              background: '#111',
              zIndex: 999,
              overflow: 'hidden',
              alignItems: 'center',
            }}>
              <div style={{
                display: 'flex',
                whiteSpace: 'nowrap',
                animation: 'marquee 18s linear infinite',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(184,150,12,0.8)',
              }}>
                {Array(8).fill('DEVELOPED BY KHSOLUTIONS · WEB DEVELOPMENT · KHSOLUTIONS · ').join('')}
              </div>
            </div>
            {children}
            <MusicPlayer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
