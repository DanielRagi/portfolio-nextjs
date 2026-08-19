import { ArrowUpRight } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary-types"
import { site } from "@/lib/site"
import { Reveal } from "./motion"

/**
 * A real band, not a nav link that sent people off-site in the first five
 * seconds. For a client, "there is a studio behind him" is a trust signal.
 */
export default function Studio({ dict }: { dict: Dictionary }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-8 rounded border border-line bg-surface p-8 sm:p-10">
        <div className="flex flex-col gap-4">
          {/* h2, not h3: this band carries no Section title, so this is the
              section's own heading and must not skip a level. */}
          <h2 className="max-w-[18ch] font-display text-h2 font-semibold text-ink">
            {dict.studio.title}
          </h2>
          <p className="max-w-measure font-body text-base text-ink-muted">{dict.studio.body}</p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line-soft pt-6">
          {dict.studio.services.map((service) => (
            <li key={service} className="font-mono text-meta uppercase text-ink-dim">
              {service}
            </li>
          ))}
        </ul>

        <a
          href={site.links.studio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded border border-accent/40 px-4 py-2.5 font-mono text-meta uppercase text-accent transition-colors duration-micro ease-out-soft hover:border-accent hover:bg-accent/10"
        >
          {dict.studio.cta}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </Reveal>
  )
}
