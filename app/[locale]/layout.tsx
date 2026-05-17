import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import MusicPlayer from "@/components/MusicPlayer";
import LanguageModal from "@/components/LanguageModal";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <LanguageModal />
        {children}
        <MusicPlayer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
