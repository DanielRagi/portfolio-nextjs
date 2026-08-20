import type en from "@/dictionaries/en.json"

/**
 * The shape of a translation bundle, derived from the English source so the
 * two can never drift apart silently — if es.json loses a key, the build fails.
 *
 * Kept out of lib/dictionary.ts because that module is `server-only`; client
 * components import this type and nothing else.
 */
export type Dictionary = typeof en
