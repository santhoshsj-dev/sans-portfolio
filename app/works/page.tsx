import type { Metadata } from "next";
import { ShowreelPlayer } from "@/components/showreel-player";
import { FigmaWorksGallery } from "@/components/figma-works-gallery";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";

export const metadata: Metadata = { title: "Works" };

export default function WorkPage() {
  return (
    <div className="figma-page figma-works">
      <FigmaPageHero
        titleId="works-title"
        title="Works"
        imageSrc="/figma-home/hero-right.png"
        imageAlt="A quiet, foggy landscape"
        imageSizes="(max-width: 600px) 100vw, 41vw"
        priority
      />
      <section
        className="figma-works__reel"
        aria-labelledby="works-showreel-title"
      >
        <h2 id="works-showreel-title">Showreel</h2>
        <ShowreelPlayer />
      </section>
      <section className="figma-works__projects">
        <h2>the rest.</h2>
        <FigmaWorksGallery />
      </section>
      <FigmaPageCallout />
    </div>
  );
}
