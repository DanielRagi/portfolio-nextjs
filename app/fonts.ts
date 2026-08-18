import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google"

/**
 * Three faces, three jobs:
 *   display — headings, tight tracking, carries the page
 *   body    — running prose and case studies
 *   mono    — labels, spec keys, stacks, anything tabular
 *
 * Archivo and Newsreader are variable fonts, so no weight list is given —
 * next/font ships the full axis and the type scale picks weights from it.
 * latin-ext is included for Spanish diacritics.
 */

export const display = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
})

export const body = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
})

export const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

/** Applied once on <html> so every token-driven font-family resolves. */
export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`
