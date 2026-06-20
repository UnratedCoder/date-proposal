"use client";

import React, { useRef, useEffect, useState } from "react";
import { Music, Volume2, VolumeX, Play, Pause, SkipForward } from "lucide-react";

interface Track {
  name: string;
  artist: string;
  url: string;
  genre: string;
  startTime?: number; // Starting offset in seconds (e.g. 80 seconds for chorus)
}

export const playlist: Track[] = [
  {
    name: "The Night We Met",
    artist: "Lord Huron",
    url: "/The Night We Met.m4a",
    genre: "Our Song",
    startTime: 22, // Starts at 22 seconds from the beginning
  },
];

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function MusicPlayer({ isPlaying, setIsPlaying }: MusicPlayerProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[trackIndex];

  // Initialize and play Audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(currentTrack.url);
    audio.loop = true;
    audio.volume = 0.5;
    audio.muted = isMuted;

    // Set starting time once metadata is loaded
    const handleLoadedMetadata = () => {
      if (currentTrack.startTime && audio.currentTime < currentTrack.startTime) {
        audio.currentTime = currentTrack.startTime;
      }
    };
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audioRef.current = audio;

    const handleError = (e: ErrorEvent) => {
      console.warn("Audio loading failed. Fallback or handle gracefully.", e);
      setAudioError(true);
    };
    audio.addEventListener("error", handleError);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Playback failed automatically. Needs user interaction.", err);
      });
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, [trackIndex]);

  // Synchronize playing state with prop
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Handle playback blocks
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAudioError(false);
    setTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (audioError) {
    return (
      <div 
        className="fixed top-6 right-6 z-40 p-2 bg-slate-900/80 border border-red-500/30 rounded-full flex items-center gap-2 cursor-pointer pointer-events-auto"
        onClick={() => {
          setAudioError(false);
          setTrackIndex((prev) => prev); // force reload attempt
        }}
        title="Track load error. Click to retry playing"
      >
        <span className="text-[10px] text-red-400 font-semibold px-3 py-1 uppercase">Audio Error. Retry?</span>
      </div>
    );
  }

  return (
    <div 
      className="fixed top-6 right-6 z-40 flex items-center gap-3 p-2 bg-slate-900/60 backdrop-blur-md border border-love-100/10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-900/80 cursor-pointer pointer-events-auto"
      onClick={togglePlay}
      title={isPlaying ? "Click to Pause" : "Click to Play Romantic Music"}
    >
      {/* Rotating Vinyl */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div 
          className={`w-10 h-10 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center shadow-md relative transition-transform duration-[4000ms] ease-linear ${
            isPlaying ? "rotate-360 animate-spin" : ""
          }`}
          style={{ animationDuration: "5s" }}
        >
          <div className="absolute inset-1 border border-slate-900/40 rounded-full" />
          <div className="absolute inset-2 border border-slate-900/30 rounded-full" />
          
          <div className="w-4 h-4 bg-love-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
          </div>
        </div>

        {/* Tone Arm */}
        <div 
          className={`absolute top-0 right-0 w-4 h-4 origin-top-right transition-transform duration-500 pointer-events-none ${
            isPlaying ? "rotate-[15deg]" : "rotate-0"
          }`}
          style={{ transformOrigin: "100% 0%" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M12 0L8 8L3 9L1 11" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="0.5" y="8.5" width="2" height="2" fill="#de0a26" rx="0.5"/>
          </svg>
        </div>
      </div>

      {/* Track Info */}
      <div className="flex flex-col pr-3 max-w-[120px] select-none">
        <span className="text-[9px] text-love-200 uppercase tracking-widest font-bold truncate">
          {currentTrack.genre}
        </span>
        <span className="text-xs text-white font-semibold truncate leading-tight">
          {currentTrack.name}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 border-l border-love-100/10 pl-2">
        <button 
          onClick={togglePlay}
          className="p-1 hover:text-love-300 text-slate-300 transition-colors"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {playlist.length > 1 && (
          <button 
            onClick={handleNextTrack}
            className="p-1 hover:text-love-300 text-slate-300 transition-colors"
            title="Next Track"
          >
            <SkipForward size={14} />
          </button>
        )}

        <button 
          onClick={toggleMute}
          className="p-1 hover:text-love-300 text-slate-300 transition-colors"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}
