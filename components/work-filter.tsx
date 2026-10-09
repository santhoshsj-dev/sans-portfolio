"use client";

import { useMemo, useState } from "react";
import { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

const filters = ["All", "Brand", "Campaign", "Event", "Motion"];

export function WorkFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => projects.filter((project) => {
    const category = `${project.category} ${project.services.join(" ")}`.toLowerCase();
    const matchesFilter = active === "All" || category.includes(active.toLowerCase()) || (active === "Brand" && /brand|herbal|wellness/.test(category)) || (active === "Event" && /event|concert/.test(category)) || (active === "Motion" && /motion|reel/.test(category));
    return matchesFilter && `${project.title} ${project.category}`.toLowerCase().includes(query.toLowerCase());
  }), [active, query, projects]);

  return <div className="work-index">
    <div className="work-tools"><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" /></label><div className="filter-list" role="group" aria-label="Filter projects">{filters.map((filter) => <button key={filter} type="button" className={active === filter ? "active" : ""} aria-pressed={active === filter} onClick={() => setActive(filter)}>{filter}</button>)}</div></div>
    <p className="results-count">SHOWING {String(visible.length).padStart(2, "0")} PROJECT{visible.length === 1 ? "" : "S"}</p>
    {visible.length ? <div className="project-grid">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div> : <p className="empty-results">No projects match that search. Try another term.</p>}
  </div>;
}
