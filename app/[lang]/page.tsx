import Approach from "@/components/approach"
import Capabilities from "@/components/capabilities"
import Contact from "@/components/contact"
import Hero from "@/components/hero"
import Section from "@/components/section"
import SiteFooter from "@/components/site-footer"
import SiteNav from "@/components/site-nav"
import Studio from "@/components/studio"
import WorkSection from "@/components/work/work-section"
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

        <Section id="approach" eyebrow={dict.approach.eyebrow} title={dict.approach.title}>
          <Approach dict={dict} />
        </Section>

        <Section id="work" eyebrow={dict.work.eyebrow} title={dict.work.title}>
          <WorkSection lang={locale} dict={dict} />
        </Section>

        <Section
          id="capabilities"
          eyebrow={dict.capabilities.eyebrow}
          title={dict.capabilities.title}
        >
          <Capabilities dict={dict} />
        </Section>

        {/*
          The slot the plan held open for Experience/CV sits here, between
          Capabilities and Atomic Studio. Adding it later is one section.
        */}

        <Section id="studio" eyebrow={dict.studio.eyebrow}>
          <Studio dict={dict} />
        </Section>

        <Section id="contact" eyebrow={dict.contact.eyebrow} title={dict.contact.title}>
          <Contact dict={dict} />
        </Section>
      </main>

      <SiteFooter dict={dict} />
    </>
  )
}
