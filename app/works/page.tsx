import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { WorkFilter } from "@/components/work-filter";

export const metadata: Metadata = { title: "Works" };

export default function WorkPage() {
  return <>
    <section className="works-hero container"><span className="eyebrow">SELECTED PROJECTS · 2023—2026</span><h1>works<span>.</span></h1><div className="works-hero-image" role="img" aria-label="Event campaign concept image" /><p>Good ideas, made<br />to meet the world.</p></section>
    <section className="featured-project container"><div className="featured-project-copy"><span className="eyebrow">FEATURED PROJECT</span><h2>{projects[0].title}</h2><p>{projects[0].category} · {projects[0].year}</p><Link href={`/works/${projects[0].slug}`} className="text-link">EXPLORE PROJECT <span>↗</span></Link></div><Link href={`/works/${projects[0].slug}`} className="featured-project-art"><div className="project-art art-red" role="img" aria-label="Kriti Herbals project concept image"><span className="art-index">CONCEPT VISUAL</span></div></Link></section>
    <section className="work-grid-section section-pad"><div className="container"><div className="works-list-heading"><div><span className="eyebrow">THE REST</span><h2>Selected<br /><span className="serif-accent">projects.</span></h2></div><p>Search or filter the work to find a closer look.</p></div><WorkFilter projects={projects} /></div></section>
    <section className="home-cta section-pad"><div className="container home-cta-inner"><div><span className="eyebrow">YOUR PROJECT COULD BE NEXT</span><h2>Let’s make<br /><span className="serif-accent">good work.</span></h2><Link className="button button-light" href="/contact">START A CONVERSATION <span>↗</span></Link></div></div></section>
  </>;
}
