"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Heart, Sparkles, Code, Compass, HeartHandshake } from "lucide-react";

export default function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Symmetrical Floating Info Button (Top Left) */}
      <div 
        className="fixed top-6 left-6 z-40 flex items-center gap-2 p-2 bg-slate-900/60 backdrop-blur-md border border-love-100/10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-900/80 cursor-pointer pointer-events-auto"
        onClick={toggleModal}
        title="About this Project"
      >
        <div className="w-10 h-10 bg-love-500/15 border border-love-500/25 rounded-full flex items-center justify-center text-love-200">
          <Info size={18} className="animate-pulse" />
        </div>
        <div className="flex flex-col pr-3 select-none">
          <span className="text-[9px] text-love-200 uppercase tracking-widest font-bold">
            Project Info
          </span>
          <span className="text-xs text-white font-semibold leading-tight">
            About Wizard
          </span>
        </div>
      </div>

      {/* Backdrop & Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md pointer-events-auto">
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-slate-900/90 border border-love-100/10 rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(255,10,84,0.3)] flex flex-col max-h-[85vh] text-left select-text"
            >
              {/* Top ambient glow inside modal */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-love-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="p-6 border-b border-love-100/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-love-500/10 rounded-xl text-love-400 border border-love-500/25">
                    <Heart size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-love-100 flex items-center gap-1.5 leading-tight">
                      Romantic Proposal Wizard
                      <Sparkles size={16} className="text-yellow-400 animate-bounce" />
                    </h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
                      Handcrafted Storytelling Experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleModal}
                  className="p-2 hover:bg-love-500/10 text-slate-400 hover:text-white rounded-full border border-slate-800 transition-colors pointer-events-auto"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content (Scrollable) */}
              <div className="p-6 overflow-y-auto space-y-6 relative z-10 flex-1 custom-scrollbar text-sm text-slate-300 leading-relaxed max-h-[60vh]">
                {/* Intro Card */}
                <div className="p-4 bg-gradient-to-r from-love-950/40 to-slate-900/40 border border-love-900/30 rounded-2xl flex items-start gap-3">
                  <HeartHandshake className="text-love-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <span className="font-serif font-semibold text-love-200 block text-base mb-1">What is this project about?</span>
                    This web application is a beautifully choreographed digital proposal wizard designed to ask a special someone out on a romantic date. It guides the recipient through an immersive series of steps—reflecting on memories, expressing affection, playing a game, choosing schedules—before rendering a final, custom boarding pass ticket.
                  </div>
                </div>

                {/* Narrative Steps Grid */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-love-300 mb-3 flex items-center gap-1.5">
                    <Compass size={14} /> Interactive Storytelling Stages
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">1. Memory Lane</strong>
                      <span className="text-[12px] text-slate-400">Draggable Polaroid-style memory cards that can be stacked and tossed dynamically.</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">2. Love Carousel</strong>
                      <span className="text-[12px] text-slate-400">A read-locked carousel enforcing a 3-second active reading timer before moving forward.</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">3. Heart Catcher</strong>
                      <span className="text-[12px] text-slate-400">A tactile, fun interactive HTML5 canvas mini-game to catch falling hearts.</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">4. Dodger Proposal</strong>
                      <span className="text-[12px] text-slate-400">The proposal question where the &quot;No&quot; button playfully teleports away from the cursor.</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">5. Plan The Date</strong>
                      <span className="text-[12px] text-slate-400">Atmospheric custom calendar picker, sun/moon time slot selector, and food emoji cravings board.</span>
                    </div>
                    <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl">
                      <strong className="text-white block text-[13px] font-semibold mb-1">6. Boarding Ticket</strong>
                      <span className="text-[12px] text-slate-400">A luxurious gold-embossed ivory boarding pass inside a velvet pocket with Google Calendar sync.</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Details */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-love-300 mb-3 flex items-center gap-1.5">
                    <Code size={14} /> Technology & Aesthetics
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-love-500 rounded-full" />
                      <span><strong>Next.js 16</strong> + TypeScript & App Router</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-love-500 rounded-full" />
                      <span><strong>Tailwind CSS v4</strong> for glassmorphism & gradients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-love-500 rounded-full" />
                      <span><strong>Framer Motion</strong> for spring physics & 3D cards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-love-500 rounded-full" />
                      <span><strong>HTML5 Canvas</strong> floating petals & cursor trails</span>
                    </li>
                    <li className="flex items-center gap-2 col-span-1 md:col-span-2">
                      <span className="w-1.5 h-1.5 bg-love-500 rounded-full" />
                      <span><strong>Zero-Scroll Layout:</strong> 100% viewport-fitting layout optimized for mobile and desktop.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-love-100/10 bg-slate-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span>Created with love and care</span>
                  <Heart size={12} className="text-love-500 animate-pulse" fill="currentColor" />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/UnratedCoder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-lg text-slate-300 font-semibold border border-slate-700 transition-colors pointer-events-auto"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>UnratedCoder</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
