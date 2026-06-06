import { projects } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Check() {
  return (
    <svg
      className="mt-1 shrink-0 text-[var(--color-accent)]"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading
        index="01"
        title="Proyectos"
        subtitle="Una muestra de los sistemas de IA que automatizan procesos reales de empresas, en producción. En varios fui el creador a cargo del proyecto; en otros participé de forma activa dentro del equipo. Cada proyecto se presenta anonimizado por su sector."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 90}>
            <article className="card flex h-full flex-col overflow-hidden rounded-2xl">
              {/* póster generado con Higgsfield (Soul Cinematic) */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)] via-transparent to-transparent" />
                <span className="absolute right-3 top-3 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-bg)]/60 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)] backdrop-blur">
                  {p.sector}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
              <h3 className="text-lg font-semibold tracking-tight">
                {p.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {p.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-[var(--color-muted)]">
                    <Check />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2 pt-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="chip rounded-md px-2 py-0.5 font-mono text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
