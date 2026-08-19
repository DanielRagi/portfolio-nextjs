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
import { absolute, site } from "@/lib/site"

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
    // The layout's template appends the site name.
    title: project.name,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: Object.fromEntries(i18n.locales.map((l) => [l, `/${l}/work/${slug}`])),
    },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
      url: `/${locale}/work/${slug}`,
      locale: locale === "es" ? "es_CO" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
    },
  }
}

export default async function WorkPage({ params }: { params: Params }) {
  const { lang, slug } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  const found = await getProjectNeighbours(locale, slug)
  if (!found) notFound()

  const dict = await getDictionary(locale)
  const { project } = found

  const workSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.summary,
    dateCreated: String(project.year),
    inLanguage: locale,
    url: absolute(`/${locale}/work/${project.slug}`),
    image: absolute(project.images.hero),
    keywords: project.stack.join(", "),
    creator: { "@type": "Person", name: site.legalName, url: site.url },
    ...(project.links.live ? { sameAs: project.links.live } : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />

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

        <CaseStudyContent project={project} next={found.next} lang={locale} dict={dict} />
      </main>

      <SiteFooter dict={dict} />
    </>
  )
}
