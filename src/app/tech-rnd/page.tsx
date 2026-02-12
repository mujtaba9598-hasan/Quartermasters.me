import { Metadata } from "next";
import { Cpu } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

const capabilities = [
  {
    title: "Technology Education Consulting",
    description:
      "Curriculum design, training infrastructure development, and technology education program strategy for institutions and enterprises.",
  },
  {
    title: "Digital Transformation Advisory",
    description:
      "Assessment and roadmap development for organizational digital maturity, legacy system modernization, and cloud migration strategy.",
  },
  {
    title: "Research & Development Strategy",
    description:
      "R&D program architecture, innovation pipeline development, and technology scouting for competitive advantage.",
  },
  {
    title: "Data & Analytics Consulting",
    description:
      "Data governance frameworks, analytics capability building, and business intelligence infrastructure advisory.",
  },
  {
    title: "Emerging Technology Assessment",
    description:
      "Evaluation and integration strategy for AI, blockchain, IoT, and other emerging technologies relevant to your vertical.",
  },
  {
    title: "Technical Architecture Review",
    description:
      "System architecture audits, technology stack evaluation, and scalability planning for growing organizations.",
  },
];

export const metadata: Metadata = {
  title: "Technology Education & Research Consulting | Quartermasters F.Z.C",
  description: "Research, Development & Digital Strategy in Technology Education. Bridging the gap between cutting-edge research and implementation.",
  openGraph: {
    title: "Technology Education & Research Consulting | Quartermasters F.Z.C",
    description: "Research, Development & Digital Strategy in Technology Education.",
    url: 'https://quartermasters.me/tech-rnd',
  }
};

export default function TechRndPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Technology Education and Research Consulting",
        description: "Research, Development & Digital Strategy in Technology Education.",
        url: "https://quartermasters.me/tech-rnd",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ServicePageLayout
        overline="Technology Education R&D"
        title="Consulting & R&D in Technology Education."
        subtitle="Research, Development & Digital Strategy in Technology Education."
        description="From technology education frameworks to enterprise digital transformation — we bridge the gap between cutting-edge research and practical business implementation."
        accent="var(--sector-tech)"
        glow="rgba(6, 182, 212, 0.15)"
        icon={Cpu}
        metaphor="The Laboratory"
        capabilities={capabilities}
        CardWrapper={GlitchEffect}
        backgroundPattern={<WireframePattern />}
        sectorKey="tech"
      />
    </>
  );
}
