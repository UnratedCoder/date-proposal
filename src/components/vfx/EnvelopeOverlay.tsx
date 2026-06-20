"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeOverlayProps {
  onOpen: () => void;
}

export default function EnvelopeOverlay({ onOpen }: EnvelopeOverlayProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
      className="fixed inset-0 w-full h-full bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50 px-4 select-none pointer-events-auto"
    >
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-love-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />

      {/* Floating Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center mb-8 max-w-sm z-10"
      >
        <h1 className="font-serif text-2xl md:text-3xl text-love-100 font-bold text-glow-pink tracking-wide leading-snug">
          For the most beautiful girl... 🌹
        </h1>
        <p className="text-xs text-slate-300 mt-2 font-medium tracking-wide leading-relaxed px-4">
          I wrote a little something for you. Will you open it?
        </p>
      </motion.div>

      {/* 3D Envelope */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        whileHover={{ scale: isOpening ? 1 : 1.03 }}
        onClick={handleOpen}
        onTouchEnd={handleOpen}
        className="w-full max-w-[340px] aspect-[4/3] relative flex items-center justify-center cursor-pointer pointer-events-auto z-10"
        style={{ perspective: "1000px" }}
      >
        {/* Envelope Back Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-love-950 to-love-900 border border-love-300/20 rounded-2xl shadow-[0_20px_50px_rgba(255,10,84,0.15)] flex items-end">
          <div className="absolute inset-2 border border-dashed border-love-200/10 rounded-xl" />
        </div>

        {/* Envelope Flap (Opening Top) */}
        <motion.div
          animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-x-0 top-0 h-1/2 bg-love-900 border-b border-love-950 rounded-t-2xl origin-top flex items-center justify-center shadow-md"
          style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
        >
          <div className="absolute inset-0 bg-love-950 rounded-t-2xl border-b border-love-800 backface-hidden" />
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
            <span className="text-[10px] text-love-200 uppercase tracking-widest font-bold font-sans">
              Handcrafted
            </span>
          </div>
        </motion.div>

        {/* Left and Right Envelope overlapping pockets */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-love-950 to-love-900 rounded-b-2xl border-t border-love-800/10 z-10 flex items-center justify-center">
          <div className="absolute inset-2 border border-dashed border-love-200/5 rounded-xl pointer-events-none" />
        </div>

        {/* Pulsing Wax Seal (Heart) */}
        <motion.div
          animate={isOpening ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }}
          transition={isOpening ? { duration: 0.3 } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-16 h-16 bg-gradient-to-br from-love-400 to-love-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-love-500/40 border border-love-300/30 z-30"
        >
          <Heart size={30} fill="currentColor" className="animate-pulse" />
          <span className="absolute -top-1 -right-1 text-yellow-300 animate-bounce">
            <Sparkles size={12} />
          </span>
        </motion.div>

        {/* Gold Lettering Label */}
        <div className="absolute bottom-4 w-full text-center z-15 select-none pointer-events-none">
          <span className="font-serif italic text-xs text-love-200 tracking-wider">
            &ldquo;For Your Eyes Only&rdquo;
          </span>
        </div>
      </motion.div>

      {/* Floating Instructions */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpening ? 0 : [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-6 text-[10px] text-love-200 font-bold uppercase tracking-widest tracking-widest text-glow-pink z-10"
      >
        ✨ Click the envelope to open
      </motion.p>
    </motion.div>
  );
}
