'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Users, FlaskConical, Calendar, Briefcase } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

const gridItems = [
  {
    title: "Financial Advisory",
    description: "The Vault. Structured Finance & Capital.",
    icon: BarChart3,
    href: "/financial-advisory",
    color: "var(--color-accent-financial)", // Ion Gold
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Human Capital",
    description: "The Network. Talent & Organization.",
    icon: Users,
    href: "/human-capital",
    color: "var(--color-accent-hr)", // Warm Mahogany
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Tech R&D",
    description: "The Lab. Digital & Future Systems.",
    icon: FlaskConical,
    href: "/tech-rnd",
    color: "var(--color-accent-tech)", // Electric Cyan
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Events & Logistics",
    description: "The Radar. Precision Operations.",
    icon: Calendar,
    href: "/event-logistics",
    color: "var(--color-accent-events)", // Neon Lime
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Management",
    description: "The Bridge. Strategy & Governance.",
    icon: Briefcase,
    href: "/management",
    color: "var(--color-accent-mgmt)", // Platinum
    span: "col-span-1 md:col-span-3 lg:col-span-3",
  },
];

export function BentoGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="heading-2 mb-2">Service Matrix.</h2>
            <p className="text-[var(--color-text-muted)]">Select a vertical to initiate.</p>
          </div>
          <MagneticButton>
            <Link href="/knowledge-base" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm backdrop-blur-md transition-colors hover:bg-white/10">
              View Knowledge Base <ArrowUpRight size={16} />
            </Link>
          </MagneticButton>
        </div>

        <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {gridItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-deep-harbor-800/50 p-8 backdrop-blur-xl transition-all hover:border-white/20 ${item.span}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-colors group-hover:bg-white/10"
                    style={{ color: item.color }}
                  >
                    <item.icon size={24} />
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="heading-3 mb-2 group-hover:text-white" style={{ transition: 'color 0.3s' }}>{item.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{item.description}</p>
                </div>
              </div>

              <Link href={item.href} className="absolute inset-0 z-20" aria-label={`View ${item.title}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
