'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const menuItems = [
    { label: 'Banking', href: '/financial-advisory', color: 'var(--color-accent-financial)' },
    { label: 'Human Capital', href: '/human-capital', color: 'var(--color-accent-hr)' },
    { label: 'Tech R&D', href: '/tech-rnd', color: 'var(--color-accent-tech)' },
    { label: 'Events', href: '/event-logistics', color: 'var(--color-accent-events)' },
    { label: 'Management', href: '/management', color: 'var(--color-accent-mgmt)' },
];

export function HexHiveNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <AnimatePresence>
                {isOpen && (
                    <div className="absolute bottom-16 right-0 flex flex-col items-end gap-2">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-l-full bg-deep-harbor-800/90 py-2 pl-4 pr-2 backdrop-blur-md transition-colors hover:bg-deep-harbor-700"
                                    style={{ borderRight: `4px solid ${item.color}` }}
                                >
                                    <span className="text-sm font-medium uppercase tracking-wider text-white">
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-deep-harbor-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all hover:scale-110 active:scale-95"
                style={{ border: '1px solid var(--glass-border)' }}
            >
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <div className={`relative flex flex-col gap-[5px] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
                    <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
                </div>
            </button>
        </div>
    );
}
