import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);
const VALID_LOCALES = ["ka", "en", "ru"] as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lang = request.cookies.get("lang")?.value;

  if (pathname === "/") {
    if (lang && VALID_LOCALES.includes(lang as (typeof VALID_LOCALES)[number])) {
      return NextResponse.redirect(new URL(`/${lang}`, request.url));
    }
    // No cookie → serve root page, LanguageModal will show
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
