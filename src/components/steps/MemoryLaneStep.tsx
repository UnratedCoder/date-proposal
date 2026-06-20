"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PolaroidItem {
  id: number;
  src: string;
  caption: string;
  rotation: number;
  xOffset: number;
  yOffset: number;
}

interface MemoryLaneStepProps {
  onNext: () => void;
}

const polaroids: PolaroidItem[] = [
  {
    id: 1,
    src: "/images/couple_stargazing.png",
    caption: "Looking at our future ✨",
    rotation: -6,
    xOffset: -80,
    yOffset: -15,
  },
  {
    id: 2,
    src: "/images/heart_coffee.png",
    caption: "Sweet mornings with you ☕❤️",
    rotation: 4,
    xOffset: 80,
    yOffset: -25,
  },
  {
    id: 3,
    src: "/images/holding_hands.png",
    caption: "Gently held, forever loved 🤝",
    rotation: -3,
    xOffset: -40,
    yOffset: 55,
  },
  {
    id: 4,
    src: "/images/starry_jar.png",
    caption: "Jar full of our wishes 💫",
    rotation: 8,
    xOffset: 60,
    yOffset: 65,
  },
];

export default function MemoryLaneStep({ onNext }: MemoryLaneStepProps) {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      {/* Draggable Polaroid Cards */}
      <div className="relative w-full max-w-[340px] h-[280px] md:max-w-[440px] md:h-[320px] mx-auto flex items-center justify-center pointer-events-auto">
        <p className="absolute -top-10 text-xs text-love-300 font-semibold tracking-wider uppercase opacity-80 animate-pulse text-center w-full">
          ✨ Try dragging the photos around!
        </p>
        
        {polaroids.map((photo) => (
          <motion.div
            key={photo.id}
            drag
            dragConstraints={{ left: -150, right: 150, top: -80, bottom: 80 }}
            whileDrag={{ scale: 1.08, zIndex: 10, rotate: 0 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 5, transition: { duration: 0.2 } }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              x: photo.xOffset, 
              y: photo.yOffset,
              rotate: photo.rotation 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: photo.xOffset,
              y: photo.yOffset,
              rotate: photo.rotation,
              transition: { delay: photo.id * 0.15, type: "spring", stiffness: 60 }
            }}
            className="absolute w-[130px] md:w-[155px] bg-white p-2 pb-5 rounded shadow-lg border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-romantic hover:border-love-200/50 transition-shadow duration-300"
          >
            {/* Polaroid Image Area */}
            <div className="relative w-full aspect-square bg-slate-100 rounded overflow-hidden select-none pointer-events-none">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 130px, 155px"
                priority
              />
            </div>
            
            {/* Handwritten Caption */}
            <div className="mt-2 text-center select-none pointer-events-none">
              <p className="font-serif text-slate-800 text-[10px] md:text-xs tracking-wide leading-tight italic">
                {photo.caption}
              </p>
            </div>

            {/* Tape Decor */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-rose-200/40 backdrop-blur-[1px] rotate-2 rounded-sm border border-rose-300/10" />
          </motion.div>
        ))}
      </div>
      
      {/* Continue Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-love-500 to-love-600 hover:from-love-400 hover:to-love-500 text-white font-bold rounded-full shadow-lg hover:shadow-love-500/30 transition-all cursor-pointer text-xs uppercase tracking-wider z-20 pointer-events-auto"
      >
        Remember these moments? Continue ❤️
      </motion.button>
    </div>
  );
}
