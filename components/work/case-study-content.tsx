import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import CaseStudyBody from "@/components/case-study-body"
import type { Project } from "@/lib/content/work"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"

/**
 * The case study itself, rendered identically whether it arrived as an
 * overlay or as a direct visit to /[lang]/work/[slug]. One implementation,
 * so the two can never drift.
 */
export default function CaseStudyContent({
  project,
  next,
  lang,
  dict,
}: {
  project: Project
  next: Project
  lang: Locale
  dict: Dictionary
}) {
  const statusLabel = dict.work[
    `status${project.status.charAt(0).toUpperCase()}${project.status.slice(1)}` as "statusLive"
  ]

  const specs: Array<{ key: string; value: string }> = [
    { key: dict.work.year, value: String(project.year) },
    { key: dict.work.status, value: statusLabel },
    { key: dict.work.role, value: project.role },
    { key: dict.work.stack, value: project.stack.join(" · ") },
  ]

  return (
    <article className="mx-auto w-full max-w-3xl px-gutter pb-24 pt-10">
      <header className="flex flex-col gap-6">
        <h1 className="text-h1 font-display font-bold text-ink">{project.name}</h1>
        <p className="max-w-measure font-body text-lead font-light text-ink-muted">
          {project.summary}
        </p>
      </header>

      <dl className="mt-10 flex flex-col border-t border-line-soft">
        {specs.map((spec) => (
          <div
            key={spec.key}
            className="grid grid-cols-1 gap-1 border-b border-line-soft py-3 sm:grid-cols-[8rem_1fr] sm:gap-6"
          >
            <dt className="label">{spec.key}</dt>
            <dd className="font-body text-sm text-ink">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded border border-line bg-surface">
        <Image
          src={project.images.hero}
          alt={project.name}
          fill
          sizes="(min-width: 768px) 48rem, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-12">
        <CaseStudyBody source={project.body} />
      </div>

      {project.images.details.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.images.details.map((detail) => (
            <figure
              key={detail.src}
              className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-surface"
            >
              <Image
                src={detail.src}
                alt={detail.alt}
                fill
                sizes="(min-width: 640px) 24rem, 100vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      ) : null}

      {(project.links.live || project.links.source) && (
        <div className="mt-12 flex flex-wrap gap-3">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-accent/40 px-4 py-2.5 font-mono text-meta uppercase text-accent transition-colors duration-micro ease-out-soft hover:border-accent hover:bg-accent/10"
            >
              {dict.work.live}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {project.links.source ? (
            <a
              href={project.links.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-line px-4 py-2.5 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:border-ink-dim hover:text-ink"
            >
              {dict.work.source}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      )}

      {/* Someone who reads one case study should read two. Wraps at the end. */}
      <Link
        href={`/${lang}/work/${next.slug}`}
        scroll={false}
        className="group mt-16 flex items-center justify-between gap-4 border-t border-line pt-6"
      >
        <span className="flex flex-col gap-1">
          <span className="label">{dict.work.next}</span>
          <span className="font-display text-h3 font-semibold text-ink transition-colors duration-ui ease-out-soft group-hover:text-accent">
            {next.name}
          </span>
        </span>
        <ArrowRight
          className="h-5 w-5 shrink-0 text-ink-dim transition-all duration-ui ease-out-soft group-hover:translate-x-1 group-hover:text-accent"
          aria-hidden="true"
        />
      </Link>
    </article>
  )
}
