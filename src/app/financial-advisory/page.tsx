import { Metadata } from "next";
import { Shield } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { VaultEffect } from "@/components/ui/SectorEffects";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { HexagonalPattern } from "@/components/ui/HexagonalPattern";

const capabilities = [
  {
    title: "Banking Services Consultancy",
    description:
      "Strategic advisory on banking operations, regulatory compliance, and financial framework development for institutional and corporate clients.",
  },
  {
    title: "Capital Strategy",
    description:
      "Comprehensive capital structuring, investment advisory, and financial planning aligned with UAE regulatory standards.",
  },
  {
    title: "Compliance & Audit Frameworks",
    description:
      "Design and implementation of compliance management systems, internal audit protocols, and regulatory reporting structures.",
  },
  {
    title: "Risk Assessment",
    description:
      "Quantitative and qualitative risk modeling, exposure analysis, and mitigation strategy development.",
  },
  {
    title: "Financial Operations Design",
    description:
      "Process architecture for treasury management, payment operations, and financial workflow optimization.",
  },
  {
    title: "Regulatory Navigation",
    description:
      "Expert guidance through UAE Central Bank regulations, AFZA requirements, and cross-jurisdictional financial compliance.",
  },
];

export const metadata: Metadata = {
  title: "Banking Services Consultancy | Quartermasters F.Z.C",
  description: "Strategic advisory on banking operations, regulatory compliance, and financial framework development for institutional and corporate clients.",
  openGraph: {
    title: "Banking Services Consultancy | Quartermasters F.Z.C",
    description: "Strategic advisory on banking operations, regulatory compliance, and financial framework development.",
    url: 'https://quartermasters.me/financial-advisory',
  }
};

export default function FinancialAdvisoryPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Banking Services Consultancy",
        description: "Strategic advisory on banking operations, regulatory compliance, and financial framework development for institutional and corporate clients.",
        url: "https://quartermasters.me/financial-advisory",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ServicePageLayout
        overline="Banking Services Consultancy"
        title="Banking Services Consultancy."
        subtitle="Strategic Advisory on Banking Operations & Capital Management."
        description="Delivering institutional-grade financial advisory under regulated authority. From compliance frameworks to capital structuring, we architect financial stability with the precision and security your organization demands."
        accent="var(--sector-financial)"
        glow="rgba(212, 160, 23, 0.15)"
        icon={Shield}
        metaphor="The Vault"
        capabilities={capabilities}
        disclaimer="Subject to UAE Government Authority Approvals. Banking consultancy services provided under AFZA License 37357."
        CardWrapper={VaultEffect}
        backgroundPattern={<HexagonalPattern />}
        sectorKey="financial"
      />
    </>
  );
}
