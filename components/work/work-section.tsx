import { getArchivedProjects, getFeaturedProjects } from "@/lib/content/work"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"
import WorkIndex, { type WorkRow } from "./work-index"
import { Reveal } from "../motion"

/** Server side: load, trim to what a row needs, hand off to the client index. */
function toRow(project: Awaited<ReturnType<typeof getFeaturedProjects>>[number]): WorkRow {
  return {
    slug: project.slug,
    name: project.name,
    summary: project.summary,
    year: project.year,
    status: project.status,
    stack: project.stack,
    hero: project.images.hero,
    order: project.order,
  }
}

export default async function WorkSection({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [featured, archived] = await Promise.all([
    getFeaturedProjects(lang),
    getArchivedProjects(lang),
  ])

  return (
    <>
      <Reveal>
        <WorkIndex lang={lang} dict={dict} projects={featured.map(toRow)} />
      </Reveal>

      {/*
        Empty until the collection outgrows the index. Non-featured projects
        drop to a compact list that needs no case study written for it, so
        growth never obliges Daniel to write another five.
      */}
      {archived.length > 0 ? (
        <Reveal>
          <div className="mt-16 flex flex-col gap-4">
            <p className="label">{dict.work.archive}</p>
            <ul className="flex flex-col">
              {archived.map((project) => (
                <li
                  key={project.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line-soft py-3"
                >
                  <span className="font-body text-sm text-ink">{project.name}</span>
                  <span className="font-mono text-meta text-steel">{project.stack.join(" · ")}</span>
                  <span className="font-mono text-meta tabular-nums text-ink-dim">{project.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ) : null}
    </>
  )
}
