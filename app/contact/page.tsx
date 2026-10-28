import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage() {
  const { contact, global } = await getSiteContent();
  const [titleLineOne, ...titleRemainder] = contact.heroTitle.split("\n");
  const titleLineTwo = titleRemainder.join(" ");
  return <div className="figma-page figma-contact">
    <FigmaPageHero
      titleId="contact-title"
      eyebrow={contact.heroEyebrow}
      title={<>{titleLineOne}<br />{titleLineTwo}</>}
      imageSrc={contact.heroImage}
      imageAlt={contact.heroImageAlt}
      imageSizes="(max-width: 600px) 100vw, 41vw"
      priority
    />
    <section className="figma-contact__form-section" aria-label="Contact form">
      <h2>{contact.formTitle}</h2><ContactForm email={global.contactEmail} labels={contact} />
    </section>
    <FigmaPageCallout />
  </div>;
}
