import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
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
          Transformo ideas en código y código en impacto. Me gusta resolver problemas con soluciones lógicas e innovadoras. Actualmente programando en Universitas XXI.
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
  );
}