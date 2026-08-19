import Image from "next/image"
import { Github, Linkedin } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary-types"
import { Sequence, Step } from "./motion"

/**
 * The statement leads; the job title is demoted to the mono meta line, where
 * a recruiter can still find it and a client does not have to read it first.
 *
 * The circular greyscale avatar is gone — the portrait returns in the Approach
 * section (phase 05), at a size where it supports rather than decorates.
 */

const LINKS = [
  { href: "https://www.linkedin.com/in/danielramg/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/DanielRagi", label: "GitHub", Icon: Github },
]

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* The single ambient light source on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60rem 40rem at 78% -10%, rgb(var(--steel) / 0.06), transparent 62%), radial-gradient(48rem 34rem at 6% 8%, rgb(var(--accent) / 0.04), transparent 60%)",
        }}
      />

      <Sequence className="mx-auto w-full max-w-shell px-gutter pb-20 pt-32" delay={0.1}>
        <Step>
          <p className="label">
            {dict.hero.role} <span className="text-line">/</span> {dict.hero.location}
          </p>
        </Step>

        <Step>
          <h1 className="mt-6 max-w-[16ch] text-display font-display font-bold text-ink">
            {dict.hero.statement}
          </h1>
        </Step>

        <Step>
          <p className="mt-8 max-w-measure font-body text-lead font-light text-ink-muted">
            {dict.hero.support}
          </p>
        </Step>

        <Step>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <p className="font-mono text-meta uppercase text-ink-dim">{dict.hero.current}</p>

            <div className="flex items-center gap-4">
              {LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-dim transition-colors duration-micro ease-out-soft hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
              <a
                href="https://www.fiverr.com/s/R7KqEPx"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 transition-opacity duration-micro ease-out-soft hover:opacity-100"
              >
                <Image src="/fiverr.png" alt="" width={18} height={18} aria-hidden="true" />
                <span className="sr-only">Fiverr</span>
              </a>
            </div>
          </div>
        </Step>
      </Sequence>
    </section>
  )
}
