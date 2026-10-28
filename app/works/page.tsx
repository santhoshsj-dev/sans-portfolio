import type { Metadata } from "next";
import { ShowreelPlayer } from "@/components/showreel-player";
import { FigmaWorksGallery } from "@/components/figma-works-gallery";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";
import { getProjects, getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "Works" };

export default async function WorkPage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);
  const { works } = content;
  return (
    <div className="figma-page figma-works">
      <FigmaPageHero
        titleId="works-title"
        title={works.heroTitle}
        imageSrc={works.heroImage}
        imageAlt={works.heroImageAlt}
        imageSizes="(max-width: 600px) 100vw, 41vw"
        priority
      />
      <section
        className="figma-works__reel"
        aria-labelledby="works-showreel-title"
      >
        <h2 id="works-showreel-title">{works.showreelTitle}</h2>
        <ShowreelPlayer videoUrl={works.showreelUrl} thumbnail={works.showreelThumbnail || undefined} />
      </section>
      <section className="figma-works__projects">
        <h2>{works.projectsTitle}</h2>
        <FigmaWorksGallery projects={projects} filters={works.filters} />
      </section>
      <FigmaPageCallout />
    </div>
  );
}
