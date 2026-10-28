"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageReveal } from "@/components/image-reveal";

export function ShowreelPlayer({ videoUrl, thumbnail }: { videoUrl: string; thumbnail?: string }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : videoUrl;
  const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "");

  if (playing) {
    return <div className="works-editorial__showreel works-editorial__showreel--playing"><iframe src={embedUrl} title="Santhosh design showreel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
  }

  return (
    <button className="works-editorial__showreel" type="button" onClick={() => setPlaying(true)} aria-label="Play Santhosh design showreel">
      <ImageReveal fill>
        {thumbnailUrl && <Image className="works-editorial__thumbnail" src={thumbnailUrl} alt="Santhosh design showreel video thumbnail" fill sizes="(max-width: 600px) 100vw, min(1200px, 90vw)" unoptimized />}
      </ImageReveal>
      <picture>
        <source media="(max-width: 600px)" srcSet="/figma-pages/works/play-mobile.svg" />
        <source media="(max-width: 1024px)" srcSet="/figma-pages/works/play-tablet.svg" />
        <Image src="/figma-pages/works/play.svg" alt="" width={132} height={132} />
      </picture>
    </button>
  );
}

function getYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.pathname.startsWith("/embed/") || parsed.pathname.startsWith("/shorts/")) {
      return parsed.pathname.split("/")[2] || "";
    }
    return parsed.searchParams.get("v") || "";
  } catch {
    return "";
  }
}
