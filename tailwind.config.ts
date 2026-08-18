import type { Config } from "tailwindcss"

/** Wraps a channel-triplet CSS variable so opacity modifiers keep working. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    // The palette is deliberately closed: no Tailwind default colors, so a
    // stray `text-gray-400` fails loudly instead of quietly drifting off-system.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ground: token("ground"),
      surface: token("surface"),
      "surface-raised": token("surface-raised"),
      line: token("line"),
      "line-soft": token("line-soft"),
      ink: token("ink"),
      "ink-muted": token("ink-muted"),
      "ink-dim": token("ink-dim"),
      accent: token("accent"),
      steel: token("steel"),
      live: token("live"),
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Georgia", "Times New Roman", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — the scale, and nothing outside it.
        label: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.19em" }],
        meta: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.08em" }],
        sm: ["0.9375rem", { lineHeight: "1.6" }],
        base: ["1.0625rem", { lineHeight: "1.65" }],
        lead: ["1.1875rem", { lineHeight: "1.6" }],
        h3: ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.008em" }],
        h2: ["clamp(1.75rem, 3.5vw, 2.5rem)", { lineHeight: "1.14", letterSpacing: "-0.022em" }],
        h1: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        display: ["clamp(3rem, 8vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.038em" }],
      },
      borderRadius: {
        DEFAULT: "3px",
        sm: "2px",
        md: "3px",
        lg: "4px",
      },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)",
        gutter: "clamp(1.25rem, 5vw, 3rem)",
      },
      maxWidth: {
        shell: "72rem",
        measure: "34rem",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        micro: "180ms",
        ui: "320ms",
        reveal: "700ms",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(1.25rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "rise-in": "rise-in 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
}

export default config
