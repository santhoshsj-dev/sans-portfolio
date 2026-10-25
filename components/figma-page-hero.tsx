import Image from "next/image";
import type { ReactNode } from "react";
import { ImageReveal } from "@/components/image-reveal";

type FigmaPageHeroProps = {
  titleId: string;
  title: ReactNode;
  eyebrow?: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  priority?: boolean;
  children?: ReactNode;
};

export function FigmaPageHero({
  titleId,
  title,
  eyebrow,
  imageSrc,
  imageAlt,
  imageSizes,
  priority = false,
  children,
}: FigmaPageHeroProps) {
  return (
    <section className="figma-page__hero" aria-labelledby={titleId}>
      <div className="figma-page__hero-copy">
        {eyebrow && <span>{eyebrow}</span>}
        <h1 id={titleId}>{title}</h1>
      </div>
      <ImageReveal className="figma-page__hero-image">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={imageSizes}
        />
      </ImageReveal>
      {children}
    </section>
  );
}
