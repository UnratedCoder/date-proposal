"use client";

import React, { useEffect, useRef } from "react";

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  type: "heart" | "star";
  rotation: number;
  rotationSpeed: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const sparkles: Sparkle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = ["#ff477e", "#ff758f", "#ffccd5", "#ffd166", "#fff"];

    const addSparkle = (x: number, y: number) => {
      const type = Math.random() > 0.4 ? "star" : "heart";
      const color = colors[Math.floor(Math.random() * colors.length)];
      sparkles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        alpha: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 8 + 4,
        color,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        addSparkle(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        for (let i = 0; i < 2; i++) {
          addSparkle(touch.clientX, touch.clientY);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const drawHeart = (context: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string, alpha: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(0, -size / 4);
      context.bezierCurveTo(-size / 2, -size / 2 - size / 4, -size, -size / 4, -size, size / 4);
      context.bezierCurveTo(-size, size / 2 + size / 4, 0, size, 0, size * 1.1);
      context.bezierCurveTo(0, size, size, size / 2 + size / 4, size, size / 4);
      context.bezierCurveTo(size, -size / 4, size / 2, -size / 2 - size / 4, 0, -size / 4);
      context.closePath();
      context.fillStyle = color;
      context.fill();
      context.restore();
    };

    const drawStar = (context: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number, color: string, alpha: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.globalAlpha = alpha;
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        context.lineTo(0, -size);
        context.quadraticCurveTo(0, 0, size, 0);
        context.rotate(Math.PI / 2);
      }
      context.closePath();
      context.fillStyle = color;
      context.fill();
      context.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.rotation += s.rotationSpeed;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        if (s.type === "heart") {
          drawHeart(ctx, s.x, s.y, s.size, s.rotation, s.color, s.alpha);
        } else {
          drawStar(ctx, s.x, s.y, s.size, s.rotation, s.color, s.alpha);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
}
