import type React from "react"
import type { Metadata } from "next"
import "../globals.css"
import { i18n } from "@/lib/i18n-config"
import type { Locale } from "@/lib/i18n-config"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "Daniel Ramirez - Portfolio",
  description: "Portfolio",
  icons: {
    icon: "/favicon.png",
  },
  other: {
    'facebook-domain-verification': 'tbbi0rdm196myjqryyay0ok4eb51tq',
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  // Esperar a que los parámetros estén disponibles
  const { lang } = await params

  // Asegurarse de que lang es una de las localizaciones válidas
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale

  return (
    <html lang={validLang} className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}

