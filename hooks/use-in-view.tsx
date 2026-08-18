"use client"

import { useEffect, useRef, useState } from "react"

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  /** Stop observing after the first intersection, so content never re-hides. */
  once?: boolean
}

export function useInView<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px",
  once = false,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  // Options are destructured to primitives on purpose: taking the options
  // object as a dependency re-ran this effect on every render, because callers
  // pass an object literal.
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return

        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isInView }
}
