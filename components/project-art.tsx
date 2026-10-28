import type { CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

const crop: Record<Project["palette"], string> = {
  red: "0% 0%",
  ink: "100% 0%",
  orange: "0% 100%",
  cream: "100% 100%",
};

export function ProjectArt({ project, compact = false, priority = false }: { project: Project; compact?: boolean; priority?: boolean }) {
  const style = { "--art-position": crop[project.palette] } as CSSProperties;
  return <div className={`project-art project-art--${project.palette}${compact ? " project-art--compact" : ""}`} role="img" aria-label={project.coverImageAlt || `${project.title} editorial concept visual`} style={style}>
    {project.coverImage && <Image src={project.coverImage} alt="" fill sizes="(max-width: 800px) 100vw, 60vw" unoptimized={project.coverImage.endsWith(".svg")} />}
    <span className="project-art__index">SAN / SELECTED WORK {project.number}</span>
    <span className="project-art__note">{priority ? "CONCEPT VISUAL" : "EDITORIAL CONCEPT"}</span>
  </div>;
}
