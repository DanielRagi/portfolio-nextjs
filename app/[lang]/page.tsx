import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import ScrollIndicator from "@/components/scroll-indicator"
import { getDictionary } from "@/lib/dictionary"
import type { Locale } from "@/lib/i18n-config"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen text-white">
      <Header lang={lang} dict={dict} />
      <Hero dict={dict} />
      <Projects dict={dict} />
      <Footer dict={dict} />
      <ScrollIndicator dict={dict} />
    </div>
  )
}

