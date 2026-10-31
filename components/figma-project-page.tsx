import Image from "next/image";
import Link from "next/link";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import type { Project } from "@/lib/projects";

function projectImage(project: Project) {
  return project.coverImage || project.cardImage || `/projects/${project.slug}.svg`;
}

function ProjectArtwork({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Image
      src={projectImage(project)}
      alt={project.coverImageAlt || project.cardImageAlt || `${project.title} project artwork`}
      fill
      priority={priority}
      unoptimized={projectImage(project).endsWith(".svg")}
      sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 96px), 1200px"
    />
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="figma-project__suggested-card" href={`/works/${project.slug}`}>
      <div className="figma-project__suggested-image">
        <ProjectArtwork project={project} />
      </div>
      <div className="figma-project__suggested-info">
        <div>
          <h3>{project.title}</h3>
          <span>{project.category}</span>
        </div>
        <span className="figma-project__arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}

export function FigmaProjectPage({
  project,
  projects,
}: {
  project: Project;
  projects: Project[];
}) {
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const suggested = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <div className="figma-page figma-project">
      <div className="figma-project__band">
        <div className="figma-project__frame">
          <nav className="figma-project__breadcrumb" aria-label="Project navigation">
            <Link href="/works"><span aria-hidden="true">←</span> ALL WORKS</Link>
            <span>{project.category.toUpperCase()}</span>
          </nav>
        </div>
      </div>

      <header className="figma-project__band">
        <div className="figma-project__frame figma-project__title-band">
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
      </header>

      <div className="figma-project__band">
        <div className="figma-project__frame">
          <div className="figma-project__cover">
            <ProjectArtwork project={project} priority />
          </div>
        </div>
      </div>

      <section className="figma-project__band" aria-labelledby="project-overview">
        <div className="figma-project__frame figma-project__overview">
          <div className="figma-project__overview-title">
            <h2 id="project-overview">Overview</h2>
          </div>
          <div className="figma-project__overview-copy">
            <p>{project.description || project.summary}</p>
            {project.outcome && <p>{project.outcome}</p>}
            <a href="#project-facts">VIEW FULL PROJECT</a>
          </div>
        </div>
      </section>

      <section className="figma-project__band" aria-label="Project details">
        <div className="figma-project__frame figma-project__facts" id="project-facts">
          <div>
            <span>CLIENT</span>
            <p>{project.client}</p>
          </div>
          <div>
            <span>SERVICES</span>
            <div className="figma-project__service-values">
              <span>{project.role}</span>
              {project.services.map((service) => <p key={service}>{service}</p>)}
            </div>
          </div>
          <div>
            <span>YEAR</span>
            <p>{project.year}</p>
          </div>
        </div>
      </section>

      {Boolean(project.gallery?.length) && (
        <section className="figma-project__gallery" id="project-gallery" aria-label={`${project.title} project images`}>
          {project.gallery?.map(({ src, alt }, imageIndex) => (
            <div className="figma-project__band" key={`${src}-${imageIndex}`}>
              <div className="figma-project__frame">
                <div className="figma-project__gallery-image">
                  <Image
                    src={src}
                    alt={alt || `${project.title} project image ${imageIndex + 1}`}
                    fill
                    unoptimized={src.endsWith(".svg")}
                    sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 96px), 1200px"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="figma-project__band" aria-label="Browse projects">
        <div className="figma-project__frame figma-project__project-nav">
          <Link href={`/works/${previous.slug}`}>
            <span aria-hidden="true">←</span> PREVIOUS PROJECT
          </Link>
          <Link href={`/works/${next.slug}`}>
            NEXT PROJECT <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="figma-project__band" aria-labelledby="more-work-title">
        <div className="figma-project__frame figma-project__more-heading">
          <h2 id="more-work-title">more work.</h2>
        </div>
      </section>

      <section className="figma-project__band" aria-label="Suggested projects">
        <div className="figma-project__frame figma-project__suggested">
          {suggested.map((item) => <ProjectCard key={item.slug} project={item} />)}
        </div>
      </section>

      <FigmaPageCallout />
    </div>
  );
}
