"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarStepProps {
  onSelectDate: (date: string) => void;
}

export default function CalendarStep({ onSelectDate }: CalendarStepProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Number of days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day of week of first day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayRaw = new Date(currentYear, currentMonth, 1).getDay();
  // Convert so Monday = 0, Tuesday = 1, ..., Sunday = 6
  const startOffset = firstDayRaw === 0 ? 6 : firstDayRaw - 1;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    // Prevent navigating before current month
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) {
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const canGoPrev = !(currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  const handleDaySelect = (day: number) => {
    const targetDate = new Date(currentYear, currentMonth, day);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (targetDate < startOfToday) return;

    setSelectedDate(targetDate);
  };

  const handleNext = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      onSelectDate(formattedDate);
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

      {/* Month Display & Navigation */}
      <div className="w-full flex justify-between items-center px-1 mb-2">
        <button
          onClick={handlePrevMonth}
          disabled={!canGoPrev}
          className={`p-1.5 rounded-full text-slate-300 transition-colors ${
            canGoPrev ? "hover:bg-love-500/20 hover:text-white cursor-pointer" : "opacity-20 cursor-not-allowed"
          }`}
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="font-serif text-base text-white font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </span>

        <button
          onClick={handleNextMonth}
          className="p-1.5 rounded-full text-slate-300 hover:bg-love-500/20 hover:text-white transition-colors cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="w-full grid grid-cols-7 gap-1 text-center">
        {/* Week Days Headers */}
        {weekDays.map((wd) => (
          <div key={wd} className="text-xs font-semibold text-love-300 py-0.5 uppercase opacity-60">
            {wd}
          </div>
        ))}

        {/* Blank Padding Days */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`blank-${i}`} className="h-9 w-9" />
        ))}

        {/* Days of Month */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isSelected =
            selectedDate !== null &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

          const isToday =
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

          const targetDate = new Date(currentYear, currentMonth, day);
          const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isPast = targetDate < startOfToday;

          return (
            <motion.button
              key={day}
              disabled={isPast}
              onClick={() => handleDaySelect(day)}
              whileHover={!isPast ? { scale: 1.15 } : {}}
              whileTap={!isPast ? { scale: 0.95 } : {}}
              className={`relative h-9 w-9 flex items-center justify-center text-xs font-medium rounded-full transition-colors ${
                isPast
                  ? "text-slate-600 opacity-30 cursor-not-allowed"
                  : isSelected
                  ? "bg-love-500 text-white font-bold shadow-md shadow-love-500/30 cursor-pointer"
                  : isToday
                  ? "border border-dashed border-love-400 bg-love-500/10 text-love-200 font-bold cursor-pointer hover:bg-love-500/20"
                  : "hover:bg-love-500/20 text-slate-200 cursor-pointer"
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
        {selectedDate && (
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
