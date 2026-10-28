import Image from "next/image";
import Link from "next/link";
import { ImageReveal } from "@/components/image-reveal";
import { getSiteContent } from "@/lib/content";

export async function FigmaPageCallout() {
  const { global } = await getSiteContent();
  return (
    <>
      <section className="figma-page__callout">
        <div className="figma-page__callout-title">
          <span>{global.calloutEyebrow}</span>
          <h2>{global.calloutTitle}</h2>
        </div>
        <div className="figma-page__callout-copy">
          <p>{global.calloutText}</p>
          <Link href="/contact">{global.calloutLinkLabel}</Link>
        </div>
        <ImageReveal className="figma-page__callout-image">
          <Image
            src={global.calloutImage}
            alt={global.calloutImageAlt}
            fill
            sizes="(max-width: 600px) 100vw, 692px"
          />
        </ImageReveal>
      </section>
    </>
  );
}
