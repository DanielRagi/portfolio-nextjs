import { getProjects } from "@/lib/content/work"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"
import ProjectCard from "./project-card"
import AnimatedSection from "./animated-section"

/**
 * Server component now — the project list comes from the validated content
 * layer rather than a JSON file paired with the dictionaries by array index.
 * Replaced by the work index in phase 04; this keeps the page working.
 */
export default async function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const projects = await getProjects(lang)

  return (
    <section id="proyectos" className="container mx-auto px-4 py-16">
      <AnimatedSection delay={0.1}>
        <h2 className="text-3xl font-bold mb-10">{dict.projects.title}</h2>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <AnimatedSection key={project.slug} delay={0.1 + index * 0.1}>
            <ProjectCard project={project} visitText={dict.projects.visit} />
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
