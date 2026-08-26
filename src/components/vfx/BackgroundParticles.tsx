"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: "heart" | "petal";
  angle: number;
  spinSpeed: number;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createParticle = (initBottom = false): Particle => {
      const type = Math.random() > 0.4 ? "heart" : "petal";
      return {
        x: Math.random() * canvas.width,
        y: initBottom ? canvas.height + 20 : Math.random() * canvas.height,
        size: Math.random() * 12 + 6,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        type,
        angle: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 1.5,
      };
    };

    // Initialize particles
    for (let i = 0; i < 45; i++) {
      particles.push(createParticle(false));
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((angle * Math.PI) / 180);
      context.beginPath();
      context.moveTo(0, -size / 4);
      context.bezierCurveTo(
        -size / 2,
        -size / 2 - size / 4,
        -size,
        -size / 4,
        -size,
        size / 4
      );
      context.bezierCurveTo(0, size, size, size / 2 + size / 4, size, size / 4);
      context.bezierCurveTo(
        size,
        -size / 4,
        size / 2,
        -size / 2 - size / 4,
        0,
        -size / 4
      );
      context.closePath();
      context.fillStyle = `rgba(255, 71, 126, ${opacity})`;
      context.fill();
      context.restore();
    };

    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate((angle * Math.PI) / 180);
      context.beginPath();
      context.moveTo(0, -size / 2);
      context.quadraticCurveTo(-size / 2, 0, 0, size / 2);
      context.quadraticCurveTo(size / 2, 0, 0, -size / 2);
      context.closePath();
      context.fillStyle = `rgba(255, 182, 193, ${opacity})`;
      context.fill();
      context.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y / 30) * 0.2;
        p.angle += p.spinSpeed;

        if (p.type === "heart") {
          drawHeart(ctx, p.x, p.y, p.size, p.angle, p.opacity);
        } else {
          drawPetal(ctx, p.x, p.y, p.size, p.angle, p.opacity);
        }

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[index] = createParticle(true);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
