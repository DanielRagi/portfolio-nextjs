"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"
import { site } from "@/lib/site"
import LanguageSwitch from "./language-switch"

/**
 * Transparent over the hero, then gains a hairline and a backdrop once you
 * scroll past it. The old bouncing scroll indicator is gone — a composed hero
 * already tells you to scroll.
 *
 * Anchors are a list so phase 05 adds Approach and Contact by extending it.
 * Only sections that actually exist are linked; a nav item that scrolls
 * nowhere is exactly the sloppiness this rebuild is against.
 */
export default function SiteNav({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Phase 05 filled in the remaining sections, so all three anchors now
  // point at something that exists.
  // `compact` anchors survive on the narrowest screens; the rest appear at sm+
  // so a 360px viewport does not have to carry five items and a switch.
  const anchors = [
    { href: "#approach", label: dict.nav.approach, compact: false },
    { href: "#work", label: dict.nav.work, compact: true },
    { href: "#contact", label: dict.nav.contact, compact: true },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-ui ease-out-soft ${
        scrolled ? "border-b border-line-soft bg-ground/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-shell items-center justify-between px-gutter py-4">
        <Link
          href={`/${lang}`}
          className="font-mono text-meta uppercase tracking-[0.18em] text-ink transition-colors duration-micro ease-out-soft hover:text-accent"
        >
          Daniel Ramírez
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className={`font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:text-ink ${
                anchor.compact ? "" : "hidden sm:inline"
              }`}
            >
              {anchor.label}
            </a>
          ))}

          <a
            href={site.links.studio}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:text-ink sm:flex"
          >
            {dict.nav.studio}
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>

          <LanguageSwitch lang={lang} dict={dict} />
        </div>
      </nav>
    </header>
  )
}
