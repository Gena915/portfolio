import { profile } from "@/lib/content";
import Reveal from "./Reveal";

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Fondo cinematográfico — núcleo de IA generado con Higgsfield (Soul Cinematic) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/gen/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="kenburns absolute inset-0 h-full w-full object-cover opacity-70 [object-position:75%_center]"
        />
        {/* veladuras para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] from-20% via-[var(--color-bg)]/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
        <div className="absolute inset-0 bg-[var(--color-bg)]/35" />
        <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_40%,transparent_50%,#05060a_100%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 md:pt-44">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1 text-xs text-[var(--color-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            </span>
            {profile.availability}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight [text-shadow:0_2px_40px_rgba(0,0,0,0.85)] md:text-7xl">
            {profile.name}
            <span className="block gradient-text [text-shadow:none]">{profile.role}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 font-mono text-sm text-[var(--color-muted)] md:text-base">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[#04121f] transition-transform hover:scale-[1.03]"
            >
              Ver proyectos <IconArrow />
            </a>
            <a
              href={profile.cvEs}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]"
            >
              Descargar CV
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent-2)] hover:text-[var(--color-fg)]"
            >
              <IconMail /> Escribime
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
