import type { Metadata } from "next"
import CaseStudyBody from "@/components/case-study-body"
import { getProjects } from "@/lib/content/work"
import { i18n, isLocale, type Locale } from "@/lib/i18n-config"

/**
 * Phase 02 deliverable — proves the content layer loads, validates, and
 * renders. Every value below is read from content/work, not hardcoded.
 * Deleted before launch along with the rest of /specimen.
 */

export const metadata: Metadata = {
  title: "Specimen — Content layer",
  robots: { index: false, follow: false },
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const STATUS_COLOR: Record<string, string> = {
  live: "bg-live",
  archived: "bg-ink-dim",
  "in-progress": "bg-accent",
}

export default async function ContentSpecimenPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale
  const projects = await getProjects(locale)
  const [first] = projects

  return (
    <main className="min-h-screen pb-24">
      <header className="mx-auto w-full max-w-shell px-gutter pb-14 pt-20">
        <div className="flex flex-col gap-6">
          <p className="label">Phase 02 · Content layer</p>
          <h1 className="text-h1 font-display font-bold">
            {projects.length} projects, validated
            <br />
            in {i18n.locales.length} languages.
          </h1>
          <p className="measure text-lead font-light text-ink-muted">
            Loaded from <span className="font-mono text-meta text-steel">content/work</span> and
            checked against the Zod schema. A missing translation, an unknown field, a duplicated
            sort order, or an image path that is not on disk fails the build instead of reaching
            this page.
          </p>
        </div>
      </header>

      <section className="border-t border-line-soft py-14">
        <div className="mx-auto flex w-full max-w-shell flex-col gap-8 px-gutter">
          <div className="flex flex-col gap-2">
            <p className="label">Loaded · {locale}</p>
            <h2 className="text-h2">What the schema produced</h2>
          </div>

          <div className="flex flex-col">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="grid grid-cols-1 gap-3 border-t border-line-soft py-6 first:border-t-0 sm:grid-cols-[3rem_1fr] sm:gap-6"
              >
                <span className="label pt-1 tabular-nums">
                  {String(project.order).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-h3 font-semibold text-ink">{project.name}</h3>
                    <span className="font-mono text-meta tabular-nums text-ink-dim">
                      {project.year}
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-dim">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${STATUS_COLOR[project.status]}`}
                        aria-hidden="true"
                      />
                      {project.status}
                    </span>
                    {project.featured ? (
                      <span className="font-mono text-meta uppercase text-accent">featured</span>
                    ) : (
                      <span className="font-mono text-meta uppercase text-ink-dim">archive</span>
                    )}
                  </div>
                  <p className="max-w-measure text-sm text-ink-muted">{project.summary}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-meta text-ink-dim">{project.role}</span>
                    <span className="font-mono text-meta text-steel">
                      {project.stack.join(" · ")}
                    </span>
                    {project.links.live ? (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-accent/40 font-mono text-meta text-accent transition-colors duration-micro ease-out-soft hover:border-accent"
                      >
                        live ↗
                      </a>
                    ) : null}
                    <span className="font-mono text-meta text-ink-dim">
                      slug: {project.slug}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {first ? (
        <section className="border-t border-line-soft py-14">
          <div className="mx-auto flex w-full max-w-shell flex-col gap-8 px-gutter">
            <div className="flex flex-col gap-2">
              <p className="label">MDX · rendered</p>
              <h2 className="text-h2">{first.name}</h2>
              <p className="measure text-sm text-ink-muted">
                The body below is compiled from{" "}
                <span className="font-mono text-meta text-steel">
                  content/work/{first.slug}/{locale}.mdx
                </span>{" "}
                on the server. Daniel writes plain markdown; the component map applies the type
                system. The DRAFT paragraphs are placeholders awaiting his writing — they are
                deliberately visible rather than invented.
              </p>
            </div>
            <div className="rounded border border-line bg-surface p-8">
              <CaseStudyBody source={first.body} />
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
