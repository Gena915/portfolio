"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "¿En qué proyectos trabajó Genaro?",
  "¿Qué stack maneja?",
  "¿Cómo lo contacto?",
];

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hola 👋 Soy el asistente de Genaro. Preguntame lo que quieras sobre su experiencia, proyectos o stack." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const d = await r.json();
      setMessages((m) => [...m, { role: "assistant", content: d.text || "…" }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "No pude responder ahora. Probá de nuevo." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* botón flotante */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group fixed bottom-5 left-5 z-[95] flex items-center gap-2.5 rounded-full border border-[var(--color-accent)]/60 bg-[var(--color-panel)] py-2.5 pl-2.5 pr-5 text-sm font-medium text-[var(--color-fg)] shadow-[0_0_30px_-6px_rgba(56,169,255,0.6)] backdrop-blur transition-all hover:scale-[1.03] hover:border-[var(--color-accent)] hover:shadow-[0_0_40px_-4px_rgba(56,169,255,0.85)]"
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-40" />
          <img src="/gen/host-avatar.webp" alt="" aria-hidden="true" className="relative h-9 w-9 rounded-full object-cover mix-blend-screen" />
        </span>
        {open ? "Cerrar chat" : "Preguntale a la IA"}
      </button>

      {/* panel */}
      {open && (
        <div className="fixed bottom-20 left-5 z-[90] flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)]/98 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
            <span className="gradient-text font-mono text-sm font-semibold">asistente.ia</span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-[var(--color-faint)]">sobre Genaro</span>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
                    m.role === "user"
                      ? "rounded-br-sm bg-[var(--color-accent)] text-[#04121f]"
                      : "rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-fg)]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3.5 py-2.5">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-accent)] [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-accent)] [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-accent)]" />
                  </span>
                </div>
              </div>
            )}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="chip rounded-full px-3 py-1.5 text-xs transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-[var(--color-border)] p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribí tu pregunta…"
              className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-sm text-[var(--color-fg)] outline-none placeholder:text-[var(--color-faint)] focus:border-[var(--color-accent)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-[var(--color-accent)] p-2.5 text-[#04121f] transition-transform hover:scale-105 disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
