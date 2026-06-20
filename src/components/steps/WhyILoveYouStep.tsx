"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface Reason {
  id: number;
  text: string;
  subtext: string;
}

interface WhyILoveYouStepProps {
  onNext: () => void;
}

const reasons: Reason[] = [
  {
    id: 1,
    text: "Your smile lights up my darkest days",
    subtext: "Just one look at you makes all my worries fade away. You carry a warmth that brightens everything around you.",
  },
  {
    id: 2,
    text: "You make the ordinary feel magical",
    subtext: "Whether we are grocery shopping, walking down the street, or doing absolutely nothing, every moment with you is an adventure.",
  },
  {
    id: 3,
    text: "Your beautiful heart and kindness inspire me",
    subtext: "The way you care for others, your empathy, and your gentle soul inspire me to be the best version of myself every single day.",
  },
  {
    id: 4,
    text: "You are my safe haven and my best friend",
    subtext: "In your arms, I find a peace I've never felt anywhere else. You understand me in ways nobody else ever could.",
  },
  {
    id: 5,
    text: "You make my heart skip a beat, still",
    subtext: "No matter how much time passes, seeing you still gives me butterflies. You are my today, my tomorrow, and my forever.",
  },
];

export default function WhyILoveYouStep({ onNext }: WhyILoveYouStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [viewedIndices, setViewedIndices] = useState<number[]>([]);
  const [timerProgress, setTimerProgress] = useState(0);

  React.useEffect(() => {
    // If this card is already read, set progress to 100
    if (viewedIndices.includes(currentIndex)) {
      setTimerProgress(100);
      return;
    }

    setTimerProgress(0);
    const duration = 9000; // 3 seconds per card
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const progress = Math.min((currentStep / totalSteps) * 100, 100);
      setTimerProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setViewedIndices((prev) => {
          if (prev.includes(currentIndex)) return prev;
          return [...prev, currentIndex];
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [currentIndex, viewedIndices]);

  const hasViewedAll = viewedIndices.length === reasons.length;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  const handleNext = () => {
    if (currentIndex < reasons.length - 1 && viewedIndices.includes(currentIndex)) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full gap-4 pointer-events-auto">
      <div className="w-full max-w-[420px] mx-auto p-4 md:p-5 glass rounded-2xl relative shadow-2xl border border-love-100/10">
        <div className="absolute -top-3 -left-3 text-love-400 animate-pulse">
          <Heart size={20} fill="currentColor" />
        </div>
        <div className="absolute -bottom-3 -right-3 text-love-400 animate-pulse" style={{ animationDelay: "1s" }}>
          <Heart size={20} fill="currentColor" />
        </div>

        <div className="text-center mb-2">
          <span className="text-[9px] uppercase font-bold tracking-widest text-love-300">
            Reason {currentIndex + 1} of {reasons.length}
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-white mt-0.5 text-glow-pink">
            Why I Love You
          </h3>
        </div>

        {/* Carousel Content */}
        <div className="relative min-h-[120px] overflow-hidden flex items-center justify-center py-2">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center w-full px-2"
            >
              <p className="text-base md:text-lg font-semibold text-love-100 italic leading-snug">
                &ldquo;{reasons[currentIndex].text}&rdquo;
              </p>
              <p className="text-xs md:text-sm text-slate-300 mt-2.5 leading-relaxed border-t border-love-100/5 pt-2.5">
                {reasons[currentIndex].subtext}
              </p>

              {/* Cute Heart Timer / Progress indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-3 h-5">
                {viewedIndices.includes(currentIndex) ? (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="text-[10px] text-love-300 font-bold flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Heart size={10} fill="currentColor" className="text-love-400" /> Read & Absorbed ❤️
                  </motion.span>
                ) : (
                  <div className="flex items-center gap-2">
                    {/* Progress bar */}
                    <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden border border-love-100/5">
                      <div 
                        className="h-full bg-gradient-to-r from-love-400 to-rose-400 transition-all duration-75"
                        style={{ width: `${timerProgress}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">Reading... 📖</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dot Indicators */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-love-100/5">
          {currentIndex > 0 ? (
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-love-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous reason"
            >
              <ChevronLeft size={18} />
            </button>
          ) : (
            <div className="w-8 h-8" /> // Keeps layout centered and aligned
          )}

          <div className="flex gap-1.5">
            {reasons.map((_, index) => {
              const canNavigateToDot = index <= currentIndex || viewedIndices.includes(index);
              return (
                <button
                  key={index}
                  disabled={!canNavigateToDot}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "bg-love-400 w-3" 
                      : canNavigateToDot 
                      ? "bg-slate-400 hover:bg-love-300 cursor-pointer" 
                      : "bg-slate-800 opacity-40 cursor-not-allowed"
                  }`}
                  aria-label={`Go to reason ${index + 1}`}
                />
              );
            })}
          </div>

          {currentIndex < reasons.length - 1 ? (
            <button
              disabled={!viewedIndices.includes(currentIndex)}
              onClick={handleNext}
              className={`p-1.5 rounded-full transition-all duration-300 ${
                viewedIndices.includes(currentIndex)
                  ? "hover:bg-love-500/20 text-slate-300 hover:text-white cursor-pointer"
                  : "text-slate-700 opacity-30 cursor-not-allowed"
              }`}
              aria-label="Next reason"
            >
              <ChevronRight size={18} />
            </button>
          ) : (
            <div className="w-8 h-8" /> // Keeps layout centered and aligned
          )}
        </div>
      </div>

      {/* Next Step Button */}
      <AnimatePresence mode="wait">
        {hasViewedAll ? (
          <motion.button
            key="active-btn"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-8 py-3 bg-gradient-to-r from-love-500 to-love-600 hover:from-love-400 hover:to-love-500 text-white font-bold rounded-full shadow-lg hover:shadow-love-500/30 transition-all cursor-pointer text-xs uppercase tracking-wider animate-pulse"
          >
            Reveal Secret Note... 💌
          </motion.button>
        ) : (
          <motion.div
            key="disabled-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="px-8 py-3 bg-slate-800 text-slate-400 font-bold rounded-full border border-slate-700 text-xs uppercase tracking-wider cursor-not-allowed select-none"
          >
            Read all reasons to unlock ({viewedIndices.length}/{reasons.length}) 🔒
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
