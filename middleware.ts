import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Lista de idiomas soportados
export const locales = ["es", "en"]

// Función para obtener el idioma preferido del usuario
function getLocale(request: NextRequest) {
  // Obtener el idioma de la cookie si existe
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Obtener el idioma del navegador
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim())
      .find((lang) => {
        // Comprobar si el idioma o su base (es-ES -> es) está en nuestra lista
        return locales.some((locale) => lang === locale || lang.startsWith(`${locale}-`))
      })

    if (preferredLocale) {
      // Obtener la base del idioma (es-ES -> es)
      const baseLocale = locales.find(
        (locale) => preferredLocale === locale || preferredLocale.startsWith(`${locale}-`),
      )
      if (baseLocale) return baseLocale
    }
  }

  // Idioma por defecto
  return "en"
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verificar si la ruta ya tiene un idioma
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirigir a la ruta con el idioma
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Excluir rutas internas y archivos estáticos
    "/((?!api|_next/static|_next/image|favicon.ico|projects|profile.webp|fiverr.png).*)",
  ],
}

