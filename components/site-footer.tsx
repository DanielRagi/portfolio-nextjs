import type { Dictionary } from "@/lib/dictionary-types"

/**
 * Minimal for now. Phase 05 replaces this with the Contact section — the
 * invitation, availability, and a click-to-copy address — and this drops to
 * the legal line beneath it.
 */
export default function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-2 px-gutter py-12">
        <p className="font-mono text-meta uppercase text-ink-dim">{dict.footer.text}</p>
        <p className="font-mono text-meta uppercase text-ink-dim tabular-nums">
          {dict.footer.name} — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
