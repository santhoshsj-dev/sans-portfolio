"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { CoreConfig } from "smooothy";
import { projects } from "@/lib/projects";
import { AnimatedLabel } from "@/components/animated-label";
import { ImageReveal } from "@/components/image-reveal";
import { useSmooothy } from "@/components/use-smooothy";

export function FigmaHomeCarousel() {
  const [active, setActive] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const draggedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const clearClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = preference.matches;
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      if (
        Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 8
      ) {
        draggedRef.current = true;
      }
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (pointerRef.current?.id !== event.pointerId) return;
      if (draggedRef.current) {
        suppressClickRef.current = true;
        if (clearClickTimerRef.current) {
          clearTimeout(clearClickTimerRef.current);
        }
        clearClickTimerRef.current = setTimeout(() => {
          suppressClickRef.current = false;
        }, 500);
      }
      pointerRef.current = null;
      draggedRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove, true);
    window.addEventListener("pointerup", handlePointerUp, true);
    window.addEventListener("pointercancel", handlePointerUp, true);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove, true);
      window.removeEventListener("pointerup", handlePointerUp, true);
      window.removeEventListener("pointercancel", handlePointerUp, true);
      if (clearClickTimerRef.current) {
        clearTimeout(clearClickTimerRef.current);
      }
    };
  }, []);

  const handleSlideChange = useCallback((current: number) => {
    setActive(current);
  }, []);
  const config = useMemo<Partial<CoreConfig>>(
    () => ({
      infinite: true,
      snap: true,
      variableWidth: false,
      lerpFactor: 0.4,
      snapStrength: 0.12,
      speedDecay: 0.88,
      scrollInput: false,
      virtualScroll: {
        mouseMultiplier: 0.5,
        touchMultiplier: 2,
        firefoxMultiplier: 30,
        useKeyboard: false,
        passive: true,
      },
      onSlideChange: handleSlideChange,
      onUpdate: (slider) => {
        slider.items.forEach((panel, index) => {
          const image = panel.querySelector<HTMLImageElement>(
            ".home__work-image img",
          );
          if (!image) return;
          const position = slider.parallaxValues?.[index] ?? 0;
          const shift = reducedMotionRef.current
            ? 0
            : Math.max(
                -3,
                Math.min(3, (position / (slider.viewport.wrapperWidth || 1)) * 3),
              );
          image.style.transform = reducedMotionRef.current
            ? ""
            : `translate3d(${shift}%, 0, 0) scale(1.04)`;
        });
      },
    }),
    [handleSlideChange],
  );
  const sliderRef = useSmooothy(stackRef, config);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    draggedRef.current = false;
    suppressClickRef.current = false;
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const slider = sliderRef.current;
    if (event.key === "ArrowLeft") slider?.goToPrev();
    else slider?.goToNext();
  };

  const renderProject = (index: number) => {
    const project = projects[index];
    const featured = index === 0;
    const inactive = index !== active;

    return (
      <div
        className="home__project-panel"
        key={project.slug}
        aria-hidden={inactive}
        aria-live={inactive ? undefined : "polite"}
      >
        <div className="home__work-card">
          <div className="home__project-title-row">
            <h3>{project.title}</h3>
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
            tabIndex={inactive ? -1 : undefined}
          >
            <AnimatedLabel>LEARN MORE</AnimatedLabel> <span aria-hidden="true">›</span>
          </Link>
        </div>
        <Link
          className="home__work-image"
          href={`/works/${project.slug}`}
          aria-label={`View ${project.title}`}
          tabIndex={inactive ? -1 : undefined}
        >
          <ImageReveal fill>
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
          </ImageReveal>
        </Link>
      </div>
    );
  };

  return (
    <div className="home__work-feature">
      <div className="home__work-main">
        <div
          className="home__project-stack"
          ref={stackRef}
          tabIndex={0}
          role="group"
          aria-label="Featured projects carousel"
          aria-roledescription="carousel"
          onPointerDown={handlePointerDown}
          onClickCapture={handleClickCapture}
          onKeyDown={handleKeyDown}
        >
          {projects.map((_, index) => renderProject(index))}
        </div>
        <div className="home__project-controls" aria-label="Featured project controls">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => sliderRef.current?.goToPrev()}
          >
            <svg viewBox="0 0 56 12" aria-hidden="true">
              <path d="M54 6H2M2 6l5-5M2 6l5 5" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => sliderRef.current?.goToNext()}
          >
            <svg viewBox="0 0 56 12" aria-hidden="true">
              <path d="M2 6h52m0 0-5-5m5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="home__work-portrait" aria-hidden="true">
        <ImageReveal fill>
          <Image src="/figma-home/standing-portrait.png" alt="" fill sizes="(max-width: 700px) 0px, 40vw" />
        </ImageReveal>
      </div>
    </div>
  );
}
