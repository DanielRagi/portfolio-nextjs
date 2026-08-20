/** Single source of truth for anything that needs an absolute URL or an identity. */
export const site = {
  url: "https://danielramirez.pro",
  name: "Daniel Ramírez",
  legalName: "Daniel Ramírez Giraldo",
  email: "hola@danielramirez.pro",
  jobTitle: {
    en: "Full-stack engineer",
    es: "Ingeniero full-stack",
  },
  description: {
    en: "Full-stack engineer building custom platforms — online stores, internal tools, and interactive products — for companies that need more than a template.",
    es: "Ingeniero full-stack que construye plataformas a medida — tiendas en línea, herramientas internas y productos interactivos — para empresas que necesitan más que una plantilla.",
  },
  /** Every outbound link on the site. Edit a URL here and it changes everywhere. */
  links: {
    linkedin: "https://www.linkedin.com/in/danielramg/",
    github: "https://github.com/DanielRagi",
    fiverr: "https://www.fiverr.com/s/R7KqEPx",
    studio: "https://atomicstudio.dev/",
  },
} as const

/** What schema.org's `sameAs` should list: the profiles that are really him. */
export const profiles = [site.links.linkedin, site.links.github, site.links.studio]

export function absolute(path: string) {
  return new URL(path, site.url).toString()
}
