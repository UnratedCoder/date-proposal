"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Heart, ArrowRight } from "lucide-react";

interface CalendarStepProps {
  onSelectDate: (date: string) => void;
}

export default function CalendarStep({ onSelectDate }: CalendarStepProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // June 2026 starts on a Monday (June 1, 2026)
  // Total days in June: 30
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleNext = () => {
    if (selectedDay) {
      // Format as "Saturday, June 20" or similar
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      // June 1, 2026 is Monday, so day d is (d - 1) days after Monday.
      // Day of week index = (1 + d - 1) % 7 = d % 7.
      // Monday = 1, Tuesday = 2, ..., Saturday = 6, Sunday = 0.
      const dayOfWeekIndex = selectedDay % 7;
      const dayOfWeekName = dayNames[dayOfWeekIndex === 0 ? 0 : dayOfWeekIndex];
      
      onSelectDate(`${dayOfWeekName}, June ${selectedDay}`);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 md:p-5 glass rounded-3xl shadow-2xl border border-love-100/10 flex flex-col items-center pointer-events-auto">
      {/* Calendar Header Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 bg-love-500/20 text-love-400 rounded-full flex items-center justify-center mb-2"
      >
        <CalendarIcon size={20} />
      </motion.div>

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white text-glow-pink">
        When are you free?
      </h2>
      <p className="text-[9px] md:text-[10px] tracking-widest text-love-300 uppercase font-semibold mt-0.5 mb-3">
        Pick a date
      </p>

      {/* Month Display */}
      <div className="w-full flex justify-between items-center px-2 mb-2">
        <span className="font-serif text-base text-white font-semibold">June 2026</span>
      </div>

      {/* Calendar Grid */}
      <div className="w-full grid grid-cols-7 gap-1 text-center">
        {/* Week Days Headers */}
        {weekDays.map((wd) => (
          <div key={wd} className="text-xs font-semibold text-love-300 py-0.5 uppercase opacity-60">
            {wd}
          </div>
        ))}

        {/* Days of Month */}
        {daysInJune.map((day) => {
          const isSelected = selectedDay === day;
          
          // Check if current date is June 2026, otherwise default to June 20, 2026
          const todayDate = new Date();
          const isCurrentJune2026 = todayDate.getMonth() === 5 && todayDate.getFullYear() === 2026;
          const isToday = isCurrentJune2026 ? todayDate.getDate() === day : day === 20;

          return (
            <motion.button
              key={day}
              onClick={() => handleDaySelect(day)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className={`relative h-9 w-9 flex items-center justify-center text-xs font-medium rounded-full transition-colors cursor-pointer ${
                isSelected
                  ? "bg-love-500 text-white font-bold shadow-md shadow-love-500/30"
                  : isToday
                  ? "border border-dashed border-love-400 bg-love-500/10 text-love-200 font-bold"
                  : "hover:bg-love-500/20 text-slate-200"
              }`}
            >
              {day}
              
              {/* Highlight today's date with a subtle glow indicator */}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 bg-love-400 rounded-full animate-ping" />
              )}

              {/* Heart overlay when selected */}
              {isSelected && (
                <motion.div
                  layoutId="activeDayHeart"
                  className="absolute -inset-0.5 border border-love-300 rounded-full pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="absolute -top-1 -right-1 text-love-400">
                    <Heart size={8} fill="currentColor" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {selectedDay && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={handleNext}
            className="mt-4 w-full py-2.5 bg-love-500 hover:bg-love-400 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer text-sm"
          >
            Next Step <ArrowRight size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
