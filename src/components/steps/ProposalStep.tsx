"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ProposalStepProps {
  onAccept: () => void;
}

const noTexts = [
  "No",
  "Are you sure? 🥺",
  "Really sure? 💔",
  "Think again! 🌸",
  "Choose wisely... 👀",
  "Give it another thought! 💭",
  "No is disabled! 😜",
  "Error: click YES! 🤖",
  "You're breaking my heart... 😭",
  "Nice try! 💖",
];

export default function ProposalStep({ onAccept }: ProposalStepProps) {
  const [noIndex, setNoIndex] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);

  const handleNoHoverOrClick = () => {
    setNoIndex((prev) => (prev + 1) % noTexts.length);

    if (typeof window !== "undefined") {
      const padding = 100;
      const x = Math.random() * (window.innerWidth - padding * 2) + padding;
      const y = Math.random() * (window.innerHeight - padding * 2) + padding;
      setNoPosition({ x, y });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4 py-8 pointer-events-auto">
      {/* Heart Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
        transition={{
          scale: { type: "spring", stiffness: 120, delay: 0.1 },
          rotate: { type: "tween", duration: 0.5, delay: 0.1 }
        }}
        className="w-20 h-20 bg-love-500 rounded-full flex items-center justify-center text-white shadow-lg animate-heartbeat mb-6 cursor-pointer"
        onClick={onAccept}
      >
        <Heart size={40} fill="currentColor" />
      </motion.div>

      {/* Main Question */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight text-glow-pink"
      >
        Will you go on a date with me?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-xs md:text-sm font-bold tracking-widest text-love-300 uppercase mt-2 mb-10"
      >
        A Question Worth Asking
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="relative w-full max-w-[320px] h-[80px] flex items-center justify-center gap-6"
      >
        <motion.button
          onClick={onAccept}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-love-500 to-love-600 hover:from-love-400 hover:to-love-500 text-white font-bold rounded-full shadow-lg hover:shadow-love-500/40 text-lg transition-all duration-200 cursor-pointer animate-pulse-glow"
        >
          Yes 💖
        </motion.button>

        <motion.button
          onMouseEnter={handleNoHoverOrClick}
          onTouchStart={handleNoHoverOrClick}
          onClick={handleNoHoverOrClick}
          style={
            noPosition
              ? {
                  position: "fixed",
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex: 100,
                  transition: "all 0.15s ease-out",
                }
              : undefined
          }
          className="px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 font-medium rounded-full shadow border border-slate-700/40 text-base transition-colors"
        >
          {noTexts[noIndex]}
        </motion.button>
      </motion.div>
    </div>
  );
}
