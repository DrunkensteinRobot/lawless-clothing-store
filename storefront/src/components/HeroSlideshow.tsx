'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
}

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Auto-advance every 6 seconds as per doc

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen min-h-[400px] sm:min-h-[500px] overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[currentIndex].imageUrl ? (
            <Image
              src={slides[currentIndex].imageUrl!}
              alt={slides[currentIndex].title}
              fill
              priority
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D]" />
          )}
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              <h2 className="font-heading text-6xl md:text-8xl text-white mb-4 leading-none tracking-wide">
                {slides[currentIndex].title}
              </h2>
              <p className="font-sans text-lg md:text-xl text-[#9CA3AF] mb-8 max-w-lg">
                {slides[currentIndex].subtitle}
              </p>
              {slides[currentIndex].ctaText && (
                <Link 
                  href={slides[currentIndex].ctaLink || '/'}
                  className="inline-block bg-[#C0392B] text-white font-accent font-bold px-8 py-4 uppercase tracking-widest hover:bg-[#E74C3C] hover:scale-[0.97] transition-all"
                >
                  {slides[currentIndex].ctaText}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}