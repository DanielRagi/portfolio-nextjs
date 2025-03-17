import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import ScrollIndicator from "@/components/scroll-indicator"

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <Hero />
      <Projects />
      <Footer />
      <ScrollIndicator />
    </div>
  )
}

