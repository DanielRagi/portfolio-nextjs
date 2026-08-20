"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { m, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Overlay chrome for a case study reached from the work index.
 *
 * The panel is only the frame — the case study itself is server-rendered and
 * passed in as children, so the overlay and the standalone page at
 * /[lang]/work/[slug] render the exact same markup.
 *
 * Dismissal always goes through router.back(), so the browser's back button,
 * Escape, the close control and the backdrop all end in the same state, and
 * the index underneath keeps its scroll position because it never unmounted.
 */
export default function CasePanel({
  lang,
  dict,
  slug,
  prevSlug,
  nextSlug,
  position,
  total,
  children,
}: {
  lang: Locale
  dict: Dictionary
  slug: string
  prevSlug: string
  nextSlug: string
  position: number
  total: number
  children: ReactNode
}) {
  const router = useRouter()
  const panel = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  // Lock the page behind the overlay. The padding compensates for the
  // scrollbar the lock removes, so the layout underneath does not jump.
  useEffect(() => {
    const { body, documentElement } = document
    const gap = window.innerWidth - documentElement.clientWidth
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight }

    body.style.overflow = "hidden"
    if (gap > 0) body.style.paddingRight = `${gap}px`

    return () => {
      body.style.overflow = previous.overflow
      body.style.paddingRight = previous.paddingRight
    }
  }, [])

  // Move focus in on open, and hand it back to the row that opened this on
  // close. The index is still mounted underneath, so the row is there to take it.
  useEffect(() => {
    closeButton.current?.focus()

    return () => {
      const trigger = document.querySelector<HTMLElement>(`[data-work-row="${slug}"]`)
      trigger?.focus()
    }
  }, [slug])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        router.back()
        return
      }

      // replace(), not push() — arrowing through projects should not build a
      // history stack you have to unwind to get back to the index.
      if (event.key === "ArrowRight" && total > 1) {
        router.replace(`/${lang}/work/${nextSlug}`, { scroll: false })
        return
      }
      if (event.key === "ArrowLeft" && total > 1) {
        router.replace(`/${lang}/work/${prevSlug}`, { scroll: false })
        return
      }

      if (event.key !== "Tab" || !panel.current) return

      const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [router, lang, prevSlug, nextSlug, total])

  return (
    <div className="fixed inset-0 z-50">
      <m.div
        className="absolute inset-0 bg-ground/85 backdrop-blur-sm"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => router.back()}
        aria-hidden="true"
      />

      <m.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={`${slug} — ${position} / ${total}`}
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        initial={reduced ? false : { opacity: 0, scale: 0.985, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="min-h-full bg-ground">
          <div className="sticky top-0 z-10 border-b border-line-soft bg-ground/90 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-gutter py-4">
              <button
                ref={closeButton}
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 font-mono text-meta uppercase text-ink-muted transition-colors duration-micro ease-out-soft hover:text-ink"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                {dict.work.close}
              </button>

              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-meta uppercase text-ink-dim sm:inline">
                  {dict.work.keyboardHint}
                </span>
                <span className="font-mono text-meta tabular-nums text-ink-dim">
                  {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {children}
        </div>
      </m.div>
    </div>
  )
}
