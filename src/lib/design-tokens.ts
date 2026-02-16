/**
 * Quartermasters "Sovereign Nexus" — Design Token Constants
 * Mirrors CSS variables for use in JS/TS (Framer Motion, dynamic styling).
 */

export const colors = {
  deepHarbor: {
    start: "#0f1a17",
    mid: "#1a2e28",
    end: "#2d4a40",
    gradient: "linear-gradient(135deg, #0f1a17 0%, #1a2e28 50%, #2d4a40 100%)",
  },

  accent: {
    gold: "#C15A2C",       // Burnt Copper (from logo)
    goldMatte: "#D4683A",  // Light Copper
  },

  text: {
    base: "#f0f2f0",       // Warm White
    muted: "#8B9E94",      // Sage Grey-Green (from logo)
    dim: "#5E7A6E",        // Deep Sage
  },

  glass: {
    bg: "rgba(255, 255, 255, 0.05)",
    bgHover: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.18)",
  },

  sectors: {
    financial: {
      primary: "#D4A017",    // Ion Gold
      secondary: "#C0C0C0",  // Chrome
      glow: "rgba(212, 160, 23, 0.3)",
      label: "Banking Services Consultancy",
      metaphor: "The Vault",
    },
    hr: {
      primary: "#8B4513",    // Warm Mahogany
      secondary: "#14B8A6",  // Transformative Teal
      glow: "rgba(139, 69, 19, 0.3)",
      label: "Human Resources Consultancy",
      metaphor: "The Organic Network",
    },
    tech: {
      primary: "#06B6D4",    // Electric Cyan
      secondary: "#2DD4BF",  // Plasma Teal
      glow: "rgba(6, 182, 212, 0.3)",
      label: "Technology Education R&D",
      metaphor: "The Laboratory",
    },
    events: {
      primary: "#3B82F6",    // Signal Blue
      secondary: "#84CC16",  // Neon Lime
      glow: "rgba(132, 204, 22, 0.3)",
      label: "Organization & Event Management",
      metaphor: "The Radar",
    },
    management: {
      primary: "#E2E8F0",    // Platinum
      secondary: "#94A3B8",  // Slate
      glow: "rgba(226, 232, 240, 0.2)",
      label: "Management Consultancies",
      metaphor: "The Bridge",
    },
  },
} as const;

export const timing = {
  fast: 0.18,      // seconds
  base: 0.3,
  slow: 0.6,
  glacial: 1.2,
  easeOutExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export type SectorKey = keyof typeof colors.sectors;
