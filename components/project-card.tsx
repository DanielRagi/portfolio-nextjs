import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/content/work"

const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-live",
  archived: "bg-ink-dim",
  "in-progress": "bg-accent",
}

/** Interim card, on-system. Replaced by the work index row in phase 04. */
export default function ProjectCard({ project, visitText }: { project: Project; visitText: string }) {
  const { name, summary, stack, images, links, year, status } = project

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded border border-line bg-surface transition-colors duration-ui ease-out-soft hover:border-ink-dim">
      <div className="relative aspect-[16/10] border-b border-line">
        <Image
          src={images.hero}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-80 transition-opacity duration-ui ease-out-soft group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-h3 font-semibold text-ink">{name}</h3>
          <span className="font-mono text-meta tabular-nums text-ink-dim">{year}</span>
        </div>

        <p className="flex-1 font-body text-sm text-ink-muted">{summary}</p>

        <p className="font-mono text-meta text-steel">{stack.join(" · ")}</p>

        <div className="mt-1 flex items-center justify-between gap-3 border-t border-line-soft pt-3">
          <span className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-dim">
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} aria-hidden="true" />
            {status}
          </span>

          {links.live ? (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-meta uppercase text-accent transition-colors duration-micro ease-out-soft hover:text-ink"
            >
              {visitText}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">— {name}</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
