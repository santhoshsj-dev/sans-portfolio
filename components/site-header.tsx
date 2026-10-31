"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedLabel } from "@/components/animated-label";
import type { GlobalContent } from "@/lib/content";

const links = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ content }: { content: Pick<GlobalContent, "contactEmail" | "menuPrompt" | "menuCta"> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [time, setTime] = useState("--:--");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
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
        <Link
          className="site-header__wordmark"
          href="/"
          aria-label="Santhosh S. home"
        >
          sans<span>.</span>
        </Link>
        <label className="site-header__theme-toggle">
          <AnimatedLabel>{dark ? "DARK" : "LIGHT"}</AnimatedLabel>
          <input
            type="checkbox"
            checked={dark}
            onChange={(event) => setDark(event.target.checked)}
            aria-label="Toggle dark theme"
          />
          <i aria-hidden="true" />
        </label>
        <button
          className={`site-header__menu-toggle${open ? " site-header__menu-toggle--open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <i aria-hidden="true">
            <b />
            <b />
          </i>
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="site-menu__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="primary-navigation"
            className="site-menu"
            aria-label="Main navigation"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{
              x: 0,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{
              x: reduceMotion ? 0 : "100%",
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.4, 0, 1, 1] },
            }}
          >
            <div className="site-menu__header">
              <button
                className="site-menu__close"
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <span>CLOSE</span>
                <i aria-hidden="true" />
              </button>
            </div>
            <div className="site-menu__links">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-label={link.label}
                  aria-current={
                    pathname === link.href ||
                    (link.href === "/works" && pathname.startsWith("/work"))
                      ? "page"
                      : undefined
                  }
                >
                  <AnimatedLabel>{link.label.toUpperCase()}</AnimatedLabel>
                </Link>
              ))}
            </div>
            <div className="site-menu__footer">
              <span>{content.menuPrompt || "HAVE A PROJECT IN MIND?"}</span>
              <div className="site-menu__actions">
                <a href={`mailto:${content.contactEmail}`}>{content.menuCta || "LET’S TALK ↗"}</a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
