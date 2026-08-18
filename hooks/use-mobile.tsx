"use client"

import { useCallback, useSyncExternalStore } from "react"

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

/**
 * Reads the media query through useSyncExternalStore rather than an effect,
 * so the first client render already has the right value and no setState
 * happens during an effect.
 */
export function useIsMobile() {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(QUERY)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, [])

  // The server has no viewport; assume desktop and let hydration correct it.
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
