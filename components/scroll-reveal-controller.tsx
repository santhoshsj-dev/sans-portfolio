"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

const revealSelector = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "li",
  "a",
  "button",
  "label",
  "small",
  "strong",
  "em",
  "span",
  "img",
  '[role="img"]',
  ".type__eyebrow",
  ".site-footer__label",
  ".site-footer__statement",
].join(",");

export function ScrollRevealController() {
  const lenis = useLenis();

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !lenis
    ) {
      return;
    }

    const pending = new Set<Element>();
    const revealVisible = () => {
      const revealLine = window.innerHeight * 0.92;
      pending.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top > revealLine || bounds.bottom < 0) return;
        element.setAttribute("data-scroll-reveal", "visible");
        pending.delete(element);
      });
    };

    const revealWithin = (root: ParentNode) => {
      if (root instanceof Element && root.matches(revealSelector)) {
        prepare(root);
      }
      root.querySelectorAll(revealSelector).forEach(prepare);
    };

    const prepare = (element: Element) => {
      if (element.closest("[data-no-scroll-reveal]")) return;
      if (element.hasAttribute("data-scroll-reveal")) return;
      if (element.matches("span") && element.parentElement?.closest(revealSelector)) return;
      element.setAttribute("data-scroll-reveal", "pending");
      pending.add(element);
    };

    revealWithin(document);
    revealVisible();
    const unsubscribeFromLenis = lenis.on("scroll", revealVisible);
    window.addEventListener("resize", revealVisible);
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) revealWithin(node);
        });
      });
      revealVisible();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      unsubscribeFromLenis();
      window.removeEventListener("resize", revealVisible);
      mutationObserver.disconnect();
    };
  }, [lenis]);

  return null;
}
