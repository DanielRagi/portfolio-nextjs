import coreWebVitals from "eslint-config-next/core-web-vitals"
import typescript from "eslint-config-next/typescript"

/**
 * Flat config. eslint-config-next ships native flat configs as of Next 16,
 * so no FlatCompat shim is needed.
 *
 * `next build` no longer runs linting, so lint is wired into `npm run check`
 * instead of riding along with the build.
 */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...coreWebVitals,
  ...typescript,
]

export default config
