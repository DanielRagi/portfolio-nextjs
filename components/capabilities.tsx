import type { Dictionary } from "@/lib/dictionary-types"
import { Reveal } from "./motion"

/**
 * Grouped by what a client can hire him for, not by language. A reader
 * deciding whether to send an email cares about the outcome; the stack is
 * underneath for the reader who cares about that instead.
 */
export default function Capabilities({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-3">
        {dict.capabilities.groups.map((group, index) => (
          <Reveal key={group.name} delay={index * 0.08} className="bg-ground">
            <div className="flex h-full flex-col gap-4 p-6">
              <h3 className="font-display text-h3 font-semibold text-ink">{group.name}</h3>
              <p className="flex-1 font-body text-sm text-ink-muted">{group.description}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line-soft pt-4">
                {group.stack.map((item) => (
                  <li key={item} className="font-mono text-meta text-steel">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="max-w-measure font-body text-sm text-ink-muted">{dict.capabilities.note}</p>
      </Reveal>
    </div>
  )
}
