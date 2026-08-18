"use client"

import AnimatedSection from "./animated-section"
import type { Dictionary } from "@/lib/dictionary-types"

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="container mx-auto px-4 py-8 text-center text-[#8a8a8a]">
      <AnimatedSection delay={0.1}>
        <p>{dict.footer.text}<br/>Daniel Ramírez Giraldo - 2025</p>
      </AnimatedSection>
    </footer>
  )
}

