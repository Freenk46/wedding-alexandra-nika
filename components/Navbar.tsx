"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LOCALES = ["ka", "ru", "en"] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (next: string) => {
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: "#story", label: t("story") },
    { href: "#gallery", label: t("gallery") },
    { href: "#program", label: t("program") },
    { href: "#location", label: t("location") },
    { href: "#rsvp", label: t("rsvp") },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-cream/90 backdrop-blur-sm border-b border-black/10">
      <span className="font-hand text-2xl text-accent">A × N</span>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-xs tracking-widest uppercase text-black/70 hover:text-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {LOCALES.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={`font-body text-xs tracking-widest uppercase px-2 py-1 transition-colors ${
              locale === loc
                ? "text-accent font-semibold"
                : "text-black/50 hover:text-black"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </header>
  );
}
