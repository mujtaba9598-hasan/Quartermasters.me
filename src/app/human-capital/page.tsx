import { Metadata } from "next";
import { Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { BreathingEffect } from "@/components/ui/SectorEffects";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { NetworkPattern } from "@/components/ui/HexagonalPattern";

const capabilities = [
  {
    title: "Strategic HR Consultancy",
    description:
      "End-to-end human resources advisory covering organizational design, workforce planning, and HR strategy alignment with business objectives.",
  },
  {
    title: "Talent Acquisition Architecture",
    description:
      "Design and deployment of recruitment frameworks, candidate assessment systems, and executive search methodologies.",
  },
  {
    title: "Workforce Development",
    description:
      "Training program design, leadership development, and skills gap analysis for organizational capability building.",
  },
  {
    title: "Compensation & Benefits Design",
    description:
      "Market-aligned compensation structuring, benefits program architecture, and total rewards strategy.",
  },
  {
    title: "HR Compliance & Policy",
    description:
      "UAE labor law compliance, employee handbook development, and workplace policy frameworks aligned with government regulations.",
  },
  {
    title: "Organizational Wellbeing",
    description:
      "Employee engagement strategy, retention program design, and workplace culture assessment and transformation.",
  },
];

export const metadata: Metadata = {
  title: "Human Resources Consultancy | Quartermasters F.Z.C",
  description: "End-to-end human resources advisory covering organizational design, workforce planning, and HR strategy alignment with business objectives.",
  openGraph: {
    title: "Human Resources Consultancy | Quartermasters F.Z.C",
    description: "End-to-end human resources advisory covering organizational design, workforce planning, and HR strategy.",
    url: 'https://quartermasters.me/human-capital',
  }
};

export default function HumanCapitalPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Human Resources Consultancy",
        description: "End-to-end human resources advisory covering organizational design, workforce planning, and HR strategy alignment with business objectives.",
        url: "https://quartermasters.me/human-capital",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ServicePageLayout
        overline="Human Resources Consultancy"
        title="Human Resources Consultancy."
        subtitle="Strategic HR Advisory & Organizational Development."
        description="People are your most critical asset. We architect talent strategies that attract, develop, and retain the workforce your organization needs — with full compliance to UAE regulatory frameworks."
        accent="var(--sector-hr-teal)"
        glow="rgba(20, 184, 166, 0.15)"
        icon={Users}
        metaphor="The Organic Network"
        capabilities={capabilities}
        disclaimer="Subject to UAE Government Authority Approvals. HR consultancy services provided under AFZA License 37357."
        CardWrapper={BreathingEffect}
        backgroundPattern={<NetworkPattern />}
        sectorKey="hr"
      />
    </>
  );
}
