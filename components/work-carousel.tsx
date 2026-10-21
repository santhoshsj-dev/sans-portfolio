"use client";

import Link from "next/link";
import { A11y, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { projects } from "@/lib/projects";
import { ProjectArt } from "@/components/project-art";
import { AnimatedLabel } from "@/components/animated-label";

export function WorkCarousel() {
  return <div className="work-carousel">
    <Swiper modules={[A11y, Keyboard, Navigation]} spaceBetween={20} slidesPerView={1} keyboard={{ enabled: true }} navigation={{ nextEl: ".work-carousel__work-next", prevEl: ".work-carousel__work-prev" }} a11y={{ enabled: true, prevSlideMessage: "Previous project", nextSlideMessage: "Next project" }}>
      {projects.map((project, index) => <SwiperSlide key={project.slug}>
        <article className="work-carousel__feature">
          <div className="work-carousel__feature-rail"><span>0{index + 1} / 0{projects.length}</span><div className="work-carousel__rail-thumbs" aria-hidden="true">{projects.map((thumbnail) => <i key={thumbnail.slug} className={`work-carousel__rail-thumb project-art--${thumbnail.palette}`} />)}</div><span>SELECTED WORK</span></div>
          <Link href={`/works/${project.slug}`} className="work-carousel__feature-image"><ProjectArt project={project} priority={index === 0} /></Link>
          <div className="work-carousel__feature-info"><div className="project-card__meta"><span>{project.category}</span><span>{project.year}</span></div><Link href={`/works/${project.slug}`}><h3>{project.title}</h3></Link><p>{project.summary}</p><div className="work-carousel__feature-tags">{project.services.slice(0, 3).map((service) => <span key={service}>{service}</span>)}</div><Link className="site-link" href={`/works/${project.slug}`}><AnimatedLabel>LEARN MORE</AnimatedLabel> <b>↗</b></Link></div>
        </article>
      </SwiperSlide>)}
    </Swiper>
    <div className="work-carousel__controls"><button className="work-carousel__work-prev" aria-label="Previous project">←</button><button className="work-carousel__work-next" aria-label="Next project">→</button></div>
  </div>;
}
