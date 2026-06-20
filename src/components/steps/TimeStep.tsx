"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, SunDim, Moon, MoonStar } from "lucide-react";

interface TimeStepProps {
  onSelectTime: (time: string) => void;
}

interface TimeOption {
  id: string;
  label: string;
  time: string;
  description: string;
  icon: React.ReactNode;
}

export default function TimeStep({ onSelectTime }: TimeStepProps) {
  const options: TimeOption[] = [
    {
      id: "evening",
      label: "Evening",
      time: "7:00 PM",
      description: "Sunset vibes & golden hour",
      icon: <SunDim className="text-amber-400" size={20} />,
    },
    {
      id: "night",
      label: "Night",
      time: "8:30 PM",
      description: "Cozy dinner & warm lights",
      icon: <Moon className="text-love-200" size={20} />,
    },
    {
      id: "latenight",
      label: "Late Night",
      time: "10:00 PM",
      description: "Quiet conversations & stars",
      icon: <MoonStar className="text-violet-400" size={20} />,
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto p-4 md:p-5 glass rounded-3xl shadow-2xl border border-love-100/10 flex flex-col items-center pointer-events-auto">
      {/* Clock Icon Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 bg-love-500/20 text-love-400 rounded-full flex items-center justify-center mb-2"
      >
        <Clock size={20} />
      </motion.div>

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white text-glow-pink">
        What time?
      </h2>
      <p className="text-[9px] md:text-[10px] tracking-widest text-love-300 uppercase font-semibold mt-0.5 mb-4">
        Choose your hour
      </p>

      {/* Time Options Cards */}
      <div className="w-full flex flex-col gap-2.5">
        {options.map((opt, index) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTime(`${opt.label} (${opt.time})`)}
            className="w-full py-2.5 px-3 bg-slate-900/40 hover:bg-love-500/15 border border-love-100/5 hover:border-love-400/30 rounded-2xl flex items-center gap-3 text-left transition-colors duration-300 cursor-pointer shadow-md"
          >
            {/* Hour Icon Box */}
            <div className="w-10 h-10 bg-slate-950/60 rounded-xl flex items-center justify-center border border-love-100/5 flex-shrink-0">
              {opt.icon}
            </div>

            {/* Hour Label and Value */}
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[10px] text-love-200 font-bold uppercase tracking-wider leading-none mb-0.5">
                {opt.label}
              </span>
              <span className="text-base text-white font-bold tracking-tight leading-tight">
                {opt.time}
              </span>
              <span className="text-[9px] text-slate-400 truncate mt-0.5">
                {opt.description}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
