import { about, education, profile } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading index="03" title="Sobre mí" />

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div className="space-y-5">
            {about.map((p) => (
              <p key={p} className="text-[var(--color-muted)] leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-6">
            <div className="card rounded-2xl p-5">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
                Formación
              </h3>
              <ul className="space-y-4">
                {education.map((e) => (
                  <li key={e.title}>
                    <div className="text-sm font-medium text-[var(--color-fg)]">
                      {e.title}
                    </div>
                    <div className="text-sm text-[var(--color-muted)]">{e.place}</div>
                    <div className="mt-0.5 font-mono text-xs text-[var(--color-faint)]">
                      {e.date}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card rounded-2xl p-5">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-faint)]">
                Datos
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-faint)]">Ubicación</dt>
                  <dd className="text-right text-[var(--color-muted)]">
                    {profile.location}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-faint)]">Idiomas</dt>
                  <dd className="text-right text-[var(--color-muted)]">
                    Español (nativo) · Inglés (B1/B2)
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[var(--color-faint)]">Empresa</dt>
                  <dd className="text-right text-[var(--color-muted)]">
                    HitoFusion · Célula de IA
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
