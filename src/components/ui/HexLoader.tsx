'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Hexagonal 'Q' Sequence Loader for Quartermasters.
 * Premium loading animation featuring the brand's hexagonal geometry.
 */
export function HexLoader({ isLoading = true }: { isLoading?: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-deep-harbor-900"
    >
      <div className="relative">
        {/* Hexagonal container */}
        <svg
          width="120"
          height="104"
          viewBox="0 0 120 104"
          className="relative"
        >
          {/* Outer hexagon */}
          <motion.path
            d="M60 0 L110 26 L110 78 L60 104 L10 78 L10 26 Z"
            fill="none"
            stroke="var(--sector-financial)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Inner hexagon (pulsing) */}
          <motion.path
            d="M60 15 L95 33 L95 71 L60 89 L25 71 L25 33 Z"
            fill="none"
            stroke="var(--sector-financial)"
            strokeWidth="1.5"
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '60px 52px' }}
          />

          {/* 'Q' Letter */}
          <text
            x="60"
            y="62"
            textAnchor="middle"
            className="font-heading text-4xl font-bold"
            fill="var(--sector-financial)"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Q
          </text>
        </svg>

        {/* Progress bar */}
        <div className="mt-8 w-[120px] overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-1 bg-gradient-to-r from-[var(--sector-financial)] to-[var(--sector-tech)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-center text-xs uppercase tracking-widest text-white/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing
        </motion.p>
      </div>
    </motion.div>
  );
}

/**
 * Simplified loader for internal use
 */
export function Spinner({ size = 24, color = "var(--sector-financial)" }: { size?: number; color?: string }) {
  return (
    <motion.div
      className="inline-block"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
          opacity="0.25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="15.7 47.1"
        />
      </svg>
    </motion.div>
  );
}
