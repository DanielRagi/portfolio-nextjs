"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { i18n, type Locale } from "@/lib/i18n-config"
import { setCookie } from "@/lib/cookies"
import type { Dictionary } from "@/lib/dictionary-types"

export default function LanguageSwitch({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        trigger.current?.focus()
      }
    }

    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const switchTo = (next: Locale) => {
    setOpen(false)
    if (next === lang) return

    setCookie("NEXT_LOCALE", next, 365)
    // Swap only the leading locale segment, so deep links survive the switch.
    router.push(pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${next}`))
  }

  return (
    <div className="relative" ref={container}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={dict.language.label}
        className="flex items-center gap-1.5 rounded border border-line px-2.5 py-1.5 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:border-ink-dim hover:text-ink"
      >
        {lang}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-micro ease-out-soft ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded border border-line bg-surface-raised"
        >
          {i18n.locales.map((locale) => (
            <button
              key={locale}
              role="menuitem"
              type="button"
              onClick={() => switchTo(locale)}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left font-body text-sm transition-colors duration-micro ease-out-soft hover:bg-surface ${
                locale === lang ? "text-ink" : "text-ink-muted"
              }`}
            >
              {dict.language[locale]}
              {locale === lang && <Check className="ml-auto h-3.5 w-3.5 text-accent" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
