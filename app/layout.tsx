import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollRevealController } from "@/components/scroll-reveal-controller";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Santhosh S — Graphic & Motion Designer",
    template: "%s — Santhosh S",
  },
  description:
    "Portfolio of Santhosh S, graphic and motion designer, creative lead, and brand storyteller based in India.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body id="top">
        <SmoothScroll>
          <ScrollRevealController />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
