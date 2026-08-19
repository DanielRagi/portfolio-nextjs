import { ImageResponse } from "next/og"
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from "@/lib/og"
import { getDictionary } from "@/lib/dictionary"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"
import { site } from "@/lib/site"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Daniel Ramírez — portfolio"

/** Without this the card is generated per request instead of at build time. */
export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

/** Next 16 passes params as a promise to image generators. */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const dict = await getDictionary(locale)

  return new ImageResponse(
    (
      <OgCard
        eyebrow={site.name}
        title={dict.hero.statement}
        meta={`${dict.hero.role} · ${dict.hero.location}`}
      />
    ),
    { ...size, fonts: await ogFonts() },
  )
}
