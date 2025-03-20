import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import ScrollIndicator from "@/components/scroll-indicator"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"
import { i18n } from "@/lib/i18n-config"

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  // Esperar a que los parámetros estén disponibles
  const { lang } = await params

  // Asegurarse de que lang es una de las localizaciones válidas
  const validLang = i18n.locales.includes(lang) ? lang : i18n.defaultLocale

  const dict = await getDictionary(validLang)

  return (
    <div className="min-h-screen text-white">
      <Header lang={validLang} dict={dict} />
      <Hero dict={dict} />
      <Projects dict={dict} />
      <Footer dict={dict} />
      <ScrollIndicator dict={dict} />
    </div>
  )
}

