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
  const [useFallback, setUseFallback] = useState(false);
  const [frameCount, setFrameCount] = useState(maxFrameCount);

  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, frameCount - 1]
  );

  useEffect(() => {
    // 1. Device Detection: Cap at 60 frames for mobile to load 3x faster
    const isMobile = window.innerWidth < 768;
    const targetFrames = isMobile ? Math.min(60, maxFrameCount) : maxFrameCount;
    setFrameCount(targetFrames);

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let fallbackTriggered = false;

    // 2. Fallback Mechanism: 5-second hard timeout
    const fallbackTimer = setTimeout(() => {
      if (loadedCount < targetFrames * 0.2) { 
        setUseFallback(true);
        setIsLoading(false);
        fallbackTriggered = true;
      } else {
        setIsLoading(false); // Let it finish softly in the background
      }
    }, 5000);

    const loadImage = (index: number) => {
      if (fallbackTriggered) return;
      
      const img = new Image();
      const frameNumber = index + startIndex;
      const paddedIndex = frameNumber.toString().padStart(padding, '0');
      
      // Images are naturally WebP compressed from Supabase
      img.src = urlPattern.replace("{index}", paddedIndex);
      img.onload = () => {
        if (fallbackTriggered) return;
        loadedCount++;
        if (loadedCount === targetFrames) {
          clearTimeout(fallbackTimer);
          setIsLoading(false);
        }
      };
      loadedImages[index] = img;
    };

    for (let i = 0; i < targetFrames; i++) {
      loadImage(i);
    }
    setImages(loadedImages);

    return () => clearTimeout(fallbackTimer);
  }, [urlPattern, maxFrameCount, startIndex, padding]);

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
    
    // Auto-render when the first frame loads safely
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

  // Use the very first frame as the fallback image
  const fallbackImageUrl = urlPattern.replace("{index}", startIndex.toString().padStart(padding, '0'));

  return (
    <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black">
      {useFallback ? (
        <img 
          src={fallbackImageUrl} 
          alt="Cinematic Portfolio Background" 
          className="w-full h-full object-cover" 
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-md">
           <div className="flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full animate-spin shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
              <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase opacity-70">Initializing Cinematic Core</p>
           </div>
        </div>
      )}
    </div>
  );
}
