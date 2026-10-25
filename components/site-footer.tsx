import Image from "next/image";
import { AnimatedLabel } from "@/components/animated-label";
import { FooterRouteLink } from "@/components/footer-route-link";
import { ImageReveal } from "@/components/image-reveal";

/* eslint @next/next/no-img-element: "off" */

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer--home-layout">
      <div
        className="site-footer__photo"
        role="img"
        aria-label="A crowd at a live event"
      >
        <ImageReveal fill>
          <Image src="/figma-home/footer.png" alt="" fill sizes="100vw" />
        </ImageReveal>
      </div>
      <nav className="site-footer__nav" aria-label="Footer navigation">
        <FooterRouteLink href="/about" aria-label="About">
          <AnimatedLabel>ABOUT</AnimatedLabel>
        </FooterRouteLink>
        <FooterRouteLink href="/works" aria-label="Work">
          <AnimatedLabel>WORK</AnimatedLabel>
        </FooterRouteLink>
        <FooterRouteLink href="/contact" aria-label="Contact">
          <AnimatedLabel>CONTACT</AnimatedLabel>
        </FooterRouteLink>
      </nav>
      <div className="site-footer__body">
        <div className="site-footer__social">
          <span>ELSEWHERE</span>
          <a
            href="https://in.linkedin.com/in/santhoshsj"
            target="_blank"
            rel="noreferrer"
          >
            <AnimatedLabel>INSTAGRAM</AnimatedLabel>{" "}
            <img
              className="site-footer__light-asset"
              src="/figma-home/external-arrow.svg"
              alt=""
            />
            <img
              className="site-footer__dark-asset"
              src="/figma-home/external-arrow-dark.svg"
              alt=""
            />
          </a>
          <a
            href="https://designerdotsans.framer.website/"
            target="_blank"
            rel="noreferrer"
          >
            <AnimatedLabel>LINKEDIN</AnimatedLabel>{" "}
            <img
              className="site-footer__light-asset"
              src="/figma-home/external-arrow.svg"
              alt=""
            />
            <img
              className="site-footer__dark-asset"
              src="/figma-home/external-arrow-dark.svg"
              alt=""
            />
          </a>
          <a href="mailto:designerdotsans@gmail.com">
            <AnimatedLabel>YOUTUBE</AnimatedLabel>{" "}
            <img
              className="site-footer__light-asset"
              src="/figma-home/external-arrow.svg"
              alt=""
            />
            <img
              className="site-footer__dark-asset"
              src="/figma-home/external-arrow-dark.svg"
              alt=""
            />
          </a>
          <a
            href="https://in.linkedin.com/in/santhoshsj"
            target="_blank"
            rel="noreferrer"
          >
            <AnimatedLabel>X</AnimatedLabel>{" "}
            <img
              className="site-footer__light-asset"
              src="/figma-home/external-arrow.svg"
              alt=""
            />
            <img
              className="site-footer__dark-asset"
              src="/figma-home/external-arrow-dark.svg"
              alt=""
            />
          </a>
        </div>
        <div className="site-footer__statement">
          © {new Date().getFullYear()} SANS. ALL RIGHTS RESERVED.
        </div>
      </div>
      <FooterRouteLink
        className="site-footer__brand-band"
        href="/"
        aria-label="Back to top"
      >
        <img src="/figma-home/name.svg" alt="sans." />
      </FooterRouteLink>
    </footer>
  );
}
