import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Section from "@/components/section"
import SiteFooter from "@/components/site-footer"
import SiteNav from "@/components/site-nav"
import { getDictionary } from "@/lib/dictionary"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const dict = await getDictionary(locale)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:border focus:border-accent focus:bg-surface-raised focus:px-4 focus:py-2 focus:font-mono focus:text-meta focus:uppercase focus:text-ink"
      >
        {dict.nav.skipToContent}
      </a>

      <SiteNav lang={locale} dict={dict} />

      <main id="main">
        <Hero dict={dict} />

        {/* Phase 04 replaces this with the typographic work index and overlay. */}
        <Section id="work" eyebrow={dict.work.eyebrow} title={dict.work.title}>
          <Projects lang={locale} dict={dict} />
        </Section>
      </main>

      <SiteFooter dict={dict} />
    </>
  )
}
