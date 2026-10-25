"use client";

import Link from "next/link";
import NextImage from "next/image";
import { ImageReveal } from "@/components/image-reveal";
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects";

const filters = [
  "Printable",
  "WordPress",
  "Framer",
  "Illustrations",
  "Web Design",
  "Motion Graphics",
  "Social Media",
];
const imageByPalette: Record<string, string> = {
  red: "/figma-pages/works/tednercuts.png",
  ink: "/figma-pages/works/vermello.png",
  orange: "/figma-pages/works/tednercuts.png",
  cream: "/figma-pages/works/vermello.png",
};
const pageCount = 8;
const pageSize = 2;

function pageItems(currentPage: number): Array<number | "…"> {
  if (currentPage <= 3) return [1, 2, 3, "…", pageCount] as const;
  if (currentPage >= pageCount - 2)
    return [1, "…", pageCount - 2, pageCount - 1, pageCount] as const;
  return [
    1,
    "…",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "…",
    pageCount,
  ] as const;
}

export function FigmaWorksGallery() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [page, setPage] = useState(2);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        !activeFilter ||
        [project.category, ...project.services].some((item) =>
          item.toLocaleLowerCase().includes(activeFilter.toLocaleLowerCase()),
        );
      return matchesFilter;
    });
  }, [activeFilter]);

  const visibleProjects = useMemo(() => {
    if (!filteredProjects.length) return [];
    const start = ((page - 1) * pageSize) % filteredProjects.length;
    return Array.from(
      { length: Math.min(pageSize, filteredProjects.length) },
      (_, index) => filteredProjects[(start + index) % filteredProjects.length],
    );
  }, [filteredProjects, page]);

  const setFilter = (value: string) => {
    setActiveFilter((current) => (current === value ? null : value));
    setPage(1);
  };

  return (
    <div className="figma-works__gallery">
      <div
        className="figma-works__filters"
        aria-label="Filter projects by category"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={activeFilter === filter ? "is-active" : ""}
            aria-pressed={activeFilter === filter}
            onClick={() => setFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {visibleProjects.length ? (
        <div className="figma-works__grid" aria-live="polite">
          {visibleProjects.map((project) => (
            <Link
              className="figma-works__card"
              href={`/works/${project.slug}`}
              key={project.slug}
            >
              <ImageReveal className="figma-works__card-image" staggerIndex={visibleProjects.indexOf(project) % 2}>
                <NextImage
                  src={imageByPalette[project.palette]}
                  alt={`${project.title} project`}
                  fill
                  sizes="(max-width: 600px) 100vw, 50vw"
                />
              </ImageReveal>
              <div className="figma-works__card-info">
                <h3>{project.title}</h3>
                <span>{project.category}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="figma-works__empty" role="status">
          No work matches your search.
        </p>
      )}
      {filteredProjects.length > 0 && (
        <nav className="figma-works__pagination" aria-label="Project pages">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            PREVIOUS
          </button>
          {pageItems(page).map((item, index) =>
            item === "…" ? (
              <span key={`ellipsis-${index}`} aria-hidden="true">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={page === item ? "is-active" : ""}
                aria-current={page === item ? "page" : undefined}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
            disabled={page === pageCount}
          >
            NEXT
          </button>
        </nav>
      )}
    </div>
  );
}
