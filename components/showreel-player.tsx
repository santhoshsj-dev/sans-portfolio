"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageReveal } from "@/components/image-reveal";

export function ShowreelPlayer() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <div className="works-editorial__showreel works-editorial__showreel--playing"><iframe src="https://www.youtube-nocookie.com/embed/BXMTxpWmhIw?autoplay=1&rel=0" title="Santhosh design showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  }

  return (
    <button className="works-editorial__showreel" type="button" onClick={() => setPlaying(true)} aria-label="Play Santhosh design showreel">
      <ImageReveal fill>
        <Image className="works-editorial__thumbnail" src="https://img.youtube.com/vi/BXMTxpWmhIw/maxresdefault.jpg" alt="Santhosh design showreel video thumbnail" fill sizes="(max-width: 600px) 100vw, min(1200px, 90vw)" unoptimized />
      </ImageReveal>
      <picture>
        <source media="(max-width: 600px)" srcSet="/figma-pages/works/play-mobile.svg" />
        <source media="(max-width: 1024px)" srcSet="/figma-pages/works/play-tablet.svg" />
        <Image src="/figma-pages/works/play.svg" alt="" width={132} height={132} />
      </picture>
    </button>
  );
}
