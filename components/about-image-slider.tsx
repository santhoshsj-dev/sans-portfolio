"use client";

import Image from "next/image";
import { ImageReveal } from "@/components/image-reveal";
import { useMemo, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import type { CoreConfig } from "smooothy";
import { useSmooothy } from "@/components/use-smooothy";

type SliderImage = {
  src: string;
  alt: string;
};

type AboutImageSliderProps = {
  images: SliderImage[];
};

export function AboutImageSlider({ images }: AboutImageSliderProps) {
  const viewportRef = useRef<HTMLElement>(null);
  const reducedMotionRef = useRef(false);
  const wasDraggingRef = useRef(false);
  const resumeAutoplayAtRef = useRef(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = preference.matches;
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  const config = useMemo<Partial<CoreConfig>>(
    () => ({
      infinite: true,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.45,
      speedDecay: 0.88,
      scrollInput: false,
      virtualScroll: {
        mouseMultiplier: 0.5,
        touchMultiplier: 2,
        firefoxMultiplier: 30,
        useKeyboard: false,
        passive: true,
      },
      onUpdate: (slider) => {
        if (slider.isDragging) {
          wasDraggingRef.current = true;
        } else if (wasDraggingRef.current) {
          wasDraggingRef.current = false;
          resumeAutoplayAtRef.current = performance.now() + 800;
        }

        if (
          !reducedMotionRef.current &&
          !slider.isDragging &&
          performance.now() >= resumeAutoplayAtRef.current
        ) {
          slider.target -=
            ((slider.itemWidths[0] || slider.viewport.wrapperWidth) / 36) *
            slider.deltaTime;
        }

        slider.items.forEach((group, index) => {
          const images = group.querySelectorAll("img");
          const position = slider.parallaxValues?.[index] ?? 0;
          const shift = reducedMotionRef.current
            ? 0
            : Math.max(
                -2,
                Math.min(2, (position / (slider.itemWidths[0] || 1)) * 2),
              );
          images.forEach((image) => {
            image.style.transform = reducedMotionRef.current
              ? ""
              : `translate3d(${shift}%, 0, 0) scale(1.04)`;
          });
        });
      },
    }),
    [],
  );
  const sliderRef = useSmooothy(viewportRef, config);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const groupWidth = slider.itemWidths[0] || slider.viewport.wrapperWidth;
    slider.target +=
      (event.key === "ArrowLeft" ? 1 : -1) * (groupWidth / 3);
  };

  return (
    <section
      className="figma-about__collage"
      aria-label="Selected images"
      aria-roledescription="carousel"
      tabIndex={0}
      ref={viewportRef}
      onKeyDown={handleKeyDown}
    >
      {[0, 1].map((copy) => (
        <div
          className="figma-about__collage-group"
          aria-hidden={copy === 1 ? true : undefined}
          key={copy}
        >
          {images.map(({ src, alt }, index) => (
            <div className="figma-about__collage-item" key={src}>
              <ImageReveal fill staggerIndex={index}>
                <Image
                  src={src}
                  alt={copy === 0 ? alt : ""}
                  fill
                  draggable={false}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 47vw"
                />
              </ImageReveal>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
