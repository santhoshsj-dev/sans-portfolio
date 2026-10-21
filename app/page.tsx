import Image from "next/image";
import Link from "next/link";
import { AnimatedLabel } from "@/components/animated-label";
import { FigmaHomeCarousel } from "@/components/figma-home-carousel";
import { ScrollMorphImage, ScrollMorphSlot } from "@/components/scroll-morph-image";

/* eslint @next/next/no-img-element: "off" */

const services = [
  {
    title: "Brand & visual identity",
    items: ["Brand identity", "Art direction", "Packaging", "Campaigns"],
    image: "/figma-home/service-design.png",
    alt: "Visual identity and brand design work",
  },
  {
    title: "Social & campaigns",
    items: [
      "Social content",
      "Performance creative",
      "Motion graphics",
      "Campaign adaptation",
    ],
    image: "/figma-home/service-development.png",
    alt: "Digital campaign work on a screen",
  },
  {
    title: "Motion & live experiences",
    items: ["Event identity", "Stage visuals", "Live events", "Editorial"],
    image: "/figma-home/service-print.png",
    alt: "Live event design and print work",
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <section className="home__hero" aria-label="Santhosh S. portfolio">
        <div className="home__hero-photos">
          <Image
            src="/figma-home/hero-left.png"
            alt="Two figures standing by the sea"
            fill
            priority
            sizes="(max-width: 700px) 70vw, 70vw"
          />
          <Image
            src="/figma-home/hero-right.png"
            alt="A solitary figure at the coast"
            fill
            priority
            sizes="(max-width: 700px) 30vw, 30vw"
          />
        </div>
        <div className="home__identity">
          <h1 className="home__hero-wordmark">
            sans<span>.</span>
          </h1>
          <div className="home__identity-roles">
            <span aria-label="Digital design"><AnimatedLabel>Digital design</AnimatedLabel></span>
            <span aria-label="Development"><AnimatedLabel>Development</AnimatedLabel></span>
            <span aria-label="Print design"><AnimatedLabel>Print design</AnimatedLabel></span>
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

      <main className="home__content">
        <section className="home__section home__designer">
          <header className="home__section-heading">
            <span>THE</span>
            <h2>designer.</h2>
          </header>
          <ScrollMorphImage
            src="/figma-home/introduction.png"
            alt="Santhosh in a cinematic black-and-white portrait"
          >
            <div className="home__introduction">
              <div className="home__bio">
                <p>
                  I’m Santhosh, a Chennai-based graphic and motion designer. I
                  create clear, characterful visual stories across brand identity,
                  campaigns, social and live events.
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
          <FigmaHomeCarousel />
          <Link
            href="/works"
            className="home__work-marquee"
            aria-label="View all works"
          >
            <span className="home__marquee-track" aria-hidden="true">
              {[0, 1].map((group) => (
                <span className="home__marquee-group" key={group}>
                  {Array.from({ length: 8 }, (_, i) => (
                    <span key={i}>/　 VIEW ALL WORKS</span>
                  ))}
                </span>
              ))}
            </span>
          </Link>
        </section>

        <section className="home__section home__services">
          <header className="home__section-heading">
            <span>MY</span>
            <h2>services.</h2>
          </header>
          <div className="home__service-list">
            {services.map((service) => (
              <article className="home__service-row" key={service.title}>
                <h3>{service.title}</h3>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="home__service-image">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 700px) 33vw, 30vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home__section home__contact" id="contact">
          <header className="home__section-heading">
            <span>WANT TO</span>
            <h2>chat.</h2>
          </header>
          <div className="home__contact-row">
            <div className="home__contact-copy">
              <p>Have a project in mind? I’d love to hear about it.</p>
              <Link href="/contact" className="home__outline-link" aria-label="Contact me">
                <AnimatedLabel>CONTACT ME</AnimatedLabel>
              </Link>
            </div>
            <div className="home__contact-image">
              <Image
                src="/figma-home/contact.png"
                alt="A quiet moment overlooking the city"
                fill
                sizes="(max-width: 700px) 100vw, 58vw"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
