import Link from "next/link";
import { Project } from "@/lib/projects";
import { Reveal } from "@/components/scroll-reveal";
import { ProjectArt } from "@/components/project-art";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={index % 2 ? 0.09 : 0} className="project-card__wrapper">
      <Link className="project-card" href={`/works/${project.slug}`}>
        <ProjectArt project={project} compact priority={index < 2} />
        <div className="project-card__meta"><span>{project.category}</span><span>{project.year}</span></div>
        <div className="project-card__title"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
        <p>{project.category} · {project.year}</p>
      </Link>
    </Reveal>
  );
}
