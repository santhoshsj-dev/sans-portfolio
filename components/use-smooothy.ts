"use client";

import { useEffect, useRef, type RefObject } from "react";
import Core, { type CoreConfig } from "smooothy";

/** Owns the Smooothy instance and its animation loop for one slider element. */
export function useSmooothy(
  wrapperRef: RefObject<HTMLElement | null>,
  config: Partial<CoreConfig>,
) {
  const sliderRef = useRef<Core | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const slider = new Core(wrapper, config);
    sliderRef.current = slider;
    let frame = 0;

    const update = () => {
      slider.update();
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      slider.destroy();
      sliderRef.current = null;
    };
  }, [wrapperRef, config]);

  return sliderRef;
}
