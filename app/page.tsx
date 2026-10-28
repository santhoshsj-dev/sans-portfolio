import Image from "next/image";
import Link from "next/link";
import { AnimatedLabel } from "@/components/animated-label";
import { FigmaHomeCarousel } from "@/components/figma-home-carousel";
import { HomeWorkMarquee } from "@/components/home-work-marquee";
import { ImageReveal } from "@/components/image-reveal";
import { ScrollMorphImage, ScrollMorphSlot } from "@/components/scroll-morph-image";
import { getFeaturedProjects, getSiteContent } from "@/lib/content";

/* eslint @next/next/no-img-element: "off" */

export default async function HomePage() {
  const [content, projects] = await Promise.all([getSiteContent(), getFeaturedProjects()]);
  const { home, global } = content;
  return (
    <div className="home">
      <section className="home__hero" aria-label="Santhosh S. portfolio">
        <div className="home__hero-photos">
          <ImageReveal fill className="home__hero-photo home__hero-photo--left">
            <Image
              src={home.heroLeftImage}
              alt={home.heroLeftImageAlt}
              fill
              priority
              sizes="(max-width: 700px) 70vw, 70vw"
            />
          </ImageReveal>
          <ImageReveal fill staggerIndex={1} className="home__hero-photo home__hero-photo--right">
            <Image
              src={home.heroRightImage}
              alt={home.heroRightImageAlt}
              fill
              priority
              sizes="(max-width: 700px) 30vw, 30vw"
            />
          </ImageReveal>
        </div>
        <div className="home__identity">
          <h1 className="home__hero-wordmark">
            sans<span>.</span>
          </h1>
          <div className="home__identity-roles">
            {home.roles.map((role) => (
              <span aria-label={role} key={role}><AnimatedLabel>{role}</AnimatedLabel></span>
            ))}
          </div>
          <div className="home__identity-portrait">
            <img
              className="home__portrait-light-desktop"
              src="/figma-home/portrait-illustration.svg"
              alt="Illustration portrait"
            />
            <div className="home__portrait-dark-desktop" aria-hidden="true">
              <img src="/figma-home/portrait-illustration-dark.svg" alt="" />
              <img
                className="home__portrait-details"
                src="/figma-home/portrait-details-dark.svg"
                alt=""
              />
            </div>
            <img
              className="home__portrait-light-tablet"
              src="/figma-home/portrait-illustration-tablet.svg"
              alt="Illustration portrait"
            />
            <div className="home__portrait-dark-tablet" aria-hidden="true">
              <img
                src="/figma-home/portrait-illustration-tablet-dark.svg"
                alt=""
              />
              <img
                className="home__portrait-details"
                src="/figma-home/portrait-details-tablet-dark.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <div className="home__content">
        <section className="home__section home__designer">
          <header className="home__section-heading">
            <span>THE</span>
            <h2>designer.</h2>
          </header>
          <ScrollMorphImage
            src={home.introImage}
            alt={home.introImageAlt}
          >
            <div className="home__introduction">
              <div className="home__bio">
                <p>
                  {home.introText}
                </p>
                <Link href="/about" className="home__outline-link" aria-label="Learn more">
                  <AnimatedLabel>LEARN MORE</AnimatedLabel>
                </Link>
              </div>
              <ScrollMorphSlot slot="source" className="home__intro-image" />
            </div>
            <ScrollMorphSlot slot="destination" className="home__portrait-feature" />
          </ScrollMorphImage>
        </section>

        <section className="home__section home__selected-works" id="selected-work">
          <header className="home__section-heading">
            <span>SELECTED</span>
            <h2>works.</h2>
          </header>
          <FigmaHomeCarousel projects={projects} portraitImage={home.carouselPortrait} />
          <HomeWorkMarquee label={global.workMarqueeLabel} />
        </section>

        <section className="home__section home__services">
          <header className="home__section-heading">
            <span>MY</span>
            <h2>services.</h2>
          </header>
          <div className="home__service-list">
            {home.services.map((service, index) => (
              <article className="home__service-row" key={service.title}>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ImageReveal className="home__service-image" staggerIndex={index}>
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 700px) 33vw, 30vw"
                  />
                </ImageReveal>
              </article>
            ))}
          </div>
        </section>

        <section className="home__section home__contact" id="contact">
          <header className="home__section-heading">
            <span>{global.calloutEyebrow}</span>
            <h2>{global.calloutTitle}</h2>
          </header>
          <div className="home__contact-row">
            <div className="home__contact-copy">
              <p>{global.calloutText}</p>
              <Link href="/contact" className="home__outline-link" aria-label="Contact me">
                <AnimatedLabel>CONTACT ME</AnimatedLabel>
              </Link>
            </div>
            <ImageReveal className="home__contact-image">
              <Image
                src={global.calloutImage}
                alt={global.calloutImageAlt}
                fill
                sizes="(max-width: 700px) 100vw, 58vw"
              />
            </ImageReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
