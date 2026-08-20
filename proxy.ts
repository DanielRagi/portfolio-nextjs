import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

/**
 * Locale routing. Renamed from `middleware` in Next 16, which moved this
 * convention to `proxy` and dropped edge-runtime support for it.
 *
 * The supported locales come from lib/i18n-config so there is exactly one
 * place to add a language; this file previously kept its own copy of the list.
 */

const LOCALE_COOKIE = "NEXT_LOCALE"

function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale

  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    // "es-ES,es;q=0.9,en;q=0.8" -> ["es-ES", "es", "en"], preference order kept.
    const requested = acceptLanguage.split(",").map((part) => part.split(";")[0].trim().toLowerCase())

    for (const tag of requested) {
      const base = tag.split("-")[0]
      if (isLocale(base)) return base
    }
  }

  return i18n.defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${resolveLocale(request)}${pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals and anything that looks like a file (has an extension),
  // so public assets never round-trip through a locale redirect.
  matcher: ["/((?!api|_next|.*\\.).*)"],
}
