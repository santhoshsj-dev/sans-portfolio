import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutImageSlider } from "@/components/about-image-slider";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";
import { HomeWorkMarquee } from "@/components/home-work-marquee";
import { ImageReveal } from "@/components/image-reveal";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { about, global } = await getSiteContent();
  return (
    <div className="figma-page figma-about">
      <FigmaPageHero
        titleId="about-title"
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        imageSrc={about.heroImage}
        imageAlt={about.heroImageAlt}
        imageSizes="(max-width: 600px) 100vw, 41vw"
        priority
      >
        <div className="figma-about__intro-title">
          <div>
              <span>{about.introLabel}</span>
              <h2>{about.introTitle}</h2>
          </div>
            <h2>{about.introHeadline}</h2>
        </div>
      </FigmaPageHero>

      <section className="figma-about__bio">
        <ImageReveal className="figma-about__bio-image">
          <Image
            src={about.bioImage}
            alt={about.bioImageAlt}
            fill
            sizes="(max-width: 600px) 100vw, 385px"
          />
        </ImageReveal>
        <div>
          <p>{about.bio}</p>
          <Link href="/works">LEARN MORE</Link>
        </div>
      </section>

      <AboutImageSlider images={about.collage.map(({ image, alt }) => ({ src: image, alt }))} />
      <HomeWorkMarquee label={global.workMarqueeLabel} />

      <section className="figma-about__experience">
        <div className="figma-about__experience-title">
          <span>{about.experienceLabel}</span>
          <h2>{about.experienceHeadline}</h2>
        </div>
        <div className="figma-about__experience-list">
          {about.experience.map(
            ({ date, role, company, companyUrl, place, type }) => (
              <article key={role} tabIndex={0} aria-label={`${role} at ${company}`}>
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
