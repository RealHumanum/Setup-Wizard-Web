"use client";

import { useEffect, useRef } from "react";

// Lightweight 2D-canvas starfield. Capped at ~30 FPS, pauses while the tab
// is hidden, respects prefers-reduced-motion. Dependency-free.
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let last = 0;
    const FRAME_MS = 1000 / 30;
    const stars: { x: number; y: number; z: number }[] = [];

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      const count = Math.min(180, Math.floor((w * h) / 11000));
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() });
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      if (now - last < FRAME_MS) return;
      last = now;
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.z * 1.4 + 0.2, 0, Math.PI * 2);
        ctx!.fillStyle = `oklch(78% 0.2 152 / ${0.15 + s.z * 0.35})`;
        ctx!.fill();
        if (!reduce) {
          s.y += s.z * 0.15 + 0.03;
          if (s.y > h) s.y = 0;
        }
      }
    }

    function drawOnce() {
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.z * 1.4 + 0.2, 0, Math.PI * 2);
        ctx!.fillStyle = `oklch(78% 0.2 152 / ${0.15 + s.z * 0.35})`;
        ctx!.fill();
      }
    }

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      drawOnce();
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
}
