"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { ComponentProps } from "react";

type FooterRouteLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

export function FooterRouteLink({
  href,
  onClick,
  ...props
}: FooterRouteLinkProps) {
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || normalizePath(pathname) !== normalizePath(href)) {
          return;
        }

        event.preventDefault();
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }}
    />
  );
}
