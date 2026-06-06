"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { narration } from "@/lib/content";

type Phase = "intro" | "welcome" | "active";

const SECTIONS = ["proyectos", "stack", "sobre-mi", "contacto"];

export default function AIHost() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [enabled, setEnabled] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [caption, setCaption] = useState("");
  const [shownChars, setShownChars] = useState(0);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);
  const narratedRef = useRef<Set<string>>(new Set());
  const captionRef = useRef("");
  const phaseRef = useRef<Phase>("intro");
  phaseRef.current = phase;

  const initAudio = useCallback(() => {
    if (ctxRef.current || !audioRef.current) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const src = ctx.createMediaElementSource(audioRef.current);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    src.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
  }, []);

  const play = useCallback(
    (key: string) => {
      const n = narration[key];
      const el = audioRef.current;
      if (!n || !el) return;
      captionRef.current = n.text;
      setCaption(n.text);
      setShownChars(0);
      el.src = n.clip;
      el.muted = muted;
      ctxRef.current?.resume();
      el.play().then(() => setSpeaking(true)).catch(() => {});
    },
    [muted],
  );

  // ---- Loop de dibujo del orbe (reactivo o idle); re-engancha al canvas montado ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * DPR);
      canvas.height = Math.max(1, r.height * DPR);
    };
    resize();

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      ctx.clearRect(0, 0, w, h);

      let level = 0;
      const analyser = analyserRef.current;
      const data = dataRef.current;
      const isSpeaking = speaking;
      if (analyser && data && isSpeaking) {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        level = sum / data.length / 255;
      }
      const idle = (Math.sin(t / 700) + 1) / 2;
      const energy = isSpeaking ? 0.25 + level * 1.4 : 0.12 + idle * 0.12;
      const base = Math.min(w, h) * 0.16;

      const halo = ctx.createRadialGradient(cx, cy, base * 0.3, cx, cy, base * (2.4 + energy));
      halo.addColorStop(0, `rgba(56,169,255,${0.3 + energy * 0.25})`);
      halo.addColorStop(0.5, "rgba(34,211,238,0.10)");
      halo.addColorStop(1, "rgba(5,6,10,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      const bins = 64;
      ctx.lineWidth = 2 * DPR;
      for (let ring = 0; ring < 2; ring++) {
        ctx.beginPath();
        for (let i = 0; i <= bins; i++) {
          const a = (i / bins) * Math.PI * 2;
          let amp = 0;
          if (analyser && data && isSpeaking) amp = (data[i % data.length] / 255) * base * 0.6;
          const rr = base * (1.25 + ring * 0.35) + amp + Math.sin(t / 500 + i) * base * 0.05;
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = ring === 0 ? `rgba(56,169,255,${0.5 + energy * 0.4})` : `rgba(34,211,238,${0.25 + energy * 0.3})`;
        ctx.stroke();
      }

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * (1 + energy * 0.5));
      core.addColorStop(0, "rgba(200,235,255,0.95)");
      core.addColorStop(0.4, "rgba(56,169,255,0.85)");
      core.addColorStop(1, "rgba(8,16,28,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, base * (1 + energy * 0.5), 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [speaking, phase]);

  // ---- Subtítulos sincronizados + avance de fase al terminar la bienvenida ----
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (!el.duration) return;
      const p = el.currentTime / el.duration;
      setShownChars(Math.floor(p * captionRef.current.length));
    };
    const onEnd = () => {
      setSpeaking(false);
      setShownChars(captionRef.current.length);
      if (phaseRef.current === "welcome") setPhase("active");
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  // ---- Narración por sección al scrollear ----
  useEffect(() => {
    if (phase !== "active" || !enabled) return;
    // Dispara cuando la sección cruza la franja central del viewport,
    // sin importar su alto (Proyectos es muy alta y con % nunca disparaba).
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = e.target.id;
          if (e.isIntersecting && !narratedRef.current.has(id) && narration[id]) {
            narratedRef.current.add(id);
            play(id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [phase, enabled, play]);

  // Al entrar al sitio (intro/welcome → activo), arrancar siempre desde el principio (hero).
  useEffect(() => {
    if (phase === "active") window.scrollTo({ top: 0, behavior: "auto" });
  }, [phase]);

  const enterWithVoice = () => {
    setEnabled(true);
    initAudio();
    setPhase("welcome");
    setTimeout(() => play("welcome"), 80);
  };
  const enterSilent = () => {
    setEnabled(false);
    setPhase("active");
  };
  const skipWelcome = () => {
    audioRef.current?.pause();
    setSpeaking(false);
    setPhase("active");
  };
  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    if (audioRef.current) audioRef.current.muted = m;
  };
  const replay = () => {
    if (!enabled) {
      setEnabled(true);
      initAudio();
    }
    play("welcome");
  };

  const visibleCaption = caption.slice(0, shownChars);

  return (
    <>
      <audio ref={audioRef} preload="none" />

      {/* ---------- INTRO ---------- */}
      {phase === "intro" && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto bg-[var(--color-bg)] px-6 py-10 text-center">
          <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" />
          <div className="relative h-44 w-44 shrink-0 sm:h-64 sm:w-64 md:h-80 md:w-80">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <img src="/gen/host-avatar.webp" alt="" aria-hidden="true" className="relative h-full w-full object-contain mix-blend-screen" />
          </div>
          <p className="relative -mt-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
            Agente anfitrión · IA
          </p>
          <h2 className="relative mt-3 max-w-lg text-balance text-2xl font-semibold tracking-tight md:text-3xl">
            Este portfolio te lo presenta una inteligencia artificial.
          </h2>
          <p className="relative mt-3 max-w-md text-sm text-[var(--color-muted)]">
            Activá la guía con voz y dejá que el agente te lleve por cada sección. O entrá en silencio si preferís.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={enterWithVoice}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[#04121f] transition-transform hover:scale-[1.03]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              Dejá que la IA te guíe
            </button>
            <button
              onClick={enterSilent}
              className="rounded-full border border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-fg)] hover:text-[var(--color-fg)]"
            >
              Entrar en silencio
            </button>
          </div>
        </div>
      )}

      {/* ---------- WELCOME (orbe grande hablando) ---------- */}
      {phase === "welcome" && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto bg-[var(--color-bg)] px-6 py-10 text-center">
          <div className="pointer-events-none absolute inset-0 bg-aurora opacity-80" />
          <div className={`relative h-52 w-52 shrink-0 transition-transform duration-300 sm:h-72 sm:w-72 md:h-96 md:w-96 ${speaking ? "scale-105" : ""}`}>
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <img src="/gen/host-avatar.webp" alt="" aria-hidden="true" className="relative h-full w-full object-contain mix-blend-screen" />
          </div>
          <p className="relative mx-auto -mt-2 min-h-[5rem] max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-fg)] md:text-xl">
            {visibleCaption}
            <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-[var(--color-accent)] align-middle" />
          </p>
          <button
            onClick={skipWelcome}
            className="relative mt-8 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Entrar al sitio →
          </button>
        </div>
      )}

      {/* ---------- HOST FLOTANTE ---------- */}
      {phase === "active" && (
        <div className="fixed bottom-5 right-5 z-[90] flex items-end gap-3">
          {speaking && visibleCaption && (
            <div className="mb-2 max-w-[58vw] rounded-2xl rounded-br-sm border border-[var(--color-border)] bg-[var(--color-panel)]/95 px-4 py-3 text-left text-sm leading-snug text-[var(--color-fg)] shadow-xl backdrop-blur sm:max-w-xs">
              {visibleCaption}
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[var(--color-accent)] align-middle" />
            </div>
          )}
          <div className="flex flex-col items-center gap-2">
            <div className={`relative h-20 w-20 transition-transform ${speaking ? "scale-110" : ""}`}>
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
              <img src="/gen/host-avatar.webp" alt="" aria-hidden="true" className="relative h-full w-full object-contain mix-blend-screen" />
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={replay}
                title="Volver a escuchar la presentación"
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] p-2 text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v6h6M3 8a9 9 0 1 0 2-3" /></svg>
              </button>
              <button
                onClick={toggleMute}
                title={muted ? "Activar sonido" : "Silenciar"}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] p-2 text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {muted ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" /></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
