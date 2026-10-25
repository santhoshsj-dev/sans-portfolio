import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/image-reveal";

export function FigmaPageCallout() {
  return (
    <>
      <section className="figma-page__callout">
        <div className="figma-page__callout-title">
          <span>WANT TO</span>
          <h2>chat.</h2>
        </div>
        <div className="figma-page__callout-copy">
          <p>Got a project in mind? I&apos;d love to hear about it.</p>
          <Link href="/contact">CONTACT ME</Link>
        </div>
        <ImageReveal className="figma-page__callout-image">
          <Image
            src="/figma-home/contact.png"
            alt="A candid creative portrait"
            fill
            sizes="(max-width: 600px) 100vw, 692px"
          />
        </ImageReveal>
      </section>
    </>
  );
}
