"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// VFX components
import CursorTrail from "@/components/vfx/CursorTrail";
import BackgroundParticles from "@/components/vfx/BackgroundParticles";
import EnvelopeOverlay from "@/components/vfx/EnvelopeOverlay";

// UI components
import MusicPlayer from "@/components/ui/MusicPlayer";
import StepTransition from "@/components/ui/StepTransition";

// Step components
import MemoryLaneStep from "@/components/steps/MemoryLaneStep";
import WhyILoveYouStep from "@/components/steps/WhyILoveYouStep";
import GameStep from "@/components/steps/GameStep";
import ProposalStep from "@/components/steps/ProposalStep";
import CalendarStep from "@/components/steps/CalendarStep";
import TimeStep from "@/components/steps/TimeStep";
import FoodStep from "@/components/steps/FoodStep";
import InvitationStep from "@/components/steps/InvitationStep";

export default function Home() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [food, setFood] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Mouse tracking for ambient glow effect and mobile check
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenEnvelope = () => {
    setHasOpenedEnvelope(true);
    setMusicPlaying(true);
  };

  const handleAcceptProposal = () => {
    setStep(5);
  };

  const handleSelectDate = (selectedDate: string) => {
    setDate(selectedDate);
    setStep(6);
  };

  const handleSelectTime = (selectedTime: string) => {
    setTime(selectedTime);
    setStep(7);
  };

  const handleSelectFood = (selectedFood: string[]) => {
    setFood(selectedFood);
    setStep(8);
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-velvet-950 to-slate-950 py-6 px-4 select-none">
      {/* 1. Canvas VFX: Floating Hearts & Cherry Blossoms */}
      <BackgroundParticles />

      {/* 2. Canvas VFX: Sparkle Cursor Trail (Desktop only for performance) */}
      {!isMobile && <CursorTrail />}

      {/* 3. Mouse-tracking Ambient Glow */}
      {!isMobile && (
        <div
          className="fixed pointer-events-none inset-0 z-0 transition-opacity duration-300 opacity-70"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 10, 84, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* 4. Floating Vinyl Music Player */}
      {hasOpenedEnvelope && (
        <MusicPlayer isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} />
      )}

      {/* Left Side Romantic Collage (Desktop only) */}
      {hasOpenedEnvelope && (
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="hidden lg:flex flex-col items-start absolute left-6 xl:left-12 top-1/4 z-0 pointer-events-none select-none w-52"
        >
          {/* Card 1: Romantic Silhouette */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-10, -8, -10] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut" as const,
            }}
            className="bg-white p-2 pb-4 rounded shadow-[0_8px_20px_rgba(255,10,84,0.12)] border border-pink-100 w-32 relative z-10"
          >
            <div className="relative w-full aspect-square bg-slate-100 rounded overflow-hidden">
              <Image
                src="/images/sunset_walk.png"
                alt="Sunset walk silhouette"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="mt-1 text-center text-slate-800 font-serif text-[9px] italic">
              Pure happiness ❤️
            </div>
          </motion.div>

          {/* Card 2: Red Rose (Overlapping) */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [6, 8, 6] }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut" as const,
              delay: 0.5,
            }}
            className="bg-white p-2 pb-4 rounded shadow-[0_8px_20px_rgba(255,10,84,0.12)] border border-pink-100 w-30 ml-12 -mt-6 relative z-20"
          >
            <div className="relative w-full aspect-square bg-slate-100 rounded overflow-hidden">
              <Image
                src="/images/romantic_roses.png"
                alt="Romantic roses"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
            <div className="mt-1 text-center text-slate-800 font-serif text-[9px] italic">
              A rose for you 🌹
            </div>
          </motion.div>

          {/* Decorative Floating Roses and Leaves */}
          <div className="absolute top-0 right-4 z-0">
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut" as const,
              }}
              className="text-xl filter drop-shadow-[0_0_5px_rgba(244,63,94,0.3)]"
            >
              🌹
            </motion.div>
          </div>
          <div className="absolute bottom-2 left-2 z-30">
            <motion.div
              animate={{ rotate: [0, 15, 0], scale: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut" as const,
                delay: 1,
              }}
              className="text-lg"
            >
              🌿
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Right Side Romantic Collage (Desktop only) */}
      {hasOpenedEnvelope && (
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.9, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden lg:flex flex-col items-end absolute right-6 xl:right-12 top-1/3 z-0 pointer-events-none select-none w-52"
        >
          {/* Card 1: Heart Balloon / Sky */}
          <motion.div
            animate={{ y: [-8, 2, -8], rotate: [8, 6, 8] }}
            transition={{
              repeat: Infinity,
              duration: 6.5,
              ease: "easeInOut" as const,
            }}
            className="bg-white p-2 pb-4 rounded shadow-[0_8px_20px_rgba(255,10,84,0.12)] border border-pink-100 w-32 relative z-10"
          >
            <div className="relative w-full aspect-square bg-slate-100 rounded overflow-hidden">
              <Image
                src="/images/heart_balloon.png"
                alt="Heart balloon"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="mt-1 text-center text-slate-800 font-serif text-[9px] italic">
              Made for each other 💑
            </div>
          </motion.div>

          {/* Card 2: Warm Candlelight dinner (Overlapping) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-6, -4, -6] }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: "easeInOut" as const,
              delay: 0.3,
            }}
            className="bg-white p-2 pb-4 rounded shadow-[0_8px_20px_rgba(255,10,84,0.12)] border border-pink-100 w-30 mr-12 -mt-6 relative z-20"
          >
            <div className="relative w-full aspect-square bg-slate-100 rounded overflow-hidden">
              <Image
                src="/images/love_candles.png"
                alt="Romantic candlelight"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
            <div className="mt-1 text-center text-slate-800 font-serif text-[9px] italic">
              Cozy evenings ✨
            </div>
          </motion.div>

          {/* Decorative Floating Roses and Hearts */}
          <div className="absolute top-1/2 left-4 z-0">
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut" as const,
              }}
              className="text-xl filter drop-shadow-[0_0_5px_rgba(244,63,94,0.3)]"
            >
              🌹
            </motion.div>
          </div>
          <div className="absolute -bottom-2 right-2 z-30">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut" as const,
                delay: 0.8,
              }}
              className="text-lg filter drop-shadow-[0_0_5px_rgba(244,63,94,0.3)]"
            >
              💖
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* 5. Main Narrative Content Container */}
      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {/* Step 1: Polaroid Gallery (Memory Lane) */}
          {step === 1 && hasOpenedEnvelope && (
            <StepTransition
              stepKey="step1"
              className="w-full flex flex-col items-center"
            >
              <MemoryLaneStep onNext={() => setStep(2)} />
            </StepTransition>
          )}

          {/* Step 2: Why I Love You (Reasons Carousel) */}
          {step === 2 && (
            <StepTransition
              stepKey="step2"
              className="w-full flex flex-col items-center"
            >
              <WhyILoveYouStep onNext={() => setStep(3)} />
            </StepTransition>
          )}

          {/* Step 3: Catch Hearts Mini-Game */}
          {step === 3 && (
            <StepTransition
              stepKey="step3"
              className="w-full flex flex-col items-center"
            >
              <GameStep onNext={() => setStep(4)} />
            </StepTransition>
          )}

          {/* Step 4: The Proposal (dodger) */}
          {step === 4 && (
            <StepTransition
              stepKey="step4"
              className="w-full flex flex-col items-center"
            >
              <ProposalStep onAccept={handleAcceptProposal} />
            </StepTransition>
          )}

          {/* Step 5: Calendar Selector */}
          {step === 5 && (
            <StepTransition
              stepKey="step5"
              className="w-full flex flex-col items-center"
            >
              <CalendarStep onSelectDate={handleSelectDate} />
            </StepTransition>
          )}

          {/* Step 6: Time Selector */}
          {step === 6 && (
            <StepTransition
              stepKey="step6"
              className="w-full flex flex-col items-center"
            >
              <TimeStep onSelectTime={handleSelectTime} />
            </StepTransition>
          )}

          {/* Step 7: Food Selector */}
          {step === 7 && (
            <StepTransition
              stepKey="step7"
              className="w-full flex flex-col items-center"
            >
              <FoodStep onSelectFood={handleSelectFood} />
            </StepTransition>
          )}

          {/* Step 8: Invitation Envelope Reveal */}
          {step === 8 && (
            <StepTransition
              stepKey="step8"
              className="w-full flex flex-col items-center"
            >
              <InvitationStep date={date} time={time} food={food} />
            </StepTransition>
          )}
        </AnimatePresence>
      </div>

      {/* 6. Opening wax-sealed letter overlay */}
      <AnimatePresence>
        {!hasOpenedEnvelope && <EnvelopeOverlay onOpen={handleOpenEnvelope} />}
      </AnimatePresence>

      {/* Love Footer */}
      <footer className="absolute bottom-3 w-full px-4 text-center z-10 flex flex-col items-center gap-1 opacity-40 text-[8px] md:text-[9px] uppercase tracking-widest text-slate-400 leading-normal select-none">
        <div>© 2026 Handmade with Love. All Rights Reserved.</div>
        <div className="flex flex-wrap items-center justify-center gap-1">
          <span>Dedicated to my beautiful girl ❤️</span>
          <span className="opacity-40 font-light">|</span>
        </div>
      </footer>
    </main>
  );
}
