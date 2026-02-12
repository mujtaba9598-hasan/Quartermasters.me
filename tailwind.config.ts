
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Deep Harbor Theme
                "deep-harbor": {
                    900: "#0f172a",
                    800: "#1e293b",
                    700: "#334155",
                },
                // Sector Accents
                "accent-financial": "#d4a017", // Ion Gold
                "accent-hr": "#7f1d1d", // Warm Mahogany
                "accent-tech": "#06b6d4", // Electric Cyan
                "accent-events": "#a3e635", // Neon Lime
                "accent-mgmt": "#64748b", // Platinum

                "text-muted": "#94a3b8",
                "glass-border": "rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                heading: ["var(--font-space-grotesk)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                marquee: "marquee 25s linear infinite",
                marquee2: "marquee2 25s linear infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                shimmer: "shimmer 3s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                marquee2: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "200% center" },
                    "100%": { backgroundPosition: "-200% center" },
                },
            },
            screens: {
                'xs': '475px',
            }
        },
    },
    plugins: [],
};
export default config;
