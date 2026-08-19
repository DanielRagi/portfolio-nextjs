import "server-only"

import { readFile, readdir, stat } from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import { i18n, type Locale } from "@/lib/i18n-config"
import {
  projectFrontmatterSchema,
  projectMetaSchema,
  type ProjectFrontmatter,
  type ProjectMeta,
} from "./schema"

const CONTENT_ROOT = path.join(process.cwd(), "content", "work")
const PUBLIC_ROOT = path.join(process.cwd(), "public")
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type Project = ProjectMeta &
  ProjectFrontmatter & {
    slug: string
    /** Raw MDX body. Compiled by the renderer, not here. */
    body: string
  }

/** Thrown with every problem found, not just the first. */
class ContentError extends Error {
  constructor(problems: string[]) {
    super(
      `\n\nContent validation failed (${problems.length} problem${problems.length === 1 ? "" : "s"}):\n` +
        problems.map((p) => `  • ${p}`).join("\n") +
        "\n",
    )
    this.name = "ContentError"
  }
}

async function fileExists(absolutePath: string) {
  try {
    return (await stat(absolutePath)).isFile()
  } catch {
    return false
  }
}

/** Every image referenced must actually be on disk, or the card renders broken. */
async function collectMissingAssets(slug: string, meta: ProjectMeta) {
  const referenced = [meta.images.hero, ...meta.images.details]
  const missing: string[] = []

  for (const asset of referenced) {
    const onDisk = path.join(PUBLIC_ROOT, asset)
    if (!(await fileExists(onDisk))) {
      missing.push(`${slug}: image "${asset}" is referenced but not present in public/`)
    }
  }

  return missing
}

function formatIssues(source: string, error: unknown) {
  if (error instanceof Error && "issues" in error) {
    const { issues } = error as { issues: Array<{ path: PropertyKey[]; message: string }> }
    return issues.map((issue) => {
      const field = issue.path.length ? issue.path.map(String).join(".") : "(root)"
      return `${source}: ${field} — ${issue.message}`
    })
  }
  return [`${source}: ${error instanceof Error ? error.message : String(error)}`]
}

async function readSlugs() {
  const entries = await readdir(CONTENT_ROOT, { withFileTypes: true })
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
}

/**
 * Loads and validates every project in every locale.
 *
 * Deliberately validates ALL locales even when only one is requested: a
 * missing Spanish translation must fail the build, not silently ship an
 * English-only page. This is the guarantee the old array-index pairing
 * between projects.json and the dictionaries could not make.
 */
async function loadAll(): Promise<Record<Locale, Project[]>> {
  const problems: string[] = []
  const slugs = await readSlugs()

  if (slugs.length === 0) {
    throw new ContentError(["no projects found in content/work"])
  }

  const byLocale = Object.fromEntries(i18n.locales.map((locale) => [locale, [] as Project[]])) as Record<
    Locale,
    Project[]
  >

  for (const slug of slugs) {
    if (!SLUG_PATTERN.test(slug)) {
      problems.push(`${slug}: directory name must be kebab-case (lowercase, hyphen-separated)`)
      continue
    }

    const dir = path.join(CONTENT_ROOT, slug)

    let meta: ProjectMeta
    try {
      const raw = JSON.parse(await readFile(path.join(dir, "meta.json"), "utf8"))
      meta = projectMetaSchema.parse(raw)
    } catch (error) {
      problems.push(...formatIssues(`${slug}/meta.json`, error))
      continue
    }

    problems.push(...(await collectMissingAssets(slug, meta)))

    for (const locale of i18n.locales) {
      const file = path.join(dir, `${locale}.mdx`)

      let source: string
      try {
        source = await readFile(file, "utf8")
      } catch {
        problems.push(`${slug}: missing ${locale}.mdx — every project needs all ${i18n.locales.length} languages`)
        continue
      }

      const { data, content } = matter(source)

      let frontmatter: ProjectFrontmatter
      try {
        frontmatter = projectFrontmatterSchema.parse(data)
      } catch (error) {
        problems.push(...formatIssues(`${slug}/${locale}.mdx`, error))
        continue
      }

      if (content.trim().length === 0) {
        problems.push(`${slug}/${locale}.mdx: has frontmatter but no case study body`)
        continue
      }

      byLocale[locale].push({ ...meta, ...frontmatter, slug, body: content })
    }
  }

  // Two projects sharing an order would sort non-deterministically between builds.
  const orders = new Map<number, string>()
  for (const project of byLocale[i18n.defaultLocale]) {
    const taken = orders.get(project.order)
    if (taken) {
      problems.push(`${project.slug}: order ${project.order} is already used by ${taken}`)
    } else {
      orders.set(project.order, project.slug)
    }
  }

  if (problems.length > 0) throw new ContentError(problems)

  for (const locale of i18n.locales) {
    byLocale[locale].sort((a, b) => a.order - b.order || b.year - a.year)
  }

  return byLocale
}

// Module-level so the filesystem is walked and validated once per build.
const projectsByLocale = loadAll()

export async function getProjects(locale: Locale): Promise<Project[]> {
  return (await projectsByLocale)[locale]
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  return (await getProjects(locale)).filter((project) => project.featured)
}

export async function getArchivedProjects(locale: Locale): Promise<Project[]> {
  return (await getProjects(locale)).filter((project) => !project.featured)
}

export async function getProject(locale: Locale, slug: string): Promise<Project | undefined> {
  return (await getProjects(locale)).find((project) => project.slug === slug)
}

/** Every slug, for generateStaticParams in phase 04. */
export async function getProjectSlugs(): Promise<string[]> {
  return (await getProjects(i18n.defaultLocale)).map((project) => project.slug)
}
