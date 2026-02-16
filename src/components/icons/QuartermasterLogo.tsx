import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "mono" | "icon";
}

/**
 * The "Strategic Q" — 3 interlocking hexagons forming a stylized Q.
 * Represents convergence of Capital (Banking) + Talent (HR) + Logistics (Events).
 * Finish: Brushed Steel texture via SVG gradient.
 */
export function QuartermasterLogo({
  size = 48,
  className = "",
  variant = "full",
}: LogoProps) {
  const id = React.useId();

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Quartermasters Logo"
      >
        <defs>
          {/* Sage Grey-Green Gradient (from brand logo) */}
          <linearGradient
            id={`${id}-steel`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6B8A7E" />
            <stop offset="25%" stopColor="#8B9E94" />
            <stop offset="50%" stopColor="#A0B5AA" />
            <stop offset="75%" stopColor="#8B9E94" />
            <stop offset="100%" stopColor="#6B8A7E" />
          </linearGradient>

          {/* Burnt Copper Accent for the Q tail (from brand logo) */}
          <linearGradient
            id={`${id}-gold`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#C15A2C" />
            <stop offset="100%" stopColor="#A04820" />
          </linearGradient>

          {/* Brushed texture pattern */}
          <filter id={`${id}-texture`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9 0.05"
              numOctaves="4"
              result="noise"
            />
            <feComposite
              in="SourceGraphic"
              in2="noise"
              operator="in"
              result="masked"
            />
            <feBlend in="SourceGraphic" in2="masked" mode="overlay" />
          </filter>

          {/* Subtle glow */}
          <filter id={`${id}-glow`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Hexagon 1 — Capital (Banking) — Top Left */}
        <polygon
          points="38,12 58,12 68,29.3 58,46.6 38,46.6 28,29.3"
          fill="none"
          stroke={`url(#${id}-steel)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
          filter={`url(#${id}-texture)`}
        />

        {/* Hexagon 2 — Talent (HR) — Top Right */}
        <polygon
          points="62,12 82,12 92,29.3 82,46.6 62,46.6 52,29.3"
          fill="none"
          stroke={`url(#${id}-steel)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
          filter={`url(#${id}-texture)`}
        />

        {/* Hexagon 3 — Logistics (Events) — Bottom Center */}
        <polygon
          points="50,37 70,37 80,54.3 70,71.6 50,71.6 40,54.3"
          fill="none"
          stroke={`url(#${id}-steel)`}
          strokeWidth="2.5"
          strokeLinejoin="round"
          opacity="0.9"
          filter={`url(#${id}-texture)`}
        />

        {/* Interlocking fill regions (intersection areas) */}
        {/* Overlap 1-2 */}
        <polygon
          points="58,12 62,12 62,17 60,20.8 58,17"
          fill={`url(#${id}-steel)`}
          opacity="0.15"
        />
        {/* Overlap 1-3 */}
        <polygon
          points="50,37 52,37 55,42 50,42.5"
          fill={`url(#${id}-steel)`}
          opacity="0.15"
        />
        {/* Overlap 2-3 */}
        <polygon
          points="68,37 70,37 70,42 67,42"
          fill={`url(#${id}-steel)`}
          opacity="0.15"
        />

        {/* Central convergence point — filled with subtle glass */}
        <circle
          cx="60"
          cy="38"
          r="6"
          fill={`url(#${id}-steel)`}
          opacity="0.12"
        />

        {/* The "Q" Tail — the diagonal stroke that makes it a Q */}
        <line
          x1="68"
          y1="60"
          x2="88"
          y2="80"
          stroke={`url(#${id}-gold)`}
          strokeWidth="3.5"
          strokeLinecap="round"
          filter={`url(#${id}-glow)`}
        />

        {/* Small terminal accent on Q tail */}
        <circle
          cx="88"
          cy="80"
          r="2.5"
          fill={`url(#${id}-gold)`}
          filter={`url(#${id}-glow)`}
        />

        {/* Outer enclosing subtle hexagon (the full Q shape) */}
        <polygon
          points="60,5 90,22 90,58 60,75 30,58 30,22"
          fill="none"
          stroke={`url(#${id}-steel)`}
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.25"
        />
      </svg>

      {variant === "full" && (
        <div className="flex flex-col">
          <span
            className="text-lg font-semibold tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "#A0B5AA" }}
          >
            QUARTERMASTERS
          </span>
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: "var(--font-heading)", color: "#5E7A6E" }}
          >
            F.Z.C
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Favicon-ready version — simplified, no text.
 */
export function QuartermasterIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <QuartermasterLogo size={size} className={className} variant="icon" />;
}
