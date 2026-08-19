import type { MetadataRoute } from "next"
import { getProjectSlugs } from "@/lib/content/work"
import { i18n } from "@/lib/i18n-config"
import { absolute } from "@/lib/site"

/**
 * Every page in every language, with the alternates spelled out so search
 * engines pair the Spanish and English versions instead of treating them as
 * duplicates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs()
  const paths = ["", ...slugs.map((slug) => `/work/${slug}`)]

  return paths.flatMap((path) =>
    i18n.locales.map((locale) => ({
      url: absolute(`/${locale}${path}`),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((alt) => [alt, absolute(`/${alt}${path}`)]),
        ),
      },
    })),
  )
}
