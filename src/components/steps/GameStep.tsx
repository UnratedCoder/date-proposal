"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Send } from "lucide-react";
import confetti from "canvas-confetti";

interface GameStepProps {
  onNext: () => void;
}

export default function GameStep({ onNext }: GameStepProps) {
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Canvas Overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set resolution high for crisp graphics
    canvas.width = 270;
    canvas.height = 270;

    // Draw scratchable surface
    // 1. Glittering rose-gold to velvet-pink metallic gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#e11d48"); // Rose 600
    gradient.addColorStop(0.3, "#f43f5e"); // Rose 500
    gradient.addColorStop(0.7, "#fda4af"); // Rose 300
    gradient.addColorStop(1, "#fb7185"); // Rose 400
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Add sparkling glitter particles overlay
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let i = 0; i < 400; i++) {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const rSize = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, rSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Draw a decorative golden/white heart border in center
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    // Heart shape math drawing
    const cx = canvas.width / 2;
    const cy = canvas.height / 2 - 10;
    const size = 80;
    
    // Draw heart path
    ctx.moveTo(cx, cy + size / 4);
    // Left half
    ctx.bezierCurveTo(cx - size / 2, cy - size / 2, cx - size, cy, cx, cy + size);
    // Right half
    ctx.bezierCurveTo(cx + size, cy, cx + size / 2, cy - size / 2, cx, cy + size / 4);
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // 4. Draw central text prompt
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 4;
    ctx.fillText("Scratch Me ❤️", cx, cy + 25);
    ctx.shadowBlur = 0; // Reset shadow
  }, []);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || isUnlocked) return;
    canvas.setPointerCapture(e.pointerId);
    const coords = getCoordinates(e);
    if (coords) {
      lastPosRef.current = coords;
      setIsScratching(true);
      scratchPoint(coords.x, coords.y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isScratching || isUnlocked) return;
    const coords = getCoordinates(e);
    if (coords && lastPosRef.current) {
      scratchLine(lastPosRef.current.x, lastPosRef.current.y, coords.x, coords.y);
      lastPosRef.current = coords;
      
      // Throttle percentage check for performance
      if (!throttleTimeoutRef.current) {
        throttleTimeoutRef.current = setTimeout(() => {
          checkScratchPercentage();
          throttleTimeoutRef.current = null;
        }, 150);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.releasePointerCapture(e.pointerId);
    }
    setIsScratching(false);
    lastPosRef.current = null;
    checkScratchPercentage();
  };

  const scratchPoint = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const scratchLine = (x1: number, y1: number, x2: number, y2: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 52; // Scratch diameter
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isUnlocked) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let cleared = 0;
    
    // Sample every 40th pixel (10 pixels x 4 channels) to calculate cleared area efficiently
    const step = 40;
    let totalSamples = 0;
    for (let i = 3; i < data.length; i += step) {
      totalSamples++;
      if (data[i] === 0) {
        cleared++;
      }
    }

    const percentage = (cleared / totalSamples) * 100;
    setScratchPercentage(Math.round(percentage));

    // Threshold of 22% triggers reveal
    if (percentage >= 22) {
      unlockMessage();
    }
  };

  const unlockMessage = () => {
    setIsUnlocked(true);
    
    // Confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff477e", "#ffccd5", "#ff0a54", "#ffd166", "#de0a26"],
    });

    // Cleanup reference
    if (throttleTimeoutRef.current) {
      clearTimeout(throttleTimeoutRef.current);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto p-4 md:p-5 glass rounded-3xl relative shadow-2xl border border-love-100/10 text-center pointer-events-auto flex flex-col items-center">
      {/* Title Header */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-love-300 font-bold uppercase tracking-widest mb-1">
        <Sparkles size={12} className="animate-pulse" />
        <span>Love Note</span>
        <Sparkles size={12} className="animate-pulse" />
      </div>

      <h3 className="font-serif text-xl md:text-2xl text-white mb-1 text-glow-pink">
        A Secret message...
      </h3>
      
      <p className="text-[10px] md:text-[11px] text-slate-300 mb-4 max-w-[280px] leading-relaxed">
        {isUnlocked 
          ? "You revealed my hidden words! 💖" 
          : scratchPercentage > 0
          ? `Revealed: ${scratchPercentage}% / 22% (keep scratching! ✨)`
          : "Use your cursor or finger to scratch off the heart surface and reveal my message below..."
        }
      </p>

      {/* Interactive Card Board */}
      <div className="relative w-[270px] h-[270px] bg-slate-950/70 rounded-2xl overflow-hidden border border-love-100/10 shadow-inner flex items-center justify-center mb-4">
        
        {/* Hidden Layer: Cursive/Serif Love Note */}
        <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center font-serif text-slate-800 bg-gradient-to-br from-white to-rose-50 select-text">
          {/* Subtle Heart Watermark */}
          <div className="absolute inset-0 opacity-[0.03] text-love-600 flex items-center justify-center pointer-events-none">
            <Heart size={180} fill="currentColor" />
          </div>
          
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-love-600 mb-2">
            My Heart to Yours 💌
          </span>
          <p className="text-sm italic leading-relaxed text-slate-800">
            &ldquo;You scratched the surface, but the truth is, my heart was yours from the very first day. Thank you for bringing so much color, warmth, and beautiful smiles into my world. Every day with you is my absolute favorite adventure.&rdquo;
          </p>
        </div>

        {/* Scratchable Canvas Overlay */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
              style={{
                touchAction: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* Scratching Glow Pointer Indicator */}
        {isScratching && !isUnlocked && (
          <div className="absolute bottom-2 right-3 z-20 bg-slate-950/90 text-white text-[9px] px-2 py-0.5 rounded-full border border-love-100/20 uppercase font-bold tracking-wider opacity-80">
            Scratching {scratchPercentage}%
          </div>
        )}
      </div>

      {/* Reveal Action Button */}
      <div className="h-12 w-full flex items-center justify-center">
        <AnimatePresence>
          {isUnlocked && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-love-500 to-love-600 hover:from-love-400 hover:to-love-500 text-white font-bold rounded-full shadow-lg hover:shadow-love-500/30 transition-all cursor-pointer text-xs uppercase tracking-widest flex items-center gap-2 animate-pulse"
            >
              Next: The Question... <Send size={12} fill="currentColor" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
