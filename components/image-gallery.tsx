"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (images.length <= 1) {
    return (
      <div className="relative h-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 animate-pulse"></div>
        <img src={images[0] || "/placeholder.svg"} alt={alt} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      className="relative h-60 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 animate-pulse"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`${alt} - image ${currentIndex + 1} of ${images.length}`}
            className="w-full h-full"
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {(isHovering || images.length > 1) && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 backdrop-blur-sm border border-blue-500/30 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ duration: 0.2 }}
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2 backdrop-blur-sm border border-blue-500/30 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-400 w-4" : "bg-gray-400/50 hover:bg-gray-300/70"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white border border-blue-500/30 z-10">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
