import { compile, run } from "@mdx-js/mdx"
import type { MDXComponents } from "mdx/types"
import * as runtime from "react/jsx-runtime"

/**
 * Renders a case study body from MDX. Compiles on the server at build time
 * (every route using it is statically generated), so nothing here reaches
 * the client bundle.
 *
 * The component map is the whole prose style — Daniel writes plain markdown
 * headings and paragraphs, and they come out on-system without him touching
 * a class name.
 */

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="label mt-12 first:mt-0 scroll-mt-24">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display text-h3 font-semibold text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 max-w-measure font-body text-base text-ink-muted">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 flex max-w-measure flex-col gap-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 flex max-w-measure list-decimal flex-col gap-2 pl-5">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-5 font-body text-base text-ink-muted marker:text-ink-dim [ol>&]:pl-0">
      <span
        className="absolute left-0 top-[0.72em] h-px w-2 bg-ink-dim [ol>li>&]:hidden"
        aria-hidden="true"
      />
      {children}
    </li>
  ),
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="border-b border-accent/40 text-accent transition-colors duration-micro ease-out-soft hover:border-accent"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded border border-line-soft bg-surface-raised px-1.5 py-0.5 font-mono text-meta text-steel">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 max-w-measure border-l border-accent/50 pl-5 font-body text-base italic text-ink-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-0 border-t border-line-soft" />,
}

export default async function CaseStudyBody({ source }: { source: string }) {
  const compiled = await compile(source, { outputFormat: "function-body" })
  const { default: Content } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
  })

  return <Content components={components} />
}
