import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import "lenis/dist/lenis.css";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    default: "Santhosh S — Graphic & Motion Designer",
    template: "%s — Santhosh S",
  },
  description:
    "Portfolio of Santhosh S, graphic and motion designer, creative lead, and brand storyteller based in India.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { global } = await getSiteContent();
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <SmoothScroll>
          <SiteHeader content={global} />
          <main>{children}</main>
          <SiteFooter content={global} />
        </SmoothScroll>
      </body>
    </html>
  );
}
