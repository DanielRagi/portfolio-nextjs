"use client"

import AnimatedSection from "./animated-section"

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8 text-center text-[#8a8a8a]">
      <AnimatedSection delay={0.1}>
        <p>From 🇨🇴 to the world.</p>
      </AnimatedSection>
    </footer>
  )
}

