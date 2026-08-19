import Image from "next/image"
import type { Project } from "@/lib/content/work"

export default function ProjectCard({ project, visitText }: { project: Project; visitText: string }) {
  const { name, summary, stack, images, links, year, status } = project

  return (
    <div className="bg-[#1e1e1e] border border-[#484747] rounded-lg overflow-hidden min-h-[344px] transition-all duration-300 ease-in-out hover:transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:z-10">
      <div className="relative h-48">
        <Image
          src={images.hero}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 text-sm rounded transition-colors border border-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                borderImage: "linear-gradient(to right, #A2D0EE, #D4AAD8) 1",
              }}
            >
              {visitText}
            </a>
          )}
        </div>
        <p className="text-[#8a8a8a] text-xs mb-2">
          {year} · {status}
        </p>
        <p className="text-[#8a8a8a] text-sm mb-4">{summary}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded text-[#1e1e1e]"
              style={{ backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
