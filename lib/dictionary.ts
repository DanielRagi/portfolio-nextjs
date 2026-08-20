import "server-only"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/dictionary-types"

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]()
