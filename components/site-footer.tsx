import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-image" role="img" aria-label="Crimson botanical campaign concept image" />
    <div className="footer-top">
      <div><span className="footer-label">SAN · CHENNAI, INDIA</span><p>Graphic designer<br />and visual storyteller.</p></div>
      <nav aria-label="Footer navigation"><span className="footer-label">EXPLORE</span><Link href="/about">About</Link><Link href="/works">Works</Link><Link href="/contact">Contact</Link></nav>
      <div className="social-links"><span className="footer-label">SAY HELLO</span><a href="https://in.linkedin.com/in/santhoshsj" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://designerdotsans.framer.website/" target="_blank" rel="noreferrer">Portfolio ↗</a><a href="mailto:santhoshsekar2903@gmail.com">Email ↗</a></div>
      <div><span className="footer-label">CURRENTLY</span><p>Available for select<br />creative collaborations.</p></div>
    </div>
    <Link className="footer-mark" href="/" aria-label="Back to home">sans<span>.</span></Link>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Santhosh S.</span><span>MADE WITH INTENTION IN CHENNAI</span><a href="#top">BACK TO TOP ↑</a></div>
  </footer>;
}
