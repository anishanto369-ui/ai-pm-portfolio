"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface CanvasSequenceProps {
  urlPattern: string;
  frameCount: number;
  startIndex?: number;
  padding?: number;
}

export default function CanvasSequence({
  urlPattern,
  frameCount: maxFrameCount,
  startIndex = 0,
  padding = 3,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(maxFrameCount);
  const [useFallback, setUseFallback] = useState(false);

  const { scrollYProgress } = useScroll();
  
  // Refined 'Buttery Smooth' Lerp Physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
    restDelta: 0.0001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, frameCount > 0 ? frameCount - 1 : 0]
  );

  useEffect(() => {
    // 1. Array Constraints
    const isMobileTrack = window.innerWidth < 1024;
    const targetFrames = isMobileTrack ? Math.min(80, maxFrameCount) : maxFrameCount;
    setFrameCount(targetFrames);

    // 2. Lazy-Loading Threshold (Unblock desktop UI at 40 frames)
    const unlockThreshold = isMobileTrack ? targetFrames : Math.min(40, targetFrames);

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    // Safety Force-Unlock
    const safetyTimeout = setTimeout(() => {
       setIsLoading(false);
    }, 8000);

    const loadImage = (index: number) => {
      const img = new Image();
      const frameNumber = index + startIndex;
      const paddedIndex = frameNumber.toString().padStart(padding, '0');
      img.src = urlPattern.replace("{index}", paddedIndex);
      
      img.onload = () => {
        loadedCount++;
        
        // Progress UI only tracks up to the unblock threshold
        if (loadedCount <= unlockThreshold) {
           const percent = Math.floor((loadedCount / unlockThreshold) * 100);
           setLoadProgress(percent);
        }

        // Fast-Unlock the UI instantly
        if (loadedCount === unlockThreshold) {
          clearTimeout(safetyTimeout);
          setIsLoading(false);
        }
      };
      
      loadedImages[index] = img;
    };

    // Load initial essential batch synchronously for immediate paint
    for (let i = 0; i < unlockThreshold; i++) {
      loadImage(i);
    }

    // Ultra-lightweight background queuing for M1 optimization (fixes thread locking)
    if (targetFrames > unlockThreshold) {
       let currentIndex = unlockThreshold;
       
       const loadNextBatch = () => {
          if (currentIndex >= targetFrames) return;
          
          // Requesting only 2 images at a time (vs 5) prevents M1 memory pooling
          const end = Math.min(currentIndex + 2, targetFrames);
          for (let i = currentIndex; i < end; i++) {
            loadImage(i);
          }
          currentIndex = end;
          // 150ms buffer strictly respects main thread 60fps painting overhead
          setTimeout(loadNextBatch, 150); 
       };

       setTimeout(loadNextBatch, 500); 
    }
    
    setImages(loadedImages);
    return () => clearTimeout(safetyTimeout);
  }, [urlPattern, maxFrameCount, startIndex, padding]);

  // Pure rAF Polling Render Engine (replaces .on("change") for extreme M1 performance)
  useEffect(() => {
    if (useFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Drop alpha channel for perf
    if (!ctx) return;

    let animationFrameId: number;
    let lastRenderedFrame = -1;

    const renderTick = () => {
      if (images.length > 0) {
        const currentFrame = Math.floor(frameIndex.get());
        const safeIndex = Math.min(Math.max(currentFrame, 0), frameCount - 1);
        
        // Only trigger an expensive GPU draw if the frame actually changed
        if (safeIndex !== lastRenderedFrame) {
          const img = images[safeIndex];

          // Guarantee we don't flash to a blank canvas if lazy-load hasn't cached this yet
          if (img && img.complete) {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            if (imgWidth > 0 && imgHeight > 0) {
              const canvasAspect = canvasWidth / canvasHeight;
              const imgAspect = imgWidth / imgHeight;
              
              let drawWidth, drawHeight, offsetX, offsetY;

              if (canvasAspect > imgAspect) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgAspect;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
              } else {
                drawWidth = canvasHeight * imgAspect;
                drawHeight = canvasHeight;
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = 0;
              }

              ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
              lastRenderedFrame = safeIndex;
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderTick);
    };

    // Kickoff pure rendering loop
    renderTick();

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      lastRenderedFrame = -1; // Force a repaint on resize
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, frameIndex, frameCount, useFallback]);

  return (
    <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <canvas
        ref={canvasRef}
        // scale-[1.05] & translate-y-[2%] push the bottom-right watermark decisively off-screen
        className="w-full h-full object-cover transform scale-[1.05] translate-y-[2%] origin-center"
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 backdrop-blur-xl">
           <div className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center w-24 h-24">
                 <div className="absolute inset-0 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin shadow-[0_0_40px_rgba(249,115,22,0.4)]" />
                 <span className="font-mono text-orange-500 font-bold text-sm drop-shadow-md">{loadProgress}%</span>
              </div>
              <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.4em] uppercase text-orange-500/80 drop-shadow-md text-center max-w-[200px] md:max-w-xs">
                 Loading Cinematic Engine
                 <span className="block mt-3 opacity-50 text-[8px] tracking-[0.2em] animate-pulse">Establishing Render Buffer...</span>
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
