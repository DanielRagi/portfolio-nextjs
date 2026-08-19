"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useRef, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"

/** Just what a row needs — the MDX body stays on the server. */
export type WorkRow = {
  slug: string
  name: string
  summary: string
  year: number
  status: "live" | "archived" | "in-progress"
  stack: string[]
  hero: string
  order: number
}

const STATUS_DOT: Record<WorkRow["status"], string> = {
  live: "bg-live",
  archived: "bg-ink-dim",
  "in-progress": "bg-accent",
}

/** w-72 at a 16/10 ratio — kept in sync with the preview's classes below. */
const PREVIEW_WIDTH = 288
const PREVIEW_HEIGHT = PREVIEW_WIDTH * (10 / 16)
const PREVIEW_OFFSET_X = 32

/**
 * A typographic index rather than a card grid. Three rows read as a curated
 * shortlist; fifteen read as a table of contents. A three-card grid just reads
 * as a grid missing its fourth card — which is why this shape was chosen for
 * a collection that starts at three and grows.
 *
 * The hover preview is one shared floating image, not one per row, so only a
 * single element ever animates.
 */
export default function WorkIndex({
  lang,
  dict,
  projects,
}: {
  lang: Locale
  dict: Dictionary
  projects: WorkRow[]
}) {
  const [active, setActive] = useState<WorkRow | null>(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const container = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const track = useCallback((event: React.MouseEvent) => {
    const bounds = container.current?.getBoundingClientRect()
    if (!bounds) return
    setPoint({ x: event.clientX - bounds.left, y: event.clientY - bounds.top })
  }, [])

  return (
    <div ref={container} className="relative" onMouseMove={reduced ? undefined : track}>
      <ul className="flex flex-col">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/${lang}/work/${project.slug}`}
              scroll={false}
              data-work-row={project.slug}
              onMouseEnter={() => setActive(project)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(project)}
              onBlur={() => setActive(null)}
              aria-label={`${dict.work.open} — ${project.name}`}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-t border-line-soft py-7 transition-colors duration-ui ease-out-soft hover:border-ink-dim sm:grid-cols-[2.25rem_1fr_auto_auto] sm:gap-x-8"
            >
              <span className="font-mono text-meta tabular-nums text-ink-dim transition-colors duration-ui ease-out-soft group-hover:text-accent">
                {String(project.order).padStart(2, "0")}
              </span>

              <div className="col-start-2 flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-h2 font-semibold leading-tight text-ink transition-colors duration-ui ease-out-soft group-hover:text-accent">
                    {project.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-mono text-meta uppercase text-ink-dim">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[project.status]}`}
                      aria-hidden="true"
                    />
                    {dict.work[`status${project.status.charAt(0).toUpperCase()}${project.status.slice(1)}` as "statusLive"]}
                  </span>
                </div>
                <p className="max-w-measure font-body text-sm text-ink-muted">{project.summary}</p>
                <p className="font-mono text-meta text-steel sm:hidden">{project.stack.join(" · ")}</p>
              </div>

              <p className="col-start-2 hidden self-center text-right font-mono text-meta text-steel sm:col-start-3 sm:block">
                {project.stack.join(" · ")}
              </p>

              <span className="col-start-3 flex items-center gap-3 self-center sm:col-start-4">
                <span className="font-mono text-meta tabular-nums text-ink-dim">{project.year}</span>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-dim transition-all duration-ui ease-out-soft group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border-t border-line-soft" aria-hidden="true" />

      {/* Floating preview. Pointer-events off so it never blocks the row beneath. */}
      <AnimatePresence>
        {active && !reduced ? (
          <m.div
            key={active.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            // The offset is baked into the coordinates rather than applied with
            // translate utilities: framer-motion writes an inline `transform`
            // for the scale, which would override any transform from a class.
            style={{ left: point.x + PREVIEW_OFFSET_X, top: point.y - PREVIEW_HEIGHT / 2 }}
            className="pointer-events-none absolute z-20 hidden aspect-[16/10] w-72 overflow-hidden rounded border border-line bg-surface lg:block"
            aria-hidden="true"
          >
            <Image src={active.hero} alt="" fill sizes="288px" className="object-cover" />
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
