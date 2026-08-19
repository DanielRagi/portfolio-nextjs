import type { Metadata } from "next"
import type { ReactNode } from "react"
import "../globals.css"
import { fontVariables } from "../fonts"
import MotionProvider from "@/components/motion-provider"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"
import { absolute, profiles, site } from "@/lib/site"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const description = site.description[locale]
  const title = `${site.name} — ${site.jobTitle[locale]}`

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      // Case studies set their own title; this keeps the identity on the end.
      template: `%s — ${site.name}`,
    },
    description,
    applicationName: site.name,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(i18n.locales.map((alt) => [alt, `/${alt}`])),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: `/${locale}`,
      locale: locale === "es" ? "es_CO" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: { icon: "/favicon.png" },
    other: {
      "facebook-domain-verification": "tbbi0rdm196myjqryyay0ok4eb51tq",
    },
  }
}

export default async function RootLayout({
  children,
  modal,
  params,
}: Readonly<{
  children: ReactNode
  /** Parallel slot holding the intercepted case study overlay. */
  modal: ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.legalName,
    alternateName: site.name,
    url: absolute(`/${locale}`),
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle[locale],
    description: site.description[locale],
    image: absolute("/profile.webp"),
    sameAs: profiles,
    address: { "@type": "PostalAddress", addressCountry: "CO" },
  }

  return (
    // data-scroll-behavior opts back into Next's scroll reset on navigation;
    // without it, the global `scroll-behavior: smooth` also animates route
    // changes, which Next 16 no longer overrides on its own.
    <html lang={locale} className={fontVariables} data-scroll-behavior="smooth">
      <body>
        <MotionProvider>
          {children}
          {modal}
        </MotionProvider>
        <script
          type="application/ld+json"
          // Serialised from an object literal we control; no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  )
}
