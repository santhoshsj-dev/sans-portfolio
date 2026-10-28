import defaults from "@/content/portfolio-defaults.json";

export type Project = {
  id?: string;
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
  featured?: boolean;
  order?: number;
  coverImage?: string;
  coverImageAlt?: string;
  cardImage?: string;
  cardImageAlt?: string;
  gallery?: { src: string; alt: string }[];
};

export const projects = defaults.projects as Project[];
