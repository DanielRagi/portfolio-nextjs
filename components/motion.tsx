"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

/**
 * The whole motion system, in one place.
 *
 * Replaces the old AnimatedSection + useInView pair, which re-ran its observer
 * on every render and re-hid content when you scrolled back up. Reveals now
 * fire once and stay.
 *
 * Timings mirror the --duration-* / --ease-*-soft tokens in globals.css.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const DURATION = 0.7

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}

/** Parent that staggers its Rise children — used for the hero load sequence. */
export function Sequence({
  children,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      animate="shown"
      variants={{
        shown: { transition: { delayChildren: delay, staggerChildren: reduced ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** A single step of a Sequence. */
export function Step({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.div className={className} variants={reduced ? undefined : riseIn}>
      {children}
    </motion.div>
  )
}

/** Scroll-triggered reveal. Fires once; never re-hides. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: riseIn.hidden,
        shown: {
          ...(riseIn.shown as object),
          transition: { duration: DURATION, ease: EASE, delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
