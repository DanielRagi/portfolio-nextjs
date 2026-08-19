import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import CaseStudyContent from "@/components/work/case-study-content"
import SiteFooter from "@/components/site-footer"
import SiteNav from "@/components/site-nav"
import { getDictionary } from "@/lib/dictionary"
import { getProjectNeighbours, getProjectSlugs } from "@/lib/content/work"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

/**
 * The canonical, crawlable case study. Reached by direct visit, refresh, or a
 * shared link; the overlay at @modal/(.)work/[slug] intercepts navigations
 * from the index and renders the same content over the page.
 */

type Params = Promise<{ lang: string; slug: string }>

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return i18n.locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const found = await getProjectNeighbours(locale, slug)
  if (!found) return {}

  const { project } = found

  return {
    title: `${project.name} — Daniel Ramírez`,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: Object.fromEntries(i18n.locales.map((l) => [l, `/${l}/work/${slug}`])),
    },
  }
}

export default async function WorkPage({ params }: { params: Params }) {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  const found = await getProjectNeighbours(locale, slug)
  if (!found) notFound()

  const dict = await getDictionary(locale)

  return (
    <>
      <SiteNav lang={locale} dict={dict} />

      <main className="pt-20">
        <div className="mx-auto w-full max-w-3xl px-gutter pt-6">
          <Link
            href={`/${locale}#work`}
            className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {dict.work.backToWork}
          </Link>
        </div>

        <CaseStudyContent project={found.project} next={found.next} lang={locale} dict={dict} />
      </main>

      <SiteFooter dict={dict} />
    </>
  )
}
