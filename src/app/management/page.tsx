import { Metadata } from "next";
import { Compass } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { PanoramicEffect } from "@/components/ui/SectorEffects";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { GridPattern } from "@/components/ui/HexagonalPattern";

const capabilities = [
  {
    title: "Management Consultancies",
    description:
      "Strategic management advisory covering organizational design, governance frameworks, and executive decision-making support.",
  },
  {
    title: "Business Strategy",
    description:
      "Market analysis, competitive positioning, and long-term strategic planning for sustainable organizational growth.",
  },
  {
    title: "Operational Excellence",
    description:
      "Process optimization, performance management systems, and operational efficiency audits across business functions.",
  },
  {
    title: "Governance & Compliance",
    description:
      "Board advisory, corporate governance frameworks, and regulatory compliance strategy for UAE-based entities.",
  },
  {
    title: "Change Management",
    description:
      "Organizational transformation programs, stakeholder alignment, and structured change implementation methodologies.",
  },
  {
    title: "Performance Advisory",
    description:
      "KPI framework design, executive dashboards, and data-driven performance monitoring for leadership teams.",
  },
];

export const metadata: Metadata = {
  title: "Management Consultancies | Quartermasters F.Z.C",
  description: "Strategic management advisory covering organizational design, governance frameworks, and executive decision-making support.",
  openGraph: {
    title: "Management Consultancies | Quartermasters F.Z.C",
    description: "Strategic management advisory covering organizational design, governance frameworks, and executive decision-making support.",
    url: 'https://quartermasters.me/management',
  }
};

export default function ManagementPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Management Consultancies",
        description: "Strategic management advisory covering organizational design, governance frameworks, and executive decision-making support.",
        url: "https://quartermasters.me/management",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ServicePageLayout
        overline="Management Consultancies"
        title="Management Consultancies."
        subtitle="Strategic Advisory for Organizational Leadership & Governance."
        description="Providing institutional-grade management consulting under regulated authority. From governance frameworks to operational transformation, we deliver the strategic clarity your organization needs to operate at scale."
        accent="var(--sector-management)"
        glow="rgba(226, 232, 240, 0.15)"
        icon={Compass}
        metaphor="The Bridge"
        capabilities={capabilities}
        disclaimer="Subject to UAE Government Authority Approvals. Management consultancy services provided under AFZA License 37357."
        CardWrapper={PanoramicEffect}
        backgroundPattern={<GridPattern />}
        sectorKey="management"
      />
    </>
  );
}
