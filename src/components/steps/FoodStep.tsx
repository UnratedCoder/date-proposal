"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Heart } from "lucide-react";

interface FoodStepProps {
  onSelectFood: (foodItems: string[]) => void;
}

interface FoodItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

const foodOptions: FoodItem[] = [
  { id: "sushi", name: "Sushi", emoji: "🍣", category: "Japanese" },
  { id: "pasta", name: "Pasta", emoji: "🍝", category: "Italian" },
  { id: "pizza", name: "Pizza", emoji: "🍕", category: "Italian" },
  { id: "biryani", name: "Biryani", emoji: "🍛", category: "Indian" },
  { id: "kebabs", name: "Kebabs", emoji: "🍢", category: "Middle Eastern" },
  { id: "tacos", name: "Tacos", emoji: "🌮", category: "Mexican" },
  { id: "ramen", name: "Ramen", emoji: "🍜", category: "Noodles" },
  { id: "burgers", name: "Burgers", emoji: "🍔", category: "American" },
  { id: "desserts", name: "Desserts", emoji: "🍰", category: "Sweet" },
];

export default function FoodStep({ onSelectFood }: FoodStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getDynamicMessage = () => {
    if (selectedIds.length === 0) {
      return "Select what you're craving";
    }

    const names = selectedIds.map((id) => foodOptions.find((f) => f.id === id)?.name || "");
    const formattedList = names.join(" & ");

    // Custom personalized comments based on selections
    if (selectedIds.includes("biryani") && selectedIds.includes("kebabs") && selectedIds.includes("desserts")) {
      return `${formattedList} — bold choice! 💖`;
    }
    if (selectedIds.includes("pizza") && selectedIds.includes("pasta")) {
      return `${formattedList} — classic Italian romance! 🍕🍝`;
    }
    if (selectedIds.length === 1 && selectedIds.includes("desserts")) {
      return "Just desserts? Sweetest date ever! 🍰✨";
    }
    if (selectedIds.includes("sushi") && selectedIds.includes("ramen")) {
      return `${formattedList} — cozy Asian date night! 🍣🍜`;
    }
    if (selectedIds.length >= 5) {
      return `${formattedList} — wow, quite an appetite! Can't wait! 😋💝`;
    }

    return `${formattedList} — perfect combination! ✨`;
  };

  const handleNext = () => {
    if (selectedIds.length > 0) {
      const selectedNames = selectedIds.map(
        (id) => foodOptions.find((f) => f.id === id)?.name || ""
      );
      onSelectFood(selectedNames);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-5 glass rounded-3xl shadow-2xl border border-love-100/10 flex flex-col items-center pointer-events-auto">
      {/* Header Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 bg-love-500/20 text-love-400 rounded-full flex items-center justify-center mb-2"
      >
        <Utensils size={20} />
      </motion.div>

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl font-bold text-white text-glow-pink">
        What are we feeling?
      </h2>
      <p className="text-[9px] md:text-[10px] tracking-widest text-love-300 uppercase font-semibold mt-0.5 mb-3">
        Pick one or more
      </p>

      {/* Food Grid */}
      <div className="w-full grid grid-cols-3 gap-2 mb-4">
        {foodOptions.map((food, index) => {
          const isSelected = selectedIds.includes(food.id);
          return (
            <motion.button
              key={food.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelect(food.id)}
              className={`p-2 bg-slate-900/40 hover:bg-slate-800/40 border rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                isSelected
                  ? "border-love-400 bg-love-500/10 shadow-md shadow-love-500/10"
                  : "border-love-100/5 hover:border-love-300/30"
              }`}
            >
              {/* Emoji animation */}
              <motion.span
                animate={isSelected ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-2xl select-none"
              >
                {food.emoji}
              </motion.span>
              <span className="text-[11px] font-semibold text-white tracking-wide">
                {food.name}
              </span>
              
              {/* Selected Heart Marker */}
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 text-love-400 animate-pulse">
                  <Heart size={8} fill="currentColor" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Selection Status */}
      <div className="w-full text-center px-4 py-1.5 min-h-[36px] flex items-center justify-center bg-slate-950/40 rounded-xl border border-love-100/5">
        <p className="text-xs font-semibold text-love-200 leading-normal italic">
          {getDynamicMessage()}
        </p>
      </div>

      {/* Let's Go Button */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={handleNext}
            className="mt-4 w-full py-2.5 bg-gradient-to-r from-love-500 to-love-600 hover:from-love-400 hover:to-love-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer text-sm tracking-wide"
          >
            Let&apos;s go! <Heart size={14} fill="currentColor" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
