import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

const crop: Record<Project["palette"], string> = {
  red: "0% 0%",
  ink: "100% 0%",
  orange: "0% 100%",
  cream: "100% 100%",
};

export function ProjectArt({ project, compact = false, priority = false }: { project: Project; compact?: boolean; priority?: boolean }) {
  const style = { "--art-position": crop[project.palette] } as CSSProperties;
  return <div className={`project-art project-art--${project.palette}${compact ? " project-art--compact" : ""}`} role="img" aria-label={`${project.title} editorial concept visual`} style={style}>
    <span className="project-art__index">SAN / SELECTED WORK {project.number}</span>
    <span className="project-art__note">{priority ? "CONCEPT VISUAL" : "EDITORIAL CONCEPT"}</span>
  </div>;
}
