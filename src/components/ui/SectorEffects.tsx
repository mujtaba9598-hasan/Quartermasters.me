"use client";

import { motion } from "framer-motion";

/**
 * Financial Advisory — "Lock-In" effect.
 * Border solidifies and glows gold on hover.
 */
export function VaultEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-financial)",
        boxShadow: "0 0 30px rgba(212, 160, 23, 0.25), inset 0 0 20px rgba(212, 160, 23, 0.05)",
      }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Human Capital — "Breathing" pulse effect.
 * Soft glow that pulses like a heartbeat.
 */
export function BreathingEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-2xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: "1rem",
      }}
      whileHover={{
        borderColor: "var(--sector-hr-teal)",
        boxShadow: [
          "0 0 15px rgba(20, 184, 166, 0.15)",
          "0 0 30px rgba(20, 184, 166, 0.25)",
          "0 0 15px rgba(20, 184, 166, 0.15)",
        ].join(", "),
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tech R&D — "Glitch" effect.
 * Rapid border flicker with cyan glow.
 */
export function GlitchEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-tech)",
        boxShadow: "0 0 25px rgba(6, 182, 212, 0.3)",
        x: [0, -1, 1, -1, 0],
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Event Logistics — "Ripple" sonar effect.
 * Expanding ring from center on hover.
 */
export function RippleEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass relative overflow-hidden rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        borderColor: "var(--sector-events-lime)",
        boxShadow: "0 0 25px rgba(132, 204, 22, 0.2)",
      }}
      transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      {/* Ripple ring (appears on hover via CSS) */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            border: "1px solid var(--sector-events-lime)",
            width: 40,
            height: 40,
          }}
          animate={{
            width: [40, 200],
            height: [40, 200],
            opacity: [0.4, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/**
 * Management — "Panoramic Zoom" effect.
 * Slight scale-down revealing broader perspective.
 */
export function PanoramicEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="glass rounded-xl p-6"
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      whileHover={{
        scale: 0.97,
        borderColor: "var(--sector-mgmt)",
        boxShadow: "0 0 40px rgba(226, 232, 240, 0.1)",
      }}
      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
