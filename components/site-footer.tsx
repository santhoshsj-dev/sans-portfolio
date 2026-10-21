import Link from "next/link";
import Image from "next/image";
import { AnimatedLabel } from "@/components/animated-label";

/* eslint @next/next/no-img-element: "off" */

export function SiteFooter() {
  return (
    <footer className="site-footer site-footer--home-layout">
      <div
        className="site-footer__photo"
        role="img"
        aria-label="A crowd at a live event"
      >
        <Image src="/figma-home/footer.png" alt="" fill sizes="100vw" />
      </div>
      <nav className="site-footer__nav" aria-label="Footer navigation">
        <Link href="/about" aria-label="About">
          <AnimatedLabel>ABOUT</AnimatedLabel>
        </Link>
        <Link href="/works" aria-label="Work">
          <AnimatedLabel>WORK</AnimatedLabel>
        </Link>
        <Link href="/contact" aria-label="Contact">
          <AnimatedLabel>CONTACT</AnimatedLabel>
        </Link>
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
      <Link
        className="site-footer__brand-band"
        href="/"
        aria-label="Back to top"
      >
        <img src="/figma-home/name.svg" alt="sans." />
      </Link>
    </footer>
  );
}
