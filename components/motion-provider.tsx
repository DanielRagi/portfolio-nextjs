"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Loads only the DOM animation feature set instead of the whole framer-motion
 * bundle. Every animated element on the site uses the `m` components, which
 * this provider powers — the full `motion` import would pull in layout
 * animations, drag and gestures that nothing here uses.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
