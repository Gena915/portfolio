"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm tracking-tight">
          <span className="gradient-text font-semibold">genaro</span>
          <span className="text-[var(--color-faint)]">.garcia()</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          LinkedIn
        </a>
      </nav>
    </header>
  );
}
