import type { ReactNode } from "react";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Retained for existing call sites; images now render without a reveal. */
  staggerIndex?: number;
  fill?: boolean;
};

export function ImageReveal({
  children,
  className = "",
  fill = false,
}: ImageRevealProps) {
  return (
    <span
      className={`image-reveal${fill ? " image-reveal--fill" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
