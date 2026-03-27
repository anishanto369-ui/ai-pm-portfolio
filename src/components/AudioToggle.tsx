"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioToggle({ isReady }: { isReady: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lazy Initialization blocks audio payload until Canvas Engine reaches 100%
  useEffect(() => {
    if (isReady && !audioRef.current) {
      const audio = new Audio('/bgm.ogg');
      audio.loop = true;
      audio.volume = 0; // Hard clamp 0 for lerp fade-in
      audioRef.current = audio;
    }
  }, [isReady]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    if (isPlaying) {
      // Linear Interpolation Fade Out (-5% vol every 50ms)
      setIsPlaying(false);
      let vol = audio.volume;
      const fadeInterval = setInterval(() => {
        if (vol > 0.05) {
          vol -= 0.05;
          audio.volume = vol;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 50); 
    } else {
      // Linear Interpolation Fade In (+5% vol every 100ms -> stable at 40%)
      setIsPlaying(true);
      
      // Async catch for rigid browser auto-play policies
      audio.play().catch(e => {
         console.warn("Audio play blocked natively by browser protocol:", e);
         setIsPlaying(false);
      });
      
      let vol = audio.volume;
      const fadeInterval = setInterval(() => {
        if (vol < 0.35) { 
          vol += 0.05;
          audio.volume = vol;
        } else {
          audio.volume = 0.4;
          clearInterval(fadeInterval);
        }
      }, 100); 
    }
  };

  if (!isReady) return null; 

  return (
    <button 
      onClick={toggleAudio}
      className="p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-full hover:bg-orange-500/20 hover:border-orange-500/30 hover:text-orange-400 text-white/80 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 group relative flex items-center justify-center shrink-0"
      aria-label="Toggle Background Cinematic Engine"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-orange-400 transition-colors" />
      ) : (
        <VolumeX className="w-4 h-4 md:w-5 md:h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      )}
      
      {/* Migha Aesthetic Mini Equalizer */}
      {isPlaying && (
         <div className="absolute -top-[2px] -right-[2px] flex items-end gap-[1.5px] h-3 w-3.5 overflow-hidden opacity-90 drop-shadow-[0_0_4px_rgba(249,115,22,0.8)] p-0.5 bg-black/50 rounded-full border border-orange-500/20">
            <div className="w-[1.5px] bg-orange-400 animate-[bounce_0.6s_infinite] origin-bottom rounded-t-sm" style={{ animationDelay: '0ms' }} />
            <div className="w-[1.5px] bg-orange-400 animate-[bounce_0.6s_infinite] origin-bottom rounded-t-sm" style={{ animationDelay: '200ms', height: '100%' }} />
            <div className="w-[1.5px] bg-orange-400 animate-[bounce_0.6s_infinite] origin-bottom rounded-t-sm" style={{ animationDelay: '400ms', height: '60%' }} />
         </div>
      )}
    </button>
  );
}
