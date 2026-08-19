import type { ReactNode } from "react"
import { Reveal } from "./motion"

/**
 * The page rhythm. Every section is a full-bleed hairline, a mono eyebrow, and
 * a heading held to a narrow measure — the tension between the edge-to-edge
 * rule and the narrow column is where the editorial feel comes from.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow: string
  title?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="border-t border-line-soft scroll-mt-16">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-10 px-gutter py-section">
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="label">{eyebrow}</p>
            {title ? (
              <h2 className="max-w-[20ch] text-h2 font-display font-semibold text-ink">{title}</h2>
            ) : null}
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
