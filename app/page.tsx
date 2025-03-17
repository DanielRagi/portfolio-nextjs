import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import projects from "@/lib/projects.json";

interface Project {
  name: string;
  link: string;
  desc: string;
  tags: string[];
  image: string;
}

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative">
  <Link
    href="/" className="text-xl font-medium bg-clip-text text-transparent inline-block"
    style={{
      backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
    }}
  >
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
            Soy{" "}
            <span
              className="text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
              }}
            >
              Daniel.
            </span>
          </h2>
          <p className="text-[#8a8a8a] mb-2">Programador Full Stack | Ingeniero Informático</p>
          <p className="text-[#8a8a8a] mb-6 max-w-lg">
            Transformo ideas en código y código en impacto. Me gusta resolver problemas con soluciones lógicas e
            innovadoras. Actualmente programando en Universitas XXI.
          </p>
          <div className="flex space-x-4">
            <Link href="https://www.linkedin.com/in/danielramg/" className="hover:text-[#ffda44] transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://github.com/DanielRagi" className="hover:text-[#ffda44] transition-colors">
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
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
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

function ProjectCard({ name, link, desc, tags, image }: Project) {
  return (
    <div className="bg-[#1e1e1e] border border-[#484747] rounded-lg overflow-hidden">
      <div className="relative h-48">
        <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Link
            href={link}
            className="px-3 py-1 text-sm rounded transition-colors border border-transparent"
            style={{
              backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              borderImage: "linear-gradient(to right, #A2D0EE, #D4AAD8) 1",
            }}
          >
            Visitar
          </Link>
        </div>
        <p className="text-[#8a8a8a] text-sm mb-4">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded text-[#1e1e1e]"
              style={{
                backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

