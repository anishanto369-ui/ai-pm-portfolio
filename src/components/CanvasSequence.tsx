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
  frameCount,
  startIndex = 0,
  padding = 3,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  
  // Smooth scroll progress for cinematic feel
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
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const loadImage = (index: number) => {
      const img = new Image();
      const frameNumber = index + startIndex;
      const paddedIndex = frameNumber.toString().padStart(padding, '0');
      
      img.src = urlPattern.replace("{index}", paddedIndex);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoading(false);
        }
      };
      loadedImages[index] = img;
    };

    for (let i = 0; i < frameCount; i++) {
      loadImage(i);
    }
    setImages(loadedImages);
  }, [urlPattern, frameCount, startIndex, padding]);

  useEffect(() => {
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
    
    render();

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
    };
  }, [images, frameIndex, frameCount]);

  return (
    <div className="fixed inset-0 z-0 w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
           <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              <p className="text-sm font-medium tracking-widest uppercase opacity-50">Initializing Cinematic AI Experience</p>
           </div>
        </div>
      )}
    </div>
  );
}
