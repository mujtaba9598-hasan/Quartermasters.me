"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, scrollViewport } from "@/lib/animations";

export function CTABanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="glass relative overflow-hidden rounded-2xl p-12 text-center md:p-16"
          style={{
            borderColor: "var(--color-accent-gold)",
            borderWidth: 1,
            borderStyle: "solid",
          }}
        >
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(193, 90, 44, 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="relative">
            <p
              className="text-overline mb-4"
              style={{ color: "var(--color-accent-gold)" }}
            >
              Get Started
            </p>
            <h2 className="heading-2 mb-4">
              Ready to Elevate Your Operations?
            </h2>
            <p
              className="mx-auto mb-8 max-w-lg text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Schedule a confidential consultation with our advisory team.
              We respond within 24 business hours.
            </p>
            <Link
              href="/contact"
              className="btn-glow-line inline-flex items-center gap-2 rounded-lg px-10 py-4 text-sm font-semibold"
              style={{
                fontFamily: "var(--font-heading)",
                background: "var(--color-accent-gold)",
                color: "var(--color-primary-bg)",
                letterSpacing: "0.02em",
              }}
            >
              Request Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
