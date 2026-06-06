import Reveal from "./Reveal";

export default function AgenticBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Reveal>
        <div className="card grid items-stretch overflow-hidden rounded-3xl md:grid-cols-2">
          {/* texto */}
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Mi enfoque
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Automatizo procesos completos, no chatbots sueltos
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
              En lugar de un bot aislado, construyo{" "}
              <strong className="text-[var(--color-fg)]">equipos de agentes</strong> que trabajan
              juntos: un coordinador central reparte cada tarea al agente especializado de su área
              —ventas, cobranzas, soporte, administración— integrados a las herramientas que la
              empresa ya usa.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-faint)]">
              Es lo que muestra el esquema de al lado: el orquestador en el centro, y cada agente
              ocupándose de lo suyo.
            </p>
          </div>

          {/* diagrama (video) */}
          <div className="relative min-h-[260px] border-t border-[var(--color-border)] md:border-l md:border-t-0">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            >
              <source src="/hero-ia.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
