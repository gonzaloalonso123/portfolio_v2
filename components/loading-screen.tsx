"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing quantum drive");
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    // Set mounted state and get actual window dimensions
    setIsMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const texts = [
      "Initializing quantum drive",
      "Calibrating stellar navigation",
      "Loading cosmic assets",
      "Establishing neural interface",
      "Preparing holographic display",
    ];

    let interval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    // Progress bar animation
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Text changing animation
    let textIndex = 0;
    textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  // Generate stars with random positions
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // Use percentage instead of absolute pixels
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    opacity: Math.random() * 0.5,
    duration: Math.random() * 10 + 10,
    size: Math.random() * 4 + 1,
  }));

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-full h-full absolute">
        <div className="absolute inset-0 overflow-hidden">
          {isMounted &&
            stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-blue-500 rounded-full opacity-30"
                initial={{
                  x: `${star.x}%`,
                  y: `${star.y}%`,
                  scale: 0,
                }}
                animate={{
                  scale: star.scale,
                  opacity: star.opacity,
                }}
                transition={{
                  duration: star.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-12"
      >
        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Gonzalo Alonso
        </div>
      </motion.div>

      <div className="relative z-10 w-64 md:w-96">
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="mt-4 text-blue-400 text-center text-sm">
          {loadingText}
          <span className="inline-block animate-pulse">...</span>
        </div>
      </div>
    </div>
  );
}
