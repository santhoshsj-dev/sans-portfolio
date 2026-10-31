import defaults from "@/content/portfolio-defaults.json";
import type { Project } from "@/lib/projects";

export type ContentImage = string;
export type HomeContent = {
  roles: string[];
  heroLeftImage: ContentImage;
  heroLeftImageAlt: string;
  heroRightImage: ContentImage;
  heroRightImageAlt: string;
  carouselPortrait: ContentImage;
  introText: string;
  introImage: ContentImage;
  introImageAlt: string;
  services: { title: string; items: string[]; image: ContentImage; imageAlt: string }[];
};
export type AboutContent = {
  heroEyebrow: string; heroTitle: string; heroImage: ContentImage; heroImageAlt: string;
  introLabel: string; introTitle: string; introHeadline: string; bio: string;
  bioImage: ContentImage; bioImageAlt: string;
  collage: { image: ContentImage; alt: string }[];
  experienceLabel: string; experienceHeadline: string;
  experience: { date: string; role: string; company: string; companyUrl?: string; place: string; type: string }[];
};
export type WorksContent = {
  heroTitle: string; heroImage: ContentImage; heroImageAlt: string;
  showreelTitle: string; showreelUrl: string; showreelThumbnail?: ContentImage | null;
  projectsTitle: string; filters: string[];
};
export type ContactContent = {
  heroEyebrow: string; heroTitle: string; heroImage: ContentImage; heroImageAlt: string;
  formTitle: string; nameLabel: string; emailLabel: string; phoneLabel: string; messageLabel: string; submitLabel: string;
};
export type GlobalContent = {
  contactEmail: string; menuPrompt: string; menuCta: string; workMarqueeLabel: string; calloutEyebrow: string; calloutTitle: string; calloutText: string;
  calloutLinkLabel: string; calloutImage: ContentImage; calloutImageAlt: string;
  footerImage: ContentImage; socialLinks: { label: string; url: string }[];
};
export type SiteContent = { home: HomeContent; about: AboutContent; works: WorksContent; contact: ContactContent; global: GlobalContent };

const siteContent = defaults.siteContent as SiteContent;
const projects = defaults.projects as Project[];

export async function getSiteContent(): Promise<SiteContent> {
  return siteContent;
}

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const featured = projects.filter((project) => project.featured);
  return featured.length ? featured : projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return projects.find((project) => project.slug === slug);
}
