"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

type Slot = "source" | "destination";

type MorphContextValue = {
  source: RefObject<HTMLDivElement | null>;
  destination: RefObject<HTMLDivElement | null>;
};

const MorphContext = createContext<MorphContextValue | null>(null);

export function ScrollMorphImage({
  children,
  src,
  alt,
}: {
  children: ReactNode;
  src: string;
  alt: string;
}) {
  const source = useRef<HTMLDivElement>(null);
  const destination = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const lenis = useLenis();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const updatePosition = () => {
      const sourceElement = source.current;
      const destinationElement = destination.current;
      const imageElement = image.current;
      if (!sourceElement || !destinationElement || !imageElement) return;

      const sourceRect = sourceElement.getBoundingClientRect();
      const destinationRect = destinationElement.getBoundingClientRect();
      const scrollY = lenis.scroll;
      const sourceDocumentTop = sourceRect.top + scrollY;
      const destinationDocumentTop = destinationRect.top + scrollY;
      const progress = Math.min(
        1,
        Math.max(
          0,
          (scrollY - sourceDocumentTop) /
            Math.max(1, destinationDocumentTop - sourceDocumentTop),
        ),
      );
      const interpolate = (start: number, end: number) =>
        start + (end - start) * progress;

      imageElement.style.left = `${interpolate(sourceRect.left, destinationRect.left)}px`;
      imageElement.style.top = `${interpolate(sourceRect.top, destinationRect.top)}px`;
      imageElement.style.width = `${interpolate(sourceRect.width, destinationRect.width)}px`;
      imageElement.style.height = `${interpolate(sourceRect.height, destinationRect.height)}px`;
      imageElement.style.visibility = "visible";
    };

    const unsubscribe = lenis.on("scroll", updatePosition);
    const resizeObserver = new ResizeObserver(updatePosition);
    if (source.current) resizeObserver.observe(source.current);
    if (destination.current) resizeObserver.observe(destination.current);
    window.addEventListener("resize", updatePosition);
    const firstFrame = window.requestAnimationFrame(updatePosition);

    return () => {
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.cancelAnimationFrame(firstFrame);
    };
  }, [lenis, mounted]);

  return (
    <MorphContext.Provider value={{ source, destination }}>
      {children}
      {mounted &&
        createPortal(
          <img
            ref={image}
            className="home__scroll-morph-image"
            src={src}
            alt={alt}
            data-scroll-reveal="visible"
            draggable={false}
          />,
          document.body,
        )}
    </MorphContext.Provider>
  );
}

export function ScrollMorphSlot({
  slot,
  className,
}: {
  slot: Slot;
  className: string;
}) {
  const context = useContext(MorphContext);
  if (!context) throw new Error("ScrollMorphSlot must be inside ScrollMorphImage");

  return (
    <div
      ref={slot === "source" ? context.source : context.destination}
      className={className}
      aria-hidden="true"
    />
  );
}
