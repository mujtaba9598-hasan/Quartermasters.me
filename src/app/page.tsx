import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PhaseGate } from "@/components/home/PhaseGate";
import { GlobeSection } from "@/components/home/GlobeSection";
import { SearchBar } from "@/components/home/SearchBar";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";
import { FlowConnector } from "@/components/home/FlowConnector";
import { HomePageClient } from "@/components/home/HomePageClient";

/**
 * Page-level metadata — only works in Server Components.
 * This was previously impossible because page.tsx was "use client".
 */
export const metadata: Metadata = {
  title:
    "Quartermasters F.Z.C — Strategic Orchestration for Capital, Talent & Logistics",
  description:
    "Ajman Free Zone Licensed Consultancy delivering advisory across Banking Services, Human Resources, Management Consultancies, Organization & Event Management, and Technology Education R&D. License No: 37357. AFZA Regulated.",
  keywords: [
    "Quartermasters",
    "Quartermasters F.Z.C",
    "Ajman Free Zone",
    "AFZA",
    "Human Resources Consultancy UAE",
    "Banking Services Consultancy",
    "Organization and Event Management",
    "Technology Education R&D",
    "Management Consultancies UAE",
    "UAE business consultancy",
    "Quartermasters FZC License 37357",
    "Strategic Capital Orchestration",
    "Talent Deployment UAE",
    "Logistics Management Ajman",
    "Sovereign Nexus",
  ],
  authors: [{ name: "Quartermasters F.Z.C" }],
  openGraph: {
    title: "Quartermasters F.Z.C — Strategic Orchestration",
    description:
      "Strategic Orchestration for Capital, Talent, and Logistics. Licensed by Ajman Free Zone Authority. Five integrated service verticals.",
    type: "website",
    locale: "en_AE",
  },
};

/**
 * Homepage — Server Component.
 *
 * This page renders on the server. Google sees real HTML: headings,
 * paragraphs, links, and structured content.
 *
 * Interactive behaviour (Framer Motion animations, Lenis smooth scroll,
 * the HexLoader intro, Three.js globe) hydrates via "use client" islands
 * that each component already declares.
 *
 * The <HomePageClient> wrapper handles:
 *   - HexLoader intro animation (useState + useEffect)
 *   - SmoothScroll / Lenis (useEffect)
 *
 * Because React Server Components serialize children as HTML on the
 * server even when passed through a client component's {children} prop,
 * all the static text below is present in the initial HTML payload.
 */
export default function HomePage() {
  return (
    <HomePageClient>
      <Header />
      <main>
        {/*
          SEO-critical static content block.
          This <section> is invisible to sighted users (sr-only) but gives
          Google rich, crawlable text on the very first render — no JS needed.
        */}
        <section className="sr-only" aria-label="Quartermasters overview">
          <h1>
            Quartermasters F.Z.C — Strategic Orchestration for Capital, Talent
            and Logistics
          </h1>
          <p>
            Ajman Free Zone Licensed Consultancy. Integrated advisory across
            Banking Services Consultancy, Human Resources Consultancy,
            Management Consultancies, Organization and Event Management, and
            Technology Education R&D.
          </p>
          <h2>Our Five Licensed Service Arms</h2>
          <ul>
            <li>
              Banking Services Consultancy — Strategic advisory on banking
              operations, regulatory compliance, and capital management.
            </li>
            <li>
              Human Resources Consultancy — Talent acquisition, workforce
              deployment, and organizational development.
            </li>
            <li>
              Technology Education R&D — Digital transformation and
              computational strategy consulting.
            </li>
            <li>
              Organization and Event Management — High-stakes logistics, venue
              coordination, and operational deployment.
            </li>
            <li>
              Management Consultancies — Organizational design, governance
              frameworks, and executive decision-making support.
            </li>
          </ul>
          <h2>Methodology — The Phase-Gate Process</h2>
          <ol>
            <li>Consultation — Initial assessment and scope definition.</li>
            <li>
              Strategy R&D — Research-driven strategy with compliance mapping.
            </li>
            <li>Deployment — Operational execution with progress tracking.</li>
            <li>Audit — Post-deployment review and regulatory verification.</li>
          </ol>
          <p>
            AFZA Regulated. License No: 37357. Ajman Free Zone, C1 Building,
            Office SF2097. Subject to UAE Government Authority Approvals.
          </p>
        </section>

        {/* Visual sections — client islands that hydrate with animations */}
        <HeroSection />
        <FlowConnector />
        <GlobeSection />
        <FlowConnector />
        <Testimonials />
        <FlowConnector />
        <PhaseGate />
        <FlowConnector />
        <SearchBar />
        <CTABanner />
      </main>
      <Footer />
    </HomePageClient>
  );
}
