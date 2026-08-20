# danielramirez.pro

Personal portfolio. One page, dark, bilingual (ES/EN), with a case study behind
every project.

Next 16 · React 19 · Tailwind 3 · TypeScript · deployed on Vercel.

## Commands

```bash
npm run dev        # development server
npm run check      # typecheck + lint + build — the gate before committing
npm run e2e        # Playwright, against a production build
npm run e2e:ui     # Playwright in watch mode
```

`next build` no longer runs ESLint as of Next 16, so `npm run check` is the real
gate, not `npm run build`.

## Adding a project

Adding a project is adding files. Nothing in the code is hardcoded to the
current number of them.

```
content/work/<slug>/
  meta.json    facts that must not differ between languages
  en.mdx       English case study
  es.mdx       Spanish case study
```

`meta.json`:

```json
{
  "year": 2024,
  "status": "live",          // live | archived | in-progress
  "featured": true,          // false drops it to the compact archive list
  "order": 1,                // sort position; must be unique
  "stack": ["Next.js", "Node.js"],
  "links": { "live": "https://…", "source": "https://…" },
  "images": { "hero": "/projects/…webp", "details": [] }
}
```

Each `<locale>.mdx` needs `name`, `role`, and `summary` in its frontmatter, then
the case study as ordinary markdown headings and paragraphs. The component map
in `components/case-study-body.tsx` applies the type system, so no class names
are needed in the content.

The build **fails** on: an unknown or missing field, a project missing a
language, an empty body, a summary over 180 characters, an image path not on
disk, a duplicate `order`, or a slug that is not kebab-case. Every problem is
reported at once.

## Structure

```
app/[lang]/                      the page, per locale
app/[lang]/work/[slug]/          crawlable case study
app/[lang]/@modal/(.)work/…      the same case study, intercepted as an overlay
components/                      sections
components/work/                 index, overlay, case study
content/work/                    the projects
lib/content/                     schema and loader
dictionaries/                    UI strings, ES and EN
proxy.ts                         locale negotiation (was middleware.ts pre-Next 16)
e2e/                             Playwright
```

## Design system

Tokens live in `app/globals.css` and are mapped in `tailwind.config.ts`. The
Tailwind palette is **closed** — the default colours are removed, so an
off-system class like `text-gray-400` generates nothing instead of quietly
drifting. Every ink and accent pair clears WCAG AA on the page ground.

Type: Archivo (display), Newsreader (body), IBM Plex Mono (labels).

Motion lives in `components/motion.tsx` and short-circuits entirely under
`prefers-reduced-motion`.
