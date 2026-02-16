"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { TextShimmer } from "@/components/ui/TextShimmer";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Geometric Mesh Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0.04 }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hex-mesh"
              width="56"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(2)"
            >
              <path
                d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="0.5"
              />
              <path
                d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
                fill="none"
                stroke="#f8fafc"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-mesh)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl text-center"
        >
          {/* Overline */}
          <motion.p variants={staggerItem} className="text-overline mb-6 mx-auto">
            UAE BASED Licensed Consultancy
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="mb-8 flex flex-col items-center justify-center"
          >
            {/* 1. Hero Word - Dominant & Centered */}
            <span className="heading-display mb-4 block text-6xl md:text-8xl lg:text-9xl">
              <TextShimmer className="heading-display">Quartermasters</TextShimmer>
            </span>

            {/* 2. Subtitle - Smaller & Centered */}
            <span
              className="block max-w-3xl mx-auto text-xl md:text-2xl lg:text-3xl font-light tracking-wide leading-tight"
            >
              Strategic Orchestration for{" "}
              <span style={{ color: "var(--color-accent-gold)" }}>Capital</span> and{" "}
              <span style={{ color: "var(--sector-hr-teal)" }}>Talent</span>.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={staggerItem}
            className="mb-10 mx-auto max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            Integrated consultancy delivering advisory across Banking
            Services, Human Resources, Management Consultancies,
            Organization & Event Management, and Technology Education R&D.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerItem} className="flex flex-wrap items-center justify-center gap-4">
            <a href="#services">
              <span
                className="btn-glow-line inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "var(--color-accent-gold)",
                  color: "var(--color-primary-bg)",
                  letterSpacing: "0.02em",
                  "--active-glow": "rgba(193, 90, 44, 0.5)"
                } as React.CSSProperties}
              >
                Explore Capabilities
              </span>
            </a>
            <a href="#methodology">
              <span
                className="btn-glow-line inline-block rounded-lg px-8 py-3.5 text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  background: "transparent",
                  color: "var(--color-text-base)",
                  border: "1px solid var(--glass-border)",
                  "--active-glow": "rgba(255, 255, 255, 0.2)"
                } as React.CSSProperties}
              >
                Our Methodology
              </span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={staggerItem}
            className="mt-16 flex flex-wrap items-center justify-center gap-6"
            style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "1.5rem" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
              />
              <span className="text-xs" style={{ color: "var(--color-text-dim)", fontFamily: "var(--font-heading)" }}>
                5 Licensed Activities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-10 w-6 rounded-full"
          style={{ border: "1.5px solid var(--glass-border)" }}
        >
          <div
            className="mx-auto mt-2 h-2 w-1 rounded-full"
            style={{ background: "var(--color-accent-gold)" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
