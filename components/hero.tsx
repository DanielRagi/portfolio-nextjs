"use client"

import Image from "next/image"
import { Github, Linkedin } from "lucide-react"
import AnimatedSection from "./animated-section"

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="container mx-auto px-4 min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center justify-center">
      <AnimatedSection className="md:w-1/3 mb-10 md:mb-0" delay={0.1}>
        <h1 className="text-5xl md:text-6xl font-bold mb-2">{dict.hero.greeting}</h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {dict.hero.intro}{" "}
          <span
            className="text-transparent bg-clip-text inline-block"
            style={{
              backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
            }}
          >
            {dict.hero.name}
          </span>
        </h2>
        <p className="text-[#8a8a8a] mb-2">{dict.hero.title}</p>
        <p className="text-[#8a8a8a] mb-6 max-w-lg">{dict.hero.description}</p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/danielramg/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffda44] transition-colors"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://github.com/DanielRagi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffda44] transition-colors"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </AnimatedSection>
      <AnimatedSection className="md:w-1/3" delay={0.3}>
        <div className="rounded-full overflow-hidden w-64 h-64 mx-auto group">
          <Image
            src="/profile.webp?height=256&width=256"
            alt="Daniel Ramírez"
            width={256}
            height={256}
            className="object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
          />
        </div>
      </AnimatedSection>
    </section>
  )
}

