import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { WorkCarousel } from "@/components/work-carousel";

const services = [
  ["01", "Brand & visual identity", "Brand identity · Art direction · Packaging"],
  ["02", "Social & campaigns", "Social content · Performance creative · Campaigns"],
  ["03", "Motion & live experiences", "Motion graphics · Event visuals · Editorial"],
];

export default function HomePage() {
  return <>
    <section className="home-opening">
      <div className="home-collage container"><div className="opening-frame opening-frame-left"><Image src="/reference/project-concepts.png" alt="Herbal campaign concept still life" fill priority sizes="(max-width: 700px) 100vw, 50vw" /></div><div className="opening-frame opening-frame-right"><Image src="/reference/project-concepts.png" alt="Concert lighting editorial concept" fill priority sizes="(max-width: 700px) 100vw, 50vw" /></div><span className="opening-side-note">DESIGN · MOTION · STORY</span></div>
      <div className="hero-signature container"><h1>sans<span>.</span></h1><div><span>GRAPHIC DESIGNER</span><span>CREATIVE LEAD</span><span>BRAND STORYTELLER</span></div></div>
      <div className="opening-caption container"><span>INDEPENDENT CREATIVE PRACTICE</span><span>CHENNAI, INDIA · 13°04′ N</span><a href="#intro">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="intro-section" id="intro"><div className="container intro-grid"><Reveal><span className="eyebrow">THE DESIGNER</span><h2>Ideas made<br />to <span className="serif-accent">move.</span></h2></Reveal><Reveal delay={.1}><div className="intro-copy"><p className="large-copy">I’m Santhosh — a graphic and motion designer shaping clear, characterful visual stories for brands and people.</p><p>Over two years in creative teams, I’ve worked across brand identity, campaigns, social, motion and live events. I care about the big idea and the little decisions that make it feel right.</p><Link href="/about" className="text-link">GET TO KNOW ME <span>↗</span></Link></div></Reveal></div></section>

    <section className="work-section section-pad" id="selected-work"><div className="container section-heading"><div><span className="eyebrow">A SELECTION OF RECENT PROJECTS</span><h2>Selected<br /><span className="serif-accent">works.</span></h2></div><p>Brand worlds, campaign ideas and experiences designed to catch attention and create a response.</p></div><div className="container"><WorkCarousel /></div><div className="container marquee-link"><Link href="/works">VIEW ALL WORKS <span>↗</span></Link></div></section>

    <section className="expertise-section section-pad"><div className="container"><div className="services-heading"><div><span className="eyebrow">WHAT I DO</span><h2>Ideas into<br /><span className="serif-accent">impact.</span></h2></div><p>Thoughtful craft across the moments where design meets people.</p></div><div className="service-table">{services.map(([index, title, items], i) => <Reveal key={index} delay={i * .08}><article className="service-row"><span className="service-index">{index}</span><h3>{title}</h3><p>{items}</p><div className={`service-visual service-visual-${index}`} role="img" aria-label={`${title} concept image`} /></article></Reveal>)}</div></div></section>

    <section className="metrics-section"><div className="container metrics-grid"><div><strong>40<span>+</span></strong><p>brand accounts and projects</p></div><div><strong>120<span>+</span></strong><p>creatives delivered monthly</p></div><div><strong>05</strong><p>designers led as a team</p></div><div className="metrics-note"><span className="eyebrow">A CREATIVE PRACTICE</span><p>Good design can look considered, work hard, and still feel human.</p></div></div></section>

    <section className="home-cta section-pad"><div className="container home-cta-inner"><div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s make<br /><span className="serif-accent">something good.</span></h2><Link className="button button-light" href="/contact">SAY HELLO <span>↗</span></Link></div><div className="cta-portrait" role="img" aria-label="Concert campaign concept image" /><a className="cta-email" href="mailto:santhoshsekar2903@gmail.com">santhoshsekar2903@gmail.com ↗</a></div></section>
  </>;
}
