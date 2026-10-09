import Link from "next/link";

export default function NotFound() {
  return <section className="not-found container"><span className="eyebrow">404 — off the grid</span><h1>This page<br /><span className="serif-accent">is missing.</span></h1><Link className="button button-dark" href="/">Back home <span>↗</span></Link></section>;
}
