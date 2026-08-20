import Image from "next/image"
import type { Dictionary } from "@/lib/dictionary-types"
import { Reveal } from "./motion"

/**
 * Where the portrait finally appears — at a size that supports the writing
 * rather than sitting alone in a circle above it, which is what the old hero did.
 */
export default function Approach({ dict }: { dict: Dictionary }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div className="flex flex-col gap-6">
        {dict.approach.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
            <p className="max-w-measure font-body text-base text-ink-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12} className="lg:pt-1">
        <figure className="flex w-full max-w-xs flex-col gap-3">
          <div className="relative aspect-[4/5] overflow-hidden rounded border border-line bg-surface">
            <Image
              src="/profile.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 20rem, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="font-mono text-meta uppercase text-ink-dim">
            {dict.approach.portraitCaption}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  )
}
