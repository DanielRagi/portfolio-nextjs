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
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { lang: Locale }
}>) {
  return (
    <html lang={params.lang} className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}

