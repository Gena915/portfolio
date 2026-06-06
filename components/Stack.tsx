import { stackGroups } from "@/lib/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Stack() {
  return (
    <section
      id="stack"
      className="scroll-mt-24 border-y border-[var(--color-border)] bg-[var(--color-bg-soft)]/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          index="02"
          title="Stack técnico"
          subtitle="Herramientas y tecnologías con las que diseño, construyo y despliego."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((g, i) => (
            <Reveal key={g.label} delay={(i % 3) * 80}>
              <div className="card h-full rounded-2xl p-5">
                <h3 className="mb-4 text-sm font-semibold text-[var(--color-fg)]">
                  {g.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="chip rounded-md px-2.5 py-1 text-xs"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
