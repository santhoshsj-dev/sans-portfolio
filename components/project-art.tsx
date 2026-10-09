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
  return <div className={`project-art art-${project.palette}${compact ? " is-compact" : ""}`} role="img" aria-label={`${project.title} editorial concept visual`} style={style}>
    <span className="art-index">SAN / SELECTED WORK {project.number}</span>
    <span className="art-note">{priority ? "CONCEPT VISUAL" : "EDITORIAL CONCEPT"}</span>
  </div>;
}
