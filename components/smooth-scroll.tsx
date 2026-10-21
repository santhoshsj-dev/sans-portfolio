"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const preventNativeSelection = (event: Event) => event.preventDefault();
    const preventSelectionShortcuts = (event: KeyboardEvent) => {
      const selectsAll = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a";
      const extendsSelection = event.shiftKey && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key);
      if (selectsAll || extendsSelection) event.preventDefault();
    };

    document.addEventListener("contextmenu", preventNativeSelection);
    document.addEventListener("selectstart", preventNativeSelection);
    document.addEventListener("keydown", preventSelectionShortcuts, true);
    return () => {
      document.removeEventListener("contextmenu", preventNativeSelection);
      document.removeEventListener("selectstart", preventNativeSelection);
      document.removeEventListener("keydown", preventSelectionShortcuts, true);
    };
  }, []);

  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ autoRaf: true, anchors: true, lerp: 0.09, duration: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
