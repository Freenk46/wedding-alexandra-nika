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
            {children}
            <MusicPlayer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
