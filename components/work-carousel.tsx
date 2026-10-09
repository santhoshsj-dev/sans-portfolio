"use client";

import Link from "next/link";
import { A11y, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { projects } from "@/lib/projects";
import { ProjectArt } from "@/components/project-art";

export function WorkCarousel() {
  return <div className="carousel-shell">
    <Swiper modules={[A11y, Keyboard, Navigation]} spaceBetween={20} slidesPerView={1} keyboard={{ enabled: true }} navigation={{ nextEl: ".work-next", prevEl: ".work-prev" }} a11y={{ enabled: true, prevSlideMessage: "Previous project", nextSlideMessage: "Next project" }}>
      {projects.map((project, index) => <SwiperSlide key={project.slug}>
        <article className="featured-work">
          <div className="feature-rail"><span>0{index + 1} / 0{projects.length}</span><div className="rail-thumbs" aria-hidden="true">{projects.map((thumbnail) => <i key={thumbnail.slug} className={`rail-thumb art-${thumbnail.palette}`} />)}</div><span>SELECTED WORK</span></div>
          <Link href={`/works/${project.slug}`} className="feature-image"><ProjectArt project={project} priority={index === 0} /></Link>
          <div className="feature-info"><div className="project-card-meta"><span>{project.category}</span><span>{project.year}</span></div><Link href={`/works/${project.slug}`}><h3>{project.title}</h3></Link><p>{project.summary}</p><div className="feature-tags">{project.services.slice(0, 3).map((service) => <span key={service}>{service}</span>)}</div><Link className="learn-link" href={`/works/${project.slug}`}>LEARN MORE <b>↗</b></Link></div>
        </article>
      </SwiperSlide>)}
    </Swiper>
    <div className="carousel-controls"><button className="work-prev" aria-label="Previous project">←</button><button className="work-next" aria-label="Next project">→</button></div>
  </div>;
}
