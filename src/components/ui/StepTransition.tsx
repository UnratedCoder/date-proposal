"use client";

import React from "react";
import { motion } from "framer-motion";

interface StepTransitionProps {
  children: React.ReactNode;
  stepKey: string | number;
  className?: string;
}

const variants = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0, 
    transition: { type: "spring" as const, stiffness: 110, damping: 16 } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.02,
    y: -12, 
    transition: { duration: 0.25, ease: "easeInOut" as const } 
  },
};

export default function StepTransition({ children, stepKey, className = "w-full" }: StepTransitionProps) {
  return (
    <motion.div
      key={stepKey}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}
