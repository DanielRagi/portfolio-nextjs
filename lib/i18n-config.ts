export const i18n = {
  defaultLocale: "es",
  locales: ["es", "en"],
} as const

export type Locale = (typeof i18n)["locales"][number]

/** Narrows an unknown route segment to a supported locale. */
export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value)
}
