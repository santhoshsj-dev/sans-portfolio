export type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  year: string;
  role: string;
  services: string[];
  summary: string;
  outcome: string;
  description: string;
  palette: "red" | "ink" | "cream" | "orange";
  number: string;
};

export const projects: Project[] = [
  {
    slug: "kriti-herbals",
    title: "Kriti Herbals",
    category: "Performance campaign",
    client: "Drig Digital",
    year: "2026",
    role: "Concept, scripting & motion design",
    services: ["Meta ads", "Motion graphics", "Campaign adaptation"],
    summary: "Turning a herbal brand story into a performance-led campaign.",
    outcome: "10× revenue from the reel campaign · 5× from a static creative",
    description:
      "A complete reel campaign for a D2C herbal brand, from the visual concept through scripting, editing, and regional-language adaptations. The campaign became a top-performing creative on the Meta ad account. A companion static ad also delivered a strong result.",
    palette: "red",
    number: "01",
  },
  {
    slug: "ilaiyaraaja-live",
    title: "Ilaiyaraaja Live",
    category: "Live event identity",
    client: "Drig Digital",
    year: "2025",
    role: "Creative lead",
    services: ["Event identity", "Stage visuals", "Social campaign", "Print"],
    summary: "A complete visual world for a live concert in Bengaluru.",
    outcome: "2M+ campaign reach · 20,000+ attendees",
    description:
      "Led design execution across event identity, stage visuals, social campaign, promotional reels, and print collateral, coordinating a cross-functional creative team through a live-event production timeline.",
    palette: "ink",
    number: "02",
  },
  {
    slug: "dehab-india",
    title: "Dehab India",
    category: "Brand & social",
    client: "Freelance",
    year: "2026",
    role: "Creative partner",
    services: ["Social content", "Packaging", "Print collateral"],
    summary: "A cohesive creative direction across content and packaging.",
    outcome: "A hero creative delivered a 15× sales uplift",
    description:
      "End-to-end creative production for a D2C brand, spanning social media content, packaging design, and print collateral. A hero creative set the visual direction for the brand’s ongoing content strategy.",
    palette: "orange",
    number: "03",
  },
  {
    slug: "manoranganz-events",
    title: "Manoranganz Events",
    category: "Event design",
    client: "Freelance",
    year: "2024 — Present",
    role: "Design partner",
    services: ["Event identity", "Environmental graphics", "Print"],
    summary: "A flexible event design system made for many kinds of gathering.",
    outcome: "Creative delivered across 60+ offline events",
    description:
      "An ongoing design partnership supporting corporate gatherings, marathons, reunions, team outings, and sports events across India. Deliverables include banners, standees, stage backdrops, brochures, arches, entry points, and event identity systems.",
    palette: "cream",
    number: "04",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
