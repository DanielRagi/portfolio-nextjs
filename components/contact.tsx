"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import type { Dictionary } from "@/lib/dictionary-types"
import { site } from "@/lib/site"

const ELSEWHERE = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Fiverr", href: site.links.fiverr, icon: "/fiverr.png" },
]

/**
 * The close. The old footer was a single centred line with no way to reach
 * him — the most expensive omission on a site written for clients.
 */
export default function Contact({ dict }: { dict: Dictionary }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked by permissions; the mailto link still works.
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <p className="max-w-measure font-body text-lead font-light text-ink-muted">
          {dict.contact.body}
        </p>

        <p className="inline-flex w-fit items-center gap-2 font-mono text-meta uppercase text-ink-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
          {dict.contact.availability}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${site.email}`}
          className="font-display text-h2 font-semibold text-ink transition-colors duration-ui ease-out-soft hover:text-accent"
        >
          {site.email}
        </a>

        <button
          type="button"
          onClick={copy}
          aria-label={dict.contact.copy}
          className="inline-flex items-center gap-1.5 rounded border border-line px-2.5 py-1.5 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:border-ink-dim hover:text-ink"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-live" aria-hidden="true" />
              {dict.contact.copied}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.contact.copy}
            </>
          )}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? dict.contact.copied : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3 border-t border-line-soft pt-6">
        <p className="label">{dict.contact.elsewhere}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {ELSEWHERE.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:text-accent"
              >
                {link.icon ? (
                  <Image src={link.icon} alt="" width={14} height={14} className="opacity-70" />
                ) : null}
                {link.label}
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
