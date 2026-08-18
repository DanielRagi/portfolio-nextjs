import type { Metadata } from "next"

/**
 * Phase 01 deliverable — a specimen of the design system with no product
 * content in it. Every value here comes from the tokens in globals.css and
 * tailwind.config.ts; nothing is hardcoded. Deleted before launch.
 */

export const metadata: Metadata = {
  title: "Specimen — Design system",
  robots: { index: false, follow: false },
}

const SURFACES = [
  { name: "ground", value: "#080A0E", note: "page canvas" },
  { name: "surface", value: "#0F1218", note: "panels, rows" },
  { name: "surface-raised", value: "#141822", note: "one step up" },
  { name: "line", value: "#1E2430", note: "hairline" },
  { name: "line-soft", value: "#161B24", note: "section divider" },
]

const INK = [
  { name: "ink", value: "#E9EBF1", note: "primary", contrast: "17.4:1" },
  { name: "ink-muted", value: "#9BA1B3", note: "prose, secondary", contrast: "7.7:1" },
  { name: "ink-dim", value: "#767C90", note: "labels, meta", contrast: "4.8:1" },
]

const ACCENTS = [
  { name: "accent", value: "#E4C79C", note: "the one warm lead", contrast: "12.2:1" },
  { name: "steel", value: "#7BA6C7", note: "cool support, code", contrast: "7.7:1" },
  { name: "live", value: "#8FBF9F", note: "status only", contrast: "9.4:1" },
]

const SCALE = [
  { token: "display", cls: "text-display font-display font-bold", sample: "Daniel Ramírez" },
  { token: "h1", cls: "text-h1 font-display font-semibold", sample: "Software built with intent" },
  { token: "h2", cls: "text-h2 font-display font-semibold", sample: "Selected work" },
  { token: "h3", cls: "text-h3 font-display font-semibold", sample: "Cognitive Playroom" },
  { token: "lead", cls: "text-lead font-body font-light text-ink-muted", sample: "A lead paragraph introduces a section without competing with the heading above it." },
  { token: "base", cls: "text-base font-body text-ink-muted", sample: "Running prose sits at seventeen pixels with a 1.65 line height, held to roughly sixty-eight characters so the eye never loses the line." },
  { token: "sm", cls: "text-sm font-body text-ink-muted", sample: "Smaller supporting copy for notes and captions." },
  { token: "meta", cls: "text-meta font-mono text-ink-dim", sample: "2024 · UNITY · C# · NEXT.JS" },
  { token: "label", cls: "label", sample: "Selected work" },
]

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-line-soft py-14">
      <div className="mx-auto w-full max-w-shell px-gutter">
        <div className="flex flex-col gap-2">
          <p className="label">{eyebrow}</p>
          <h2 className="text-h2">{title}</h2>
        </div>
        <div className="mt-8 flex flex-col gap-8">{children}</div>
      </div>
    </section>
  )
}

function Swatch({
  name,
  value,
  note,
  contrast,
}: {
  name: string
  value: string
  note: string
  contrast?: string
}) {
  return (
    <div className="overflow-hidden rounded border border-line bg-surface">
      <div className="h-16 border-b border-line" style={{ backgroundColor: value }} />
      <div className="flex flex-col gap-0.5 p-3">
        <span className="font-mono text-meta tabular-nums text-ink">{value}</span>
        <span className="label">{name}</span>
        <span className="font-body text-sm text-ink-dim">{note}</span>
        {contrast ? (
          <span className="mt-1 font-mono text-meta tabular-nums text-live">AA {contrast}</span>
        ) : null}
      </div>
    </div>
  )
}

export default function SpecimenPage() {
  return (
    <main className="min-h-screen pb-24">
      <header className="mx-auto w-full max-w-shell px-gutter pb-14 pt-20">
        <div className="flex flex-col gap-6">
          <p className="label">Phase 01 · Foundation</p>
          <h1 className="text-display font-display font-bold">
            Quiet ground,
            <br />
            warm light.
          </h1>
          <p className="measure text-lead font-light text-ink-muted">
            Every color, size, and weight on this page is read from a token. Nothing below is
            hardcoded, which is what makes the direction cheap to change and expensive to break.
          </p>
        </div>
      </header>

      <Section eyebrow="Color · surfaces" title="Depth from hairlines, not shadows">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SURFACES.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Color · ink" title="Neutrals biased blue, all AA on ground">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {INK.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
        <p className="measure text-sm text-ink-muted">
          Contrast ratios are measured against <span className="font-mono text-steel">#080A0E</span>,
          the page ground. The smallest text on the site uses <span className="font-mono text-steel">ink-dim</span>,
          which clears 4.5:1 — so the entire type system passes AA, including the mono labels.
        </p>
      </Section>

      <Section eyebrow="Color · accents" title="One warm lead, one cool support">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ACCENTS.map((s) => (
            <Swatch key={s.name} {...s} />
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded border border-line bg-surface p-6">
          <p className="label">In use</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#" className="border-b border-accent/40 font-body text-accent transition-colors duration-micro ease-out-soft hover:border-accent">
              A link, at rest and on hover
            </a>
            <span className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
              Live
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-dim" aria-hidden="true" />
              Archived
            </span>
            <code className="rounded border border-line-soft bg-surface-raised px-1.5 py-0.5 font-mono text-meta text-steel">
              lib/projects.json
            </code>
          </div>
        </div>
      </Section>

      <Section eyebrow="Typography" title="Archivo, Newsreader, IBM Plex Mono">
        <div className="flex flex-col">
          {SCALE.map((row) => (
            <div
              key={row.token}
              className="grid grid-cols-1 gap-2 border-t border-line-soft py-6 first:border-t-0 sm:grid-cols-[7rem_1fr] sm:gap-8"
            >
              <span className="label pt-1">{row.token}</span>
              <p className={row.cls}>{row.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Typography · Spanish" title="Both languages, one system">
        <div className="flex flex-col gap-6 rounded border border-line bg-surface p-6">
          <p className="measure font-body text-base text-ink-muted">
            Transformo ideas en código y código en impacto. Diseño y construyo plataformas a medida —
            comercio electrónico, intranets, aplicaciones interactivas — para clientes que necesitan
            algo más que una plantilla.
          </p>
          <p className="font-mono text-meta uppercase text-ink-dim">
            Ingeniero informático · Medellín, Colombia · ¿Hablamos?
          </p>
        </div>
        <p className="measure text-sm text-ink-muted">
          Diacritics, inverted punctuation, and the longer Spanish measure all render from the same
          latin-ext subsets — no fallback swap between languages.
        </p>
      </Section>

      <Section eyebrow="Surfaces" title="The three materials the page is built from">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded border border-line bg-surface p-6">
            <p className="label">Panel</p>
            <p className="text-sm text-ink-muted">
              Surface plus a hairline. Used for grouped content and spec blocks.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded border border-line bg-surface-raised p-6">
            <p className="label">Raised</p>
            <p className="text-sm text-ink-muted">
              One step up. Reserved for the work overlay and inline code.
            </p>
          </div>
          <div className="flex flex-col gap-2 rounded border border-line-soft p-6">
            <p className="label">Bare</p>
            <p className="text-sm text-ink-muted">
              No fill, soft hairline only. The default — most of the page is this.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="label">Section divider</p>
          <div className="rule" />
        </div>
      </Section>

      <Section eyebrow="Motion" title="Slow, few, and reversible">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { token: "micro", value: "180ms", note: "hover, focus, color" },
            { token: "ui", value: "320ms", note: "overlay, nav state" },
            { token: "reveal", value: "700ms", note: "section entrance" },
          ].map((m) => (
            <div key={m.token} className="flex flex-col gap-1 rounded border border-line bg-surface p-5">
              <span className="label">{m.token}</span>
              <span className="font-mono text-lead tabular-nums text-accent">{m.value}</span>
              <span className="text-sm text-ink-dim">{m.note}</span>
            </div>
          ))}
        </div>
        <div className="rounded border border-line bg-surface p-6">
          <p className="animate-rise-in measure text-base text-ink-muted">
            This paragraph uses the entrance animation the sections will share — a 700ms rise on the
            soft ease. With <span className="font-mono text-steel">prefers-reduced-motion</span> set,
            it appears instantly and the page still reads as composed.
          </p>
        </div>
      </Section>
    </main>
  )
}
