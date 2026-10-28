import defaults from "@/content/portfolio-defaults.json";
import { sanityQuery } from "@/lib/sanity/client";
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

const defaultContent = defaults.siteContent as SiteContent;

const SITE_CONTENT_QUERY = `*[_type == "siteContent" && _id == "siteContent"][0]{
  home{roles[],"heroLeftImage":heroLeftImage.asset->url,heroLeftImageAlt,"heroRightImage":heroRightImage.asset->url,heroRightImageAlt,"carouselPortrait":carouselPortrait.asset->url,introText,"introImage":introImage.asset->url,introImageAlt,services[]{title,items[],"image":image.asset->url,imageAlt}},
  about{heroEyebrow,heroTitle,"heroImage":heroImage.asset->url,heroImageAlt,introLabel,introTitle,introHeadline,bio,"bioImage":bioImage.asset->url,bioImageAlt,collage[]{"image":image.asset->url,alt},experienceLabel,experienceHeadline,experience[]{date,role,company,companyUrl,place,type}},
  works{heroTitle,"heroImage":heroImage.asset->url,heroImageAlt,showreelTitle,showreelUrl,"showreelThumbnail":showreelThumbnail.asset->url,projectsTitle,filters[]},
  contact{heroEyebrow,heroTitle,"heroImage":heroImage.asset->url,heroImageAlt,formTitle,nameLabel,emailLabel,phoneLabel,messageLabel,submitLabel},
  global{contactEmail,menuPrompt,menuCta,workMarqueeLabel,calloutEyebrow,calloutTitle,calloutText,calloutLinkLabel,"calloutImage":calloutImage.asset->url,calloutImageAlt,"footerImage":footerImage.asset->url,socialLinks[]{label,url}}
}`;

const PROJECTS_QUERY = `*[_type == "project" && published == true] | order(order asc, _createdAt asc){
  "id":_id,"slug":slug.current,title,category,client,year,role,services[],summary,outcome,description,palette,number,featured,order,
  "coverImage":coverImage.asset->url,"coverImageAlt":coverImage.alt,"cardImage":cardImage.asset->url,"cardImageAlt":cardImage.alt,
  gallery[]{"src":asset->url,alt}
}`;

export async function getSiteContent(): Promise<SiteContent> {
  const content = await sanityQuery<Partial<SiteContent>>(SITE_CONTENT_QUERY, {}, ["sanity:siteContent"]);
  if (!content) return defaultContent;
  return {
    home: mergeContent(defaultContent.home, content.home),
    about: mergeContent(defaultContent.about, content.about),
    works: mergeContent(defaultContent.works, content.works),
    contact: mergeContent(defaultContent.contact, content.contact),
    global: mergeContent(defaultContent.global, content.global),
  };
}

export async function getProjects(): Promise<Project[]> {
  const items = await sanityQuery<Project[]>(PROJECTS_QUERY, {}, ["sanity:project"]);
  const source = items ?? (defaults.projects as Project[]);
  return source.map((project, index) => ({
    ...project,
    services: project.services || [],
    number: project.number || String(index + 1).padStart(2, "0"),
    palette: project.palette || "ink",
  }));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return featured.length ? featured : projects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

function mergeContent<T>(fallback: T, incoming?: Partial<T>): T {
  if (incoming == null) return fallback;
  if (Array.isArray(fallback)) {
    if (!Array.isArray(incoming)) return fallback;
    return incoming.map((value, index) => {
      const defaultValue = fallback[index];
      return defaultValue && value && typeof value === "object"
        ? mergeContent(defaultValue, value as Partial<typeof defaultValue>)
        : value;
    }) as T;
  }
  if (fallback && typeof fallback === "object" && incoming && typeof incoming === "object") {
    const result = { ...(fallback as Record<string, unknown>) };
    for (const [key, value] of Object.entries(incoming)) {
      const defaultValue = result[key];
      result[key] = value == null
        ? defaultValue
        : defaultValue && typeof defaultValue === "object" && typeof value === "object"
          ? mergeContent(defaultValue, value as never)
          : value;
    }
    return result as T;
  }
  return incoming as T;
}
