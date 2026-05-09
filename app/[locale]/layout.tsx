import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Caveat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MusicPlayer from "@/components/MusicPlayer";
import "../globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Alexandra × Nika | October 21, 2026",
  description: "Join us to celebrate our wedding in Batumi, Georgia",
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
      className={`${bebasNeue.variable} ${dmSans.variable} ${caveat.variable}`}
    >
      <body className="bg-cream text-black antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <MusicPlayer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
