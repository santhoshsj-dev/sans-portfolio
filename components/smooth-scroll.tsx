"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode } from "react";

function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathname = useRef(pathname);

  const scrollToTop = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [lenis]);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const frame = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, scrollToTop]);

  return null;
}

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

  if (reduce) {
    return (
      <>
        <RouteScrollReset />
        {children}
      </>
    );
  }
  return (
    <ReactLenis root options={{ autoRaf: true, anchors: true, lerp: 0.09, duration: 1.1, smoothWheel: true, stopInertiaOnNavigate: true }}>
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
