import { notFound } from "next/navigation"
import CasePanel from "@/components/work/case-study-panel"
import CaseStudyContent from "@/components/work/case-study-content"
import { getDictionary } from "@/lib/dictionary"
import { getProjectNeighbours } from "@/lib/content/work"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

/**
 * Intercepts a navigation from the work index and renders the case study as
 * an overlay, leaving the index mounted (and scrolled where it was) beneath.
 *
 * A direct visit or a refresh falls through to app/[lang]/work/[slug], which
 * renders the identical CaseStudyContent as a normal, crawlable page.
 */
export default async function WorkModal({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  const found = await getProjectNeighbours(locale, slug)
  if (!found) notFound()

  const dict = await getDictionary(locale)

  return (
    <CasePanel
      lang={locale}
      dict={dict}
      slug={slug}
      prevSlug={found.prev.slug}
      nextSlug={found.next.slug}
      position={found.position}
      total={found.total}
    >
      <CaseStudyContent project={found.project} next={found.next} lang={locale} dict={dict} />
    </CasePanel>
  )
}
