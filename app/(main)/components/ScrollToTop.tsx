'use client';

import { useState, useEffect } from 'react';

export default function CircularScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // SVG parameters for the ring radius
  const radius = 24;
  const circumference = 2 * Math.PI * radius; // ~150.8
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollProgress(progress);
          setIsVisible(scrollTop > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full
        bg-white/80 dark:bg-slate-900/80 text-orange-500 dark:text-white backdrop-blur-md shadow-xl 
        transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-orange-500/30
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
      `}
      aria-label="Scroll to top"
    >
      {/* Background track circle */}
      <svg className="absolute inset-0 -rotate-90 h-14 w-14">
        <circle
          cx="28"
          cy="28"
          r={radius}
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Animated Active Ring */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          className="stroke-[#173b29] dark:stroke-[#173b29] transition-all duration-100 ease-out"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Up Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="h-5 w-5 z-10 transition-transform duration-300 group-hover:-translate-y-1"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
      </svg>
    </button>
  );
}