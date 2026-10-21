import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { WorkFilter } from "@/components/work-filter";
import { AnimatedLabel } from "@/components/animated-label";

export const metadata: Metadata = { title: "Works" };

export default function WorkPage() {
  return <>
    <section className="works-page__hero site-layout__container"><span className="type__eyebrow">SELECTED PROJECTS · 2023—2026</span><h1>works<span>.</span></h1><div className="works-page__hero-image" role="img" aria-label="Event campaign concept image" /><p>Good ideas, made<br />to meet the world.</p></section>
    <section className="works-page__featured-project site-layout__container"><div className="works-page__featured-project-copy"><span className="type__eyebrow">FEATURED PROJECT</span><h2>{projects[0].title}</h2><p>{projects[0].category} · {projects[0].year}</p><Link href={`/works/${projects[0].slug}`} className="site-link">EXPLORE PROJECT <span>↗</span></Link></div><Link href={`/works/${projects[0].slug}`} className="works-page__featured-project-art"><div className="project-art project-art--red" role="img" aria-label="Kriti Herbals project concept image"><span className="project-art__index">CONCEPT VISUAL</span></div></Link></section>
    <section className="works-page__grid-section site-layout__section"><div className="site-layout__container"><div className="works-page__list-heading"><div><span className="type__eyebrow">THE REST</span><h2>Selected<br /><span className="type__accent">projects.</span></h2></div><p>Search or filter the work to find a closer look.</p></div><WorkFilter projects={projects} /></div></section>
    <section className="callout site-layout__section"><div className="site-layout__container callout__inner"><div><span className="type__eyebrow">YOUR PROJECT COULD BE NEXT</span><h2>Let’s make<br /><span className="type__accent">good work.</span></h2><Link className="button button--light" href="/contact" aria-label="Start a conversation"><AnimatedLabel>START A CONVERSATION</AnimatedLabel><span>↗</span></Link></div></div></section>
  </>;
}
