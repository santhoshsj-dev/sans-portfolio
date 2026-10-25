import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { FigmaPageCallout } from "@/components/figma-page-callout";
import { FigmaPageHero } from "@/components/figma-page-hero";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <div className="figma-page figma-contact">
    <FigmaPageHero
      titleId="contact-title"
      eyebrow="DON’T BE SHY"
      title={<>contact<br />me.</>}
      imageSrc="/figma-home/hero-right.png"
      imageAlt="A quiet, foggy landscape"
      imageSizes="(max-width: 600px) 100vw, 41vw"
      priority
    />
    <section className="figma-contact__form-section" aria-label="Contact form">
      <h2>say hello.</h2><ContactForm />
    </section>
    <FigmaPageCallout />
  </div>;
}
