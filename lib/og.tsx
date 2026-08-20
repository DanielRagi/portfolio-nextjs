import { readFile } from "node:fs/promises"
import path from "node:path"

/**
 * Shared furniture for the generated Open Graph cards.
 *
 * Fonts come from the @fontsource packages rather than hand-downloaded
 * binaries: versioned, licensed, and shipped as .woff, which satori reads
 * (it cannot read the .woff2 that next/font uses for the site itself).
 */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = "image/png"

const FONT_FILES = {
  display: "@fontsource/archivo/files/archivo-latin-700-normal.woff",
  mono: "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff",
}

async function loadFont(relative: string) {
  return readFile(path.join(process.cwd(), "node_modules", relative))
}

export async function ogFonts() {
  const [display, mono] = await Promise.all([
    loadFont(FONT_FILES.display),
    loadFont(FONT_FILES.mono),
  ])

  return [
    { name: "Archivo", data: display, style: "normal" as const, weight: 700 as const },
    { name: "IBM Plex Mono", data: mono, style: "normal" as const, weight: 400 as const },
  ]
}

/** Tokens, restated as literals because satori resolves no CSS variables. */
export const og = {
  ground: "#080A0E",
  surface: "#0F1218",
  line: "#1E2430",
  ink: "#E9EBF1",
  inkMuted: "#9BA1B3",
  inkDim: "#767C90",
  accent: "#E4C79C",
  steel: "#7BA6C7",
  display: "Archivo",
  mono: "IBM Plex Mono",
}

/**
 * The card. One layout for the site and for every case study, so a link to
 * any page unfurls as the same object.
 */
export function OgCard({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string
  title: string
  meta: string
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: og.ground,
        padding: "72px 80px",
        fontFamily: og.display,
      }}
    >
      {/*
        The ambient light. It has to be a real radial-gradient: satori does
        not blur, so a translucent rounded div renders as a hard-edged circle
        that reads as a mistake rather than as atmosphere.
      */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          backgroundImage:
            "radial-gradient(600px 420px at 82% 0%, rgba(123,166,199,0.13), rgba(8,10,14,0) 70%)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            fontFamily: og.mono,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: og.inkDim,
          }}
        >
          {eyebrow}
        </div>
        <div style={{ display: "flex", width: 44, height: 2, background: og.accent }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 46 ? 62 : 78,
            lineHeight: 1.05,
            letterSpacing: -2.4,
            color: og.ink,
            maxWidth: 960,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${og.line}`,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "flex", fontFamily: og.mono, fontSize: 24, color: og.inkMuted }}>
          {meta}
        </div>
        <div style={{ display: "flex", fontFamily: og.mono, fontSize: 24, color: og.accent }}>
          danielramirez.pro
        </div>
      </div>
    </div>
  )
}
