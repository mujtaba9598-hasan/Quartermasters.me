"use client";

import { useState, useEffect } from "react";
import { SmoothScroll } from "@/components/features/SmoothScroll";
import { HexLoader } from "@/components/ui/HexLoader";

interface HomePageClientProps {
  children: React.ReactNode;
}

/**
 * Client shell for the homepage.
 * Handles the HexLoader intro animation and SmoothScroll wrapper.
 * Children are passed in from the Server Component page.tsx so they
 * still benefit from server-side rendering — React serialises them
 * as HTML on the server even though this wrapper is a client component.
 */
export function HomePageClient({ children }: HomePageClientProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HexLoader isLoading={loading} />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </>
  );
}
