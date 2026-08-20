import { z } from "zod"
import { i18n, type Locale } from "@/lib/i18n-config"

/**
 * A string that must exist in every supported language. Built from i18n.locales
 * so adding a language makes the build demand the new translations rather than
 * silently accepting the old ones.
 */
const localizedString = z
  .object(
    Object.fromEntries(i18n.locales.map((locale) => [locale, z.string().min(1)])) as Record<
      Locale,
      z.ZodString
    >,
  )
  .strict()

/**
 * The contract for a project. Everything here is enforced at build time —
 * a project that violates it fails `next build` rather than shipping a
 * half-rendered card.
 *
 * Content is split in two on purpose:
 *   meta.json   — facts that must NOT diverge between languages (year, stack,
 *                 links, images). One copy, so es and en can never disagree.
 *   <locale>.mdx — everything a human reads, translated per language.
 */

const CURRENT_YEAR = new Date().getFullYear()

/** Public-directory path, e.g. "/projects/cognitive-playroom/hero.webp". */
const assetPath = z
  .string()
  .min(1)
  .regex(/^\/[^?#]*\.(webp|avif|png|jpg|jpeg|svg)$/i, {
    message:
      "must be a root-relative path to an image file with no query string (Next 16 requires images.localPatterns for those)",
  })

export const projectStatusSchema = z.enum(["live", "archived", "in-progress"])

export const projectMetaSchema = z
  .object({
    year: z
      .number()
      .int()
      .min(2015, { message: "before Daniel started shipping — likely a typo" })
      .max(CURRENT_YEAR + 1),
    status: projectStatusSchema,
    /**
     * Featured projects keep a full row and a case study in the work index.
     * Everything else drops into the compact archive list once the collection
     * outgrows the index — see the Work section plan.
     */
    featured: z.boolean().default(true),
    /** Explicit sort position; ties fall back to year descending. */
    order: z.number().int().min(0),
    stack: z.array(z.string().min(1)).min(1, { message: "list at least one technology" }),
    links: z
      .object({
        live: z.string().url().optional(),
        source: z.string().url().optional(),
      })
      .default({}),
    images: z.object({
      hero: assetPath,
      /**
       * Detail shots carry meaning — a flow, a specific screen — so each one
       * needs alt text in every language. They used to render with alt="",
       * which told a screen reader they were decorative.
       */
      details: z
        .array(z.object({ src: assetPath, alt: localizedString }).strict())
        .default([]),
    }),
  })
  .strict()

export const projectFrontmatterSchema = z
  .object({
    name: z.string().min(1),
    /** What Daniel did on it — translated, so it lives here and not in meta. */
    role: z.string().min(1),
    /** One line for the work index row. Kept short on purpose. */
    summary: z.string().min(1).max(180, {
      message: "the index row is one line — keep it under 180 characters",
    }),
  })
  .strict()

export type ProjectStatus = z.infer<typeof projectStatusSchema>
export type ProjectMeta = z.infer<typeof projectMetaSchema>
export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>
