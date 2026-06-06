import { stats } from "@/lib/content";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="h-full bg-[var(--color-bg-soft)] p-6">
              <div className="gradient-text text-3xl font-semibold tracking-tight md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-[var(--color-fg)]">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-[var(--color-faint)]">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
