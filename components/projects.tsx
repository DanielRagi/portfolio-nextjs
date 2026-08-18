"use client"

import projects from "@/lib/projects.json"
import ProjectCard from "./project-card"
import AnimatedSection from "./animated-section"
import { useInView } from "@/hooks/use-in-view"
import type { Dictionary } from "@/lib/dictionary-types"

export default function Projects({ dict }: { dict: Dictionary }) {
  // `once` replaces the old hasBeenInView state, which set state from an effect.
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1, once: true })

  return (
    <section id="proyectos" ref={ref} className="container mx-auto px-4 py-16">
      {isInView && (
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl font-bold mb-10">{dict.projects.title}</h2>
        </AnimatedSection>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <AnimatedSection key={project.name} delay={0.1 + index * 0.1}>
            <ProjectCard
              {...project}
              name={dict.projects.items[index]?.name || project.name}
              desc={dict.projects.items[index]?.desc || project.desc}
              visitText={dict.projects.visit}
            />
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
