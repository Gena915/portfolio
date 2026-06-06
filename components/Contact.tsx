import { profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-soft)]/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <Reveal>
          <p className="font-mono text-sm text-[var(--color-accent)]">04 — Contacto</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            ¿Construimos algo con <span className="gradient-text">IA</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[var(--color-muted)]">
            Estoy abierto a nuevas oportunidades y colaboraciones. La mejor forma
            de contactarme es por mail o LinkedIn.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[#04121f] transition-transform hover:scale-[1.03]"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm transition-colors hover:border-[var(--color-accent)]"
            >
              LinkedIn
            </a>
            <a
              href={profile.cvEs}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm transition-colors hover:border-[var(--color-accent)]"
            >
              CV (ES)
            </a>
            <a
              href={profile.cvEn}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm transition-colors hover:border-[var(--color-accent)]"
            >
              CV (EN)
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-[var(--color-faint)] sm:flex-row">
          <span className="font-mono">
            <span className="gradient-text">genaro</span>.garcia()
          </span>
          <span>
            {profile.location} · Hecho con Next.js
          </span>
        </div>
      </footer>
    </section>
  );
}
