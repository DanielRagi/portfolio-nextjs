import Image from "next/image";
import Link from "next/link";

interface Project {
  name: string;
  link: string;
  desc: string;
  tags: string[];
  image: string;
}

export default function ProjectCard({ name, link, desc, tags, image }: Project) {
  return (
    <div className="bg-[#1e1e1e] border border-[#484747] rounded-lg overflow-hidden min-h-[344px]">
      <div className="relative h-48">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          {link !== "" && (
            <a
              href={link}
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
              Visitar
            </a>
          )}
        </div>
        <p className="text-[#8a8a8a] text-sm mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded text-[#1e1e1e]"
              style={{ backgroundImage: "linear-gradient(to right, #A2D0EE, #D4AAD8)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}