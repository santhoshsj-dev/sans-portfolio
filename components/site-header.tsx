"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(new Date()));
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Santhosh S. home">sans<span>.</span></Link>
        <div className="clock-strip" aria-label="Chennai local time"><span>CHENNAI, IN</span><span>{time}</span></div>
        <label className="theme-toggle"><span>{dark ? "Dark" : "Light"}</span><input type="checkbox" checked={dark} onChange={(event) => setDark(event.target.checked)} aria-label="Toggle dark theme" /><i aria-hidden="true" /></label>
        <button className={`menu-toggle${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          <span>{open ? "Close" : "Menu"}</span><i aria-hidden="true"><b /><b /></i>
        </button>
      </header>
      <AnimatePresence>
        {open && <motion.div className="menu-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {open && <motion.nav id="primary-navigation" className="menu-panel" aria-label="Main navigation" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: .45, ease: [.76, 0, .24, 1] }}>
          <p className="menu-kicker">INDEPENDENT DESIGNER · CHENNAI</p>
          <div className="menu-links">{links.map((link, index) => <Link key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === "/works" && pathname.startsWith("/work")) ? "page" : undefined}><small>0{index + 1}</small>{link.label}<span>↗</span></Link>)}</div>
          <div className="menu-bottom"><span>HAVE A PROJECT IN MIND?</span><a href="mailto:santhoshsekar2903@gmail.com">LET’S TALK ↗</a></div>
        </motion.nav>}
      </AnimatePresence>
    </>
  );
}
