"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  scrollViewport,
} from "@/lib/animations";

const phases = [
  {
    step: "01",
    title: "Consultation",
    description: "Initial assessment and scope definition across all five verticals.",
    pill: "#Discovery",
  },
  {
    step: "02",
    title: "Strategy R&D",
    description: "Research-driven strategy formulation with compliance mapping.",
    pill: "#Analysis",
  },
  {
    step: "03",
    title: "Deployment",
    description: "Operational execution with real-time progress tracking.",
    pill: "#Execution",
  },
  {
    step: "04",
    title: "Audit",
    description: "Post-deployment review, regulatory verification, and optimization.",
    pill: "#Compliance_Checked",
  },
];

export function PhaseGate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="methodology" className="py-24" ref={containerRef}>
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
        >
          <motion.p variants={staggerItem} className="text-overline mb-4">
            Methodology
          </motion.p>
          <motion.h2 variants={staggerItem} className="heading-2 mb-16">
            The Phase-Gate Process.
          </motion.h2>

          {/* Progress Line */}
          <div className="relative mb-16 hidden md:block">
            {/* Track */}
            <div
              className="h-0.5 w-full rounded-full"
              style={{ background: "var(--glass-border)" }}
            />
            {/* Active fill */}
            <motion.div
              className="absolute top-0 left-0 h-0.5 rounded-full"
              style={{
                width: lineWidth,
                background: "var(--color-accent-gold)",
                boxShadow: "0 0 16px rgba(193, 90, 44, 0.4)",
              }}
            />

            {/* Step dots */}
            <div className="absolute top-0 left-0 flex w-full -translate-y-1/2 justify-between">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.step}
                  className="flex h-4 w-4 items-center justify-center rounded-full"
                  style={{
                    background: "var(--color-primary-bg)",
                    border: "2px solid var(--color-accent-gold)",
                    boxShadow: "0 0 12px rgba(193, 90, 44, 0.3)",
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    delay: i * 0.15 + 0.3,
                    duration: 0.36,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                />
              ))}
            </div>
          </div>

          {/* Phase Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 md:grid-cols-4"
          >
            {phases.map((phase) => (
              <motion.div
                key={phase.step}
                variants={staggerItem}
                className="glass glass-hover rounded-xl p-6"
              >
                <p
                  className="mb-3 text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-accent-gold)",
                  }}
                >
                  {phase.step}
                </p>
                <h3
                  className="heading-4 mb-2"
                  style={{ color: "var(--color-text-base)" }}
                >
                  {phase.title}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {phase.description}
                </p>
                <span
                  className="pill-tag text-xs"
                  style={{
                    borderColor: "var(--color-accent-gold)",
                    color: "var(--color-accent-gold)",
                  }}
                >
                  {phase.pill}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
