import type { Metadata } from "next"
import type { ReactNode } from "react"
import "../globals.css"
import { fontVariables } from "../fonts"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

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
    "facebook-domain-verification": "tbbi0rdm196myjqryyay0ok4eb51tq",
  },
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  return (
    // data-scroll-behavior opts back into Next's scroll reset on navigation;
    // without it, the global `scroll-behavior: smooth` also animates route
    // changes, which Next 16 no longer overrides on its own.
    <html lang={locale} className={fontVariables} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  )
}
