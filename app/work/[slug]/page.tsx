import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { ProjectArt } from "@/components/project-art";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProject(slug)?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return <>
    <section className="project-detail-hero"><div className="container"><Link className="back-link" href="/works">← ALL WORKS</Link><div className="project-detail-heading"><div><span className="eyebrow">{project.category} · {project.year}</span><h1>{project.title}<span className="serif-accent">.</span></h1><div className="feature-tags">{project.services.map((service) => <span key={service}>{service}</span>)}</div></div><p>{project.summary}</p></div></div></section>
    <section className="project-spread"><div className="project-spread-visual"><ProjectArt project={project} priority /><span className="spread-caption">{project.title.toUpperCase()} · EDITORIAL CONCEPT VISUAL</span></div><div className="project-spread-story"><div className="project-sticky-label"><span>{project.category.toUpperCase()}</span><span>{project.year}</span></div><div className="project-facts"><div><span>CLIENT</span><strong>{project.client}</strong></div><div><span>ROLE</span><strong>{project.role}</strong></div><div><span>SERVICES</span><strong>{project.services.join(" · ")}</strong></div><div><span>YEAR</span><strong>{project.year}</strong></div></div><span className="eyebrow">THE OUTCOME</span><h2>{project.outcome}</h2><p>{project.description}</p><span className="story-note">Project imagery and detailed process copy are replaceable placeholders pending approved case study assets.</span><div className="story-gallery"><ProjectArt project={project} compact /><ProjectArt project={{ ...project, palette: projects[(index + 1) % projects.length].palette }} compact /></div><div className="related-row"><span>RELATED SERVICES</span><p>{project.services.join(" · ")}</p></div></div></section>
    <section className="next-project container"><span className="eyebrow">UP NEXT</span><Link href={`/works/${next.slug}`}><span>{next.number} / {next.category}</span><h2>{next.title} <i>↗</i></h2></Link><Link className="text-link" href="/works">BACK TO ALL WORKS <span>↗</span></Link></section>
    <section className="home-cta section-pad"><div className="container home-cta-inner"><div><span className="eyebrow">LIKE WHAT YOU SEE?</span><h2>Let’s make<br /><span className="serif-accent">something.</span></h2><Link className="button button-light" href="/contact">GET IN TOUCH <span>↗</span></Link></div></div></section>
  </>;
}
