"use client";

import { useEffect, useRef } from "react";

// Lightweight 2D-canvas starfield. Replaces the original Three.js field with a
// dependency-free, low-cost ambient backdrop. Respects reduced-motion.
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
    const stars: { x: number; y: number; z: number }[] = [];

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      const count = Math.min(220, Math.floor((w * h) / 9000));
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        stars.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random() });
      }
    }

    function draw() {
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
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
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
