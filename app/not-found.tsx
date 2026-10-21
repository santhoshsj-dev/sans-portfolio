import Link from "next/link";
import { AnimatedLabel } from "@/components/animated-label";

export default function NotFound() {
  return <section className="not-found-page site-layout__container"><span className="type__eyebrow">404 — off the grid</span><h1>This page<br /><span className="type__accent">is missing.</span></h1><Link className="button button--dark" href="/" aria-label="Back home"><AnimatedLabel>Back home</AnimatedLabel><span>↗</span></Link></section>;
}
