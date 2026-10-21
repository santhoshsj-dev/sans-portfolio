"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/lib/projects";
import { AnimatedLabel } from "@/components/animated-label";

const SLIDE_DURATION = 520;

type ProjectPanelProps = {
  index: number;
  className: string;
  direction: number;
  ariaHidden?: boolean;
  live?: boolean;
  noScrollReveal?: boolean;
};

export function FigmaHomeCarousel() {
  const [active, setActive] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const move = (nextDirection: number) => {
    if (timer.current) clearTimeout(timer.current);
    setDirection(nextDirection);
    setOutgoing(active);
    setActive((current) =>
      (current + nextDirection + projects.length) % projects.length,
    );
    timer.current = setTimeout(() => setOutgoing(null), SLIDE_DURATION);
  };

  const renderProject = ({ index, className, direction: slideDirection, ariaHidden, live, noScrollReveal }: ProjectPanelProps) => {
    const project = projects[index];
    const featured = index === 0;
    const style = {
      "--hf-slide-in": slideDirection > 0 ? "100%" : "-100%",
      "--hf-slide-out": slideDirection > 0 ? "-100%" : "100%",
    } as CSSProperties;

    return (
      <div
        className={className}
        key={project.slug}
        style={style}
        aria-hidden={ariaHidden}
        aria-live={live ? "polite" : undefined}
      >
        <div className="home__work-card">
          <div className="home__project-title-row">
            <h3 data-no-scroll-reveal={noScrollReveal ? "" : undefined}>{project.title}</h3>
            <span>{project.year}</span>
          </div>
          <div className="home__project-tags">
            {[project.category, ...project.services.slice(0, 2)].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <Link
            href={`/works/${project.slug}`}
            className="home__project-link"
            tabIndex={ariaHidden ? -1 : undefined}
          >
            <AnimatedLabel>LEARN MORE</AnimatedLabel> <span aria-hidden="true">›</span>
          </Link>
        </div>
        <Link
          className="home__work-image"
          href={`/works/${project.slug}`}
          aria-label={`View ${project.title}`}
          tabIndex={ariaHidden ? -1 : undefined}
          data-no-scroll-reveal={noScrollReveal ? "" : undefined}
        >
          {featured ? (
            <Image
              src="/figma-home/selected-project.png"
              alt="A creative workspace photographed for the selected project"
              fill
              sizes="(max-width: 700px) 100vw, 60vw"
            />
          ) : (
            <Image
              src={`/projects/${project.slug}.svg`}
              alt={`${project.title} project artwork`}
              fill
              sizes="(max-width: 700px) 100vw, 60vw"
            />
          )}
        </Link>
      </div>
    );
  };

  return (
    <div className="home__work-feature">
      <div className="home__work-main">
        <div className="home__project-stack">
          {outgoing !== null && renderProject({
            index: outgoing,
            className: "home__project-panel home__project-panel--leaving",
            direction,
            ariaHidden: true,
          })}
          {renderProject({
            index: active,
            className: `home__project-panel${outgoing !== null ? " home__project-panel--entering" : ""}`,
            direction,
            live: true,
            noScrollReveal: outgoing !== null,
          })}
        </div>
        <div className="home__project-controls" aria-label="Featured project controls" data-no-scroll-reveal>
          <button type="button" aria-label="Previous project" onClick={() => move(-1)}>
            <svg viewBox="0 0 56 12" aria-hidden="true">
              <path d="M54 6H2M2 6l5-5M2 6l5 5" />
            </svg>
          </button>
          <button type="button" aria-label="Next project" onClick={() => move(1)}>
            <svg viewBox="0 0 56 12" aria-hidden="true">
              <path d="M2 6h52m0 0-5-5m5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="home__work-portrait" aria-hidden="true">
        <Image src="/figma-home/standing-portrait.png" alt="" fill sizes="(max-width: 700px) 0px, 40vw" />
      </div>
    </div>
  );
}
