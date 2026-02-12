"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { fadeInUp, scrollViewport } from "@/lib/animations";

const suggestions = [
  "How can you help with HR compliance?",
  "What banking advisory services do you offer?",
  "Tell me about event management capabilities",
  "What R&D consulting do you provide?",
];

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-overline mb-4">Intelligence</p>
          <h2 className="heading-2 mb-4">Ask the Quartermaster.</h2>
          <p
            className="mb-10 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Describe your challenge — we&apos;ll map it to the right capability.
          </p>

          {/* Search Input */}
          <div
            className="glass relative rounded-xl transition-all"
            style={{
              borderColor: focused
                ? "var(--color-accent-gold)"
                : "var(--glass-border)",
              borderWidth: 1,
              borderStyle: "solid",
              boxShadow: focused
                ? "0 0 30px rgba(193, 90, 44, 0.15)"
                : "none",
            }}
          >
            <div className="flex items-center gap-3 px-5 py-4">
              <Search
                size={20}
                style={{
                  color: focused
                    ? "var(--color-accent-gold)"
                    : "var(--color-text-dim)",
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="How can we help your organization?"
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-base)",
                }}
              />
              <button
                aria-label="Submit search"
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-all"
                style={{
                  background: query
                    ? "var(--color-accent-gold)"
                    : "transparent",
                  color: query
                    ? "var(--color-primary-bg)"
                    : "var(--color-text-dim)",
                }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="pill-tag transition-all"
                style={{ cursor: "pointer", fontSize: "0.75rem" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent-gold)";
                  e.currentTarget.style.color = "var(--color-accent-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.color = "var(--color-text-base)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
