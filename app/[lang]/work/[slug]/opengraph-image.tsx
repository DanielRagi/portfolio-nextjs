import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from "@/lib/og"
import { getProject, getProjectSlugs } from "@/lib/content/work"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = "Case study"

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return i18n.locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  const project = await getProject(locale, slug)
  if (!project) notFound()

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project.name}
        title={project.summary}
        meta={`${project.year} · ${project.stack.join(" · ")}`}
      />
    ),
    { ...size, fonts: await ogFonts() },
  )
}
