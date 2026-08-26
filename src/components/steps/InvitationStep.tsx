"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { MailOpen, Calendar, Heart, MapPin } from "lucide-react";

interface InvitationStepProps {
  date: string;
  time: string;
  food: string[];
}

export default function InvitationStep({ date, time, food }: InvitationStepProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Auto open the envelope after 1.2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Fire celebratory confetti when envelope opens!
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti colors: shades of pink, red, and gold
      const colors = ["#ff477e", "#ffccd5", "#ff0a54", "#de0a26", "#ffd166"];

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors,
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen]);

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Our Special Date ❤️");
    
    // Parse Date dynamically
    let dateStr = "";
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      const y = parsedDate.getFullYear();
      const m = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const d = String(parsedDate.getDate()).padStart(2, "0");
      dateStr = `${y}${m}${d}`;
    } else {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      dateStr = `${y}${m}${d}`;
    }

    // Parse Time (e.g. "Evening (7:00 PM)", "Night (8:30 PM)", "Late Night (10:00 PM)")
    let startHour = "190000";
    let endHour = "220000";
    if (time.includes("7:00")) {
      startHour = "190000";
      endHour = "220000";
    } else if (time.includes("8:30")) {
      startHour = "203000";
      endHour = "233000";
    } else if (time.includes("10:00")) {
      startHour = "220000";
      endHour = "010000"; // Next day (rough approximation)
    }

    const dates = `${dateStr}T${startHour}/${dateStr}T${endHour}`;
    
    const foodList = food.join(", ");
    const details = encodeURIComponent(
      `Yay! It's a date!\n\n📅 When: ${date} at ${time}\n🍕 What we're having: ${foodList}\n\n"Every great love story has a first evening. This is ours." 💖`
    );
    const location = encodeURIComponent("Our Cozy Date Spot ✨");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col items-center pointer-events-auto">
      {/* Outer Envelope Container */}
      <div 
        className="relative w-full aspect-[3/2] flex items-center justify-center mb-4 perspective-1000 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        
        {/* Envelope Back */}
        <div className="absolute inset-0 bg-gradient-to-br from-love-950 via-love-900 to-rose-950 border border-love-100/10 rounded-2xl shadow-2xl z-10 overflow-hidden flex items-end">
          {/* Inner liner details */}
          <div className="w-full h-full bg-gradient-to-t from-love-900/30 via-transparent to-love-900/10 pointer-events-none" />
        </div>

        {/* The Sliding Ticket / Love Card */}
        <motion.div
          initial={{ y: 50, scale: 0.9, opacity: 0, z: 5 }}
          animate={
            isOpen 
              ? { y: -65, scale: 1, opacity: 1, zIndex: 30, z: 15 } 
              : { y: 20, scale: 0.9, opacity: 0, z: 5 }
          }
          transition={{ type: "spring" as const, stiffness: 80, damping: 15, delay: 0.4 }}
          className="absolute inset-x-4 top-4 bg-gradient-to-br from-white via-rose-50 to-amber-50 text-slate-800 p-4 md:p-5 rounded-2xl shadow-[0_20px_50px_rgba(244,63,94,0.15),0_0_30px_rgba(251,191,36,0.15)] border border-rose-200/80 flex flex-col justify-between overflow-hidden"
          style={{ height: "260px", transformStyle: "preserve-3d" }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent closing envelope when clicking ticket details
          }}
          onTouchEnd={(e) => {
            e.stopPropagation(); // Prevent closing envelope when tapping ticket details
          }}
        >
          {/* Decorative Rose Gold / Gold Inset Borders */}
          <div className="absolute inset-1 border border-rose-200/60 rounded-xl pointer-events-none" />
          <div className="absolute inset-1.5 border border-dashed border-amber-300/40 rounded-xl pointer-events-none" />

          {/* Ticket Header */}
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex justify-between items-start border-b border-dashed border-rose-200/60 pb-2 z-10"
          >
            <div>
              <span className="text-[9px] font-bold text-love-500 uppercase tracking-widest">
                Official Invitation
              </span>
              <h3 className="font-serif text-xl font-bold text-rose-950 tracking-tight mt-0.5">
                It&apos;s a Date!
              </h3>
            </div>
            <div className="text-love-500 animate-pulse">
              <Heart size={20} fill="currentColor" />
            </div>
          </motion.div>

          {/* Ticket Body / Info */}
          <div className="flex-1 py-2 flex flex-col gap-2.5 justify-center z-10">
            {/* Date info */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ delay: 0.6, type: "spring" as const, stiffness: 100, damping: 15 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-love-500 flex-shrink-0 shadow-sm">
                <Calendar size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider leading-none">When</span>
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight mt-0.5">{date}</span>
                <span className="text-[10px] text-slate-500 leading-none">{time}</span>
              </div>
            </motion.div>

            {/* Food info */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ delay: 0.7, type: "spring" as const, stiffness: 100, damping: 15 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-love-500 flex-shrink-0 shadow-sm">
                <Heart size={14} fill="currentColor" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider leading-none">What We&apos;re Having</span>
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight truncate max-w-[200px] mt-0.5">
                  {food.join(" & ")}
                </span>
              </div>
            </motion.div>

            {/* Location info */}
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ delay: 0.8, type: "spring" as const, stiffness: 100, damping: 15 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-love-500 flex-shrink-0 shadow-sm">
                <MapPin size={14} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider leading-none">Where</span>
                <span className="text-xs md:text-sm font-bold text-slate-800 leading-tight mt-0.5">Our Cozy Date Spot ✨</span>
              </div>
            </motion.div>
          </div>

          {/* Ticket Footer Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="border-t border-rose-200/50 pt-2 text-center z-10"
          >
            <p className="font-serif text-[10px] text-love-800 italic leading-snug">
              &ldquo;Every great love story has a first evening. This is ours.&rdquo;
            </p>
          </motion.div>
        </motion.div>

        {/* Envelope Front / Flap Cover */}
        <motion.div
          animate={isOpen ? { rotateX: 180, zIndex: 5, z: 2 } : { rotateX: 0, zIndex: 40, z: 25 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-love-700 to-love-800 rounded-t-2xl shadow-inner origin-top border-b border-love-900/20 flex items-center justify-center cursor-pointer"
          style={{ transformStyle: "preserve-3d", transformOrigin: "top" }}
        >
          {/* Back side of the flap (liner) */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-love-900 to-love-800 rounded-t-2xl border-b border-love-950" />
          {/* Front side of the flap */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}
          >
            <MailOpen className="text-love-100" size={28} />
          </div>
        </motion.div>

        {/* Left and Right Triangles for Envelope Front overlap */}
        <div 
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-love-800 to-love-700 rounded-b-2xl border-t border-love-900/20 z-20 pointer-events-none flex items-center justify-center"
          style={{ transform: "translateZ(10px)" }}
        >
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
            className="text-love-100/30"
          >
            <Heart size={28} fill="currentColor" className="opacity-20" />
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className="w-full flex flex-col gap-2.5 mt-2"
      >
        {/* Google Calendar Link */}
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 bg-gradient-to-r from-love-500 via-love-600 to-rose-500 hover:from-love-400 hover:to-rose-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center tracking-wide text-sm font-sans"
        >
          <Calendar size={18} /> Add to Calendar
        </a>

        {/* Cute restart button */}
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-love-200/80 hover:text-white transition-colors cursor-pointer text-center py-1"
        >
          Want to change details? Restart
        </button>
      </motion.div>
    </div>
  );
}
