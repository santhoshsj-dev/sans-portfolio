import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "About" };

const toolkit = [
  { title: "Design", items: "Photoshop · Illustrator · InDesign · Figma · Adobe XD · Canva" },
  { title: "Motion", items: "After Effects · Premiere Pro · LottieFiles · CapCut" },
  { title: "Digital", items: "HTML · CSS · JavaScript · Next.js · Responsive email" },
  { title: "Creative practice", items: "Art direction · Identity · Campaigns · Packaging · Social" },
];

export default function AboutPage() {
  return <>
    <section className="about-hero container"><span className="eyebrow">A LITTLE ABOUT ME</span><h1>THE<br /><span>designer.</span></h1><div className="about-hero-image" role="img" aria-label="Botanical campaign concept image" /><p>Curious by nature.<br />Thoughtful by design.</p></section>
    <section className="about-story section-pad"><div className="container about-story-grid"><div className="about-photo" role="img" aria-label="Wellness campaign concept image" /><Reveal><span className="eyebrow">THIS IS ME</span><h2>Hey, I’m<br /><span className="serif-accent">Santhosh.</span></h2><div className="prose"><p>I’m a Chennai-based graphic and motion designer with over two years of experience creating clear, impactful visuals across digital, print and social platforms.</p><p>At Drig Digital, I work across D2C, retail, food and beverage, and entertainment — shaping campaigns, brand systems, event visuals and social content. I enjoy finding the visual direction, making the work, and helping the team ship it well.</p><p>My approach is simple: understand what the work needs to do, then make it feel unmistakably like itself.</p></div><Link href="/contact" className="text-link">LET’S TALK <span>↗</span></Link></Reveal></div></section>
    <section className="skills-section section-pad"><div className="container"><div className="section-heading"><div><span className="eyebrow">TOOLS OF THE TRADE</span><h2>Build. Design.<br /><span className="serif-accent">Make.</span></h2></div><p>A flexible mix of design, motion, web and collaboration skills, picked for the work at hand.</p></div><div className="skills-list">{toolkit.map((skill, index) => <div className="skill-row" key={skill.title}><span>0{index + 1}</span><h3>{skill.title}</h3><p>{skill.items}</p></div>)}</div></div></section>
    <section className="experience-section section-pad"><div className="container"><div className="experience-heading"><span className="eyebrow">EXPERIENCE</span><h2>Work in<br /><span className="serif-accent">progress.</span></h2></div><div className="experience-content"><div className="experience-list"><article><div className="experience-date">APR 2024 — NOW</div><div><h3>Graphic Designer</h3><p>Drig Digital <span>· Chennai</span></p><ul><li>Lead a five-person design team across 40+ brand accounts.</li><li>Improved on-time creative delivery from 60% to 100% in two months.</li><li>Make campaign, motion, event and brand assets across channels.</li></ul></div><span className="experience-kind">FULL TIME</span></article><article><div className="experience-date">JUL 2023 — APR 2024</div><div><h3>Graphic Design Intern</h3><p>Race Innovations <span>· Chennai</span></p><ul><li>Created identity systems, magazine layouts and campaign creative.</li><li>Produced digital, print and out-of-home marketing assets.</li></ul></div><span className="experience-kind">INTERNSHIP</span></article></div><div className="experience-photo" role="img" aria-label="Live event concept image" /></div></div></section>
    <section className="home-cta section-pad"><div className="container home-cta-inner"><div><span className="eyebrow">GOOD WORK STARTS WITH A HELLO</span><h2>Have a project<br /><span className="serif-accent">in mind?</span></h2><Link className="button button-light" href="/contact">GET IN TOUCH <span>↗</span></Link></div><div className="cta-portrait" role="img" aria-label="Concert concept image" /></div></section>
  </>;
}
