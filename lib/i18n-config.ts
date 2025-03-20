export const i18n = {
  defaultLocale: "es" as const,
  locales: ["es", "en"] as const,
}

export type Locale = (typeof i18n)["locales"][number]

