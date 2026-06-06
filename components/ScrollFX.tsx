"use client";

import { useEffect, useState } from "react";

export default function ScrollFX() {
  const [progress, setProgress] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      setProgress(p);
      setAtTop(h.scrollTop < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* barra de progreso de lectura */}
      <div className="fixed inset-x-0 top-0 z-[80] h-0.5 bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* indicador de scroll (se desvanece al bajar) */}
      <div
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center transition-opacity duration-500 ${
          atTop ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-1 text-[var(--color-faint)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <svg className="animate-bounce" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </>
  );
}
