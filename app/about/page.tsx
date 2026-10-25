import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutImageSlider } from "@/components/about-image-slider";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";
import { HomeWorkMarquee } from "@/components/home-work-marquee";
import { ImageReveal } from "@/components/image-reveal";

export const metadata: Metadata = { title: "About" };

const experience = [
  {
    date: "Aug 2026 - Present",
    role: "Creative Designer",
    company: "CureFit",
    companyUrl: "https://www.cult.fit/",
    place: "Bangalore",
    type: "Full-time",
  },
  {
    date: "Jan 2022 - Present",
    role: "Freelance Designer",
    company: "Various Clients",
    companyUrl: undefined,
    place: "Remote",
    type: "Contract",
  },
  {
    date: "Apr 2024 - Jul 2026",
    role: "Graphic Designer",
    company: "Drig Digital",
    companyUrl: "https://www.drig.digital/",
    place: "Chennai",
    type: "Full-time",
  },
  {
    date: "Nov 2023 - Apr 2024",
    role: "Graphic Designer - Intern",
    company: "Race Innovations",
    companyUrl: "https://raceinnovations.in/",
    place: "Chennai",
    type: "Part-time",
  },
];

export default function AboutPage() {
  const collageImages = [
    { src: "/figma-pages/about/bird.png", alt: "Illustrated bird" },
    { src: "/figma-pages/about/portrait.png", alt: "Portrait" },
    { src: "/figma-pages/about/silhouette.png", alt: "Silhouette" },
  ];

  return (
    <div className="figma-page figma-about">
      <FigmaPageHero
        titleId="about-title"
        eyebrow="THE"
        title="designer."
        imageSrc="/figma-home/hero-right.png"
        imageAlt="A quiet, foggy landscape"
        imageSizes="(max-width: 600px) 100vw, 41vw"
        priority
      >
        <div className="figma-about__intro-title">
          <div>
            <span>Hi, I’m Santhosh</span>
            <h2>This is me.</h2>
          </div>
          <h2>Your friendly neighborhood designer.</h2>
        </div>
      </FigmaPageHero>

      <section className="figma-about__bio">
        <ImageReveal className="figma-about__bio-image">
          <Image
            src="/figma-home/introduction.png"
            alt="Santhosh"
            fill
            sizes="(max-width: 600px) 100vw, 385px"
          />
        </ImageReveal>
        <div>
          <p>
            I&apos;m a 25-year-old web developer based in Brisbane, Australia.
            My path started in UX design, eventually graduating from QUT with a
            Bachelor of Design in Interaction Design but somewhere between
            wireframing a button and wondering how it actually worked, I fell
            down the development rabbit hole and never climbed back out.
          </p>
          <Link href="/works">LEARN MORE</Link>
        </div>
      </section>

      <AboutImageSlider images={collageImages} />
      <HomeWorkMarquee />

      <section className="figma-about__experience">
        <div className="figma-about__experience-title">
          <span>EXPERIENCE</span>
          <h2>I’m very wise.</h2>
        </div>
        <div className="figma-about__experience-list">
          {experience.map(
            ({ date, role, company, companyUrl, place, type }) => (
              <article key={role}>
                <span className="figma-about__experience-date">{date}</span>
                <div className="figma-about__experience-details">
                  <strong>{role}</strong>
                  <p>
                    <span>
                      {companyUrl ? (
                        <a
                          className="figma-about__experience-company"
                          href={companyUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {company}
                        </a>
                      ) : (
                        company
                      )}
                    </span>
                    <span>{place}</span>
                    <span>{type}</span>
                  </p>
                </div>
              </article>
            ),
          )}
        </div>
        <ImageReveal className="figma-about__experience-image">
          <Image
            src="/figma-home/introduction.png"
            alt="Santhosh"
            fill
            sizes="(max-width: 600px) 100vw, 438px"
          />
        </ImageReveal>
      </section>
      <FigmaPageCallout />
    </div>
  );
}
