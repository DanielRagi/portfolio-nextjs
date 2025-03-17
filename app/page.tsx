import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-medium">
          Daniel Ramírez
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:text-[#ffda44] transition-colors">
            Inicio
          </Link>
          <Link href="#proyectos" className="hover:text-[#ffda44] transition-colors">
            Proyectos
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/3 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">Hello World.</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Soy <span className="text-[#d9d9d9]">Daniel.</span>
          </h2>
          <p className="text-[#8a8a8a] mb-2">Programador Full Stack | Ingeniero Informático</p>
          <p className="text-[#8a8a8a] mb-6 max-w-lg">
            Transformo ideas en código y código en impacto. Me gusta resolver problemas con soluciones lógicas e
            innovadoras. Actualmente programando en Universitas XXI.
          </p>
          <div className="flex space-x-4">
            <Link href="https://linkedin.com" className="hover:text-[#ffda44] transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://github.com" className="hover:text-[#ffda44] transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="rounded-full overflow-hidden w-64 h-64 mx-auto">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Daniel Ramírez"
              width={256}
              height={256}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10">Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-[#8a8a8a]">
        <p>From 🇨🇴 to the world.</p>
      </footer>
    </div>
  )
}

function ProjectCard() {
  return (
    <div className="bg-[#1e1e1e] border border-[#484747] rounded-lg overflow-hidden">
      <div className="relative h-48">
          <div className="bg-[#d9d9d9] h-full"></div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
          <Link
            href="#"
            className="px-3 py-1 border border-[#8a8a8a] text-sm rounded hover:bg-[#484747] transition-colors"
          >
            Visitar
          </Link>
        </div>
        <p className="text-[#8a8a8a] text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a auctor odio, ac volutpat enim.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-[#484747] text-xs rounded text-[#d9d9d9]">JavaScript</span>
          <span className="px-2 py-1 bg-[#484747] text-xs rounded text-[#d9d9d9]">Node.js</span>
          <span className="px-2 py-1 bg-[#484747] text-xs rounded text-[#d9d9d9]">Django</span>
        </div>
      </div>
    </div>
  )
}

