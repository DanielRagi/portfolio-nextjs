import projects from "@/lib/projects.json";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <section id="proyectos" className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-10">Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}