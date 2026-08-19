import { getProjects } from "@/lib/content/work"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"
import ProjectCard from "./project-card"
import { Reveal } from "./motion"

/**
 * Interim grid. Phase 04 replaces it with the typographic index and the
 * full-screen case study overlay; this keeps the work visible in the new
 * shell until then.
 */
export default async function Projects({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const projects = await getProjects(lang)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={index * 0.08}>
          <ProjectCard project={project} visitText={dict.work.visit} />
        </Reveal>
      ))}
    </div>
  )
}
