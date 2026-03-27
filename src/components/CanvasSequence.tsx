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

    // Load initial essential batch
    for (let i = 0; i < unlockThreshold; i++) {
      loadImage(i);
    }

    // Lazy load the remaining frames asynchronously in staggered micro-batches to prevent main-thread locking
    if (targetFrames > unlockThreshold) {
       let currentIndex = unlockThreshold;
       
       const loadNextBatch = () => {
          if (currentIndex >= targetFrames) return;
          
          const end = Math.min(currentIndex + 5, targetFrames);
          for (let i = currentIndex; i < end; i++) {
            loadImage(i);
          }
          currentIndex = end;
          setTimeout(loadNextBatch, 50); // 50ms delay between 5-frame chunks to let DOM paint smoothly
       };

       setTimeout(loadNextBatch, 500); 
    }
    
    setImages(loadedImages);
    return () => clearTimeout(safetyTimeout);
  }, [urlPattern, maxFrameCount, startIndex, padding]);

  // Render Engine
  useEffect(() => {
    if (useFallback) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      if (images.length === 0) return;
      const currentFrame = Math.floor(frameIndex.get());
      const safeIndex = Math.min(Math.max(currentFrame, 0), frameCount - 1);
      
      const img = images[safeIndex];

      // Extremely safe fallback: if frame isn't loaded due to lazy-loading, it just natively skips the clearRect 
      // and holds the previous perfect frame, guaranteeing zero black screen flashes.
      if (img && img.complete) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;

        if (imgWidth === 0 || imgHeight === 0) return;

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

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const unsubscribe = frameIndex.on("change", () => {
      requestAnimationFrame(render);
    });
    
    const initialRenderTimer = setInterval(() => {
      if (images[0] && images[0].complete) {
        render();
        clearInterval(initialRenderTimer);
      }
    }, 100);

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      render();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
      clearInterval(initialRenderTimer);
    };
  }, [images, frameIndex, frameCount, useFallback]);

  return (
    <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
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
