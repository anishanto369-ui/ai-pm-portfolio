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
  
  // Refined 'Buttery Smooth' Lerp Physics for Mobile Touch Interpolation
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
    // Dual-Track Payload Frame Logic
    const isMobileTrack = window.innerWidth < 1024;
    const targetFrames = isMobileTrack ? Math.min(80, maxFrameCount) : maxFrameCount;
    setFrameCount(targetFrames);

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let fallbackTriggered = false;

    // Safety timeout
    const safetyTimeout = setTimeout(() => {
       if (loadedCount < targetFrames * 0.5) {
          setUseFallback(true);
          setIsLoading(false);
          fallbackTriggered = true;
       } else {
          setIsLoading(false); 
       }
    }, 8000);

    const loadImage = (index: number) => {
      if (fallbackTriggered) return;
      const img = new Image();
      const frameNumber = index + startIndex;
      const paddedIndex = frameNumber.toString().padStart(padding, '0');
      img.src = urlPattern.replace("{index}", paddedIndex);
      
      img.onload = () => {
        if (fallbackTriggered) return;
        loadedCount++;
        
        const percent = Math.floor((loadedCount / targetFrames) * 100);
        setLoadProgress(percent);

        if (loadedCount === targetFrames) {
          clearTimeout(safetyTimeout);
          setIsLoading(false);
        }
      };
      
      loadedImages[index] = img;
    };

    for (let i = 0; i < targetFrames; i++) {
      loadImage(i);
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

  const fallbackImageUrl = urlPattern.replace("{index}", startIndex.toString().padStart(padding, '0'));

  return (
    <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {useFallback ? (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100"
          style={{ backgroundImage: `url(${fallbackImageUrl})` }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 backdrop-blur-xl">
           <div className="flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center w-24 h-24">
                 <div className="absolute inset-0 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin shadow-[0_0_40px_rgba(249,115,22,0.4)]" />
                 <span className="font-mono text-orange-500 font-bold text-sm drop-shadow-md">{loadProgress}%</span>
              </div>
              <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.4em] uppercase text-orange-500/80 drop-shadow-md text-center max-w-[200px] md:max-w-xs">
                 Loading Cinematic Engine
                 <span className="block mt-3 opacity-50 text-[8px] tracking-[0.2em]">Fetching {frameCount} optimized frames</span>
              </p>
           </div>
        </div>
      )}
    </div>
  );
}
