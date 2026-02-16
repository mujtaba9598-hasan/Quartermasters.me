/**
 * Premium hover effects utility classes.
 * These can be applied to interactive elements for enhanced user experience.
 */

// Card lift effect with shadow
export const cardLiftEffect = `
  transition-all duration-300 ease-out
  hover:-translate-y-1
  hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
  active:translate-y-0
  active:shadow-[0_4px_15px_rgba(0,0,0,0.2)]
`;

// Text shimmer effect (requires custom keyframes in tailwind.config.ts)
export const textShimmerEffect = `
  bg-gradient-to-r from-white via-white/80 to-white
  bg-[length:200%_100%]
  bg-clip-text text-transparent
  animate-shimmer
`;

// Glass card with hover glow
export const glassCardHoverEffect = `
  backdrop-blur-xl
  bg-white/5
  border border-white/10
  transition-all duration-300
  hover:bg-white/10
  hover:border-white/20
  hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]
`;

// Button with scale and glow
export const buttonHoverEffect = `
  transition-all duration-200
  hover:scale-105
  hover:shadow-[0_0_20px_currentColor]
  active:scale-95
`;

// Icon rotate on hover
export const iconRotateEffect = `
  transition-transform duration-300
  hover:rotate-12
`;

// Magnetic cursor effect (requires JS - see MagneticButton component)
export const magneticEffect = 'cursor-pointer';

// Stagger children animation (use with Framer Motion)
export const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
