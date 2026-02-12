import { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { RippleEffect } from "@/components/ui/SectorEffects";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { RadarPattern } from "@/components/ui/HexagonalPattern";

const capabilities = [
  {
    title: "Event Strategy & Planning",
    description:
      "Comprehensive event architecture from concept to execution — corporate conferences, exhibitions, government functions, and high-profile gatherings.",
  },
  {
    title: "Logistics Coordination",
    description:
      "End-to-end logistics management including vendor orchestration, supply chain coordination, and real-time operational tracking.",
  },
  {
    title: "Venue Management",
    description:
      "Site selection, venue assessment, capacity planning, and on-ground operational management for events of any scale.",
  },
  {
    title: "Production & Technical Operations",
    description:
      "Audio-visual production, staging design, technical infrastructure deployment, and show management.",
  },
  {
    title: "Stakeholder & Protocol Management",
    description:
      "VIP handling, government protocol compliance, guest management systems, and diplomatic coordination.",
  },
  {
    title: "Post-Event Analytics",
    description:
      "Event performance measurement, attendee analytics, ROI assessment, and operational improvement reporting.",
  },
];

export const metadata: Metadata = {
  title: "Organization & Event Management | Quartermasters F.Z.C",
  description: "High-Stakes Logistics, Coordination & Operational Deployment. From venue logistics to stakeholder management.",
  openGraph: {
    title: "Organization & Event Management | Quartermasters F.Z.C",
    description: "High-Stakes Logistics, Coordination & Operational Deployment. From venue logistics to stakeholder management.",
    url: 'https://quartermasters.me/event-logistics',
  }
};

export default function EventLogisticsPage() {
  return (
    <>
      <ServiceJsonLd service={{
        name: "Organization and Event Management",
        description: "High-Stakes Logistics, Coordination & Operational Deployment.",
        url: "https://quartermasters.me/event-logistics",
        image: "https://quartermasters.me/og-image.jpg"
      }} />
      <ServicePageLayout
        overline="Organization & Event Management"
        title="Organization and Event Management."
        subtitle="High-Stakes Logistics, Coordination & Operational Deployment."
        description="When precision and timing define success, our operational framework ensures every element — from venue logistics to stakeholder management — is executed with military-grade coordination."
        accent="var(--sector-events-lime)"
        glow="rgba(132, 204, 22, 0.15)"
        icon={MapPin}
        metaphor="The Radar"
        capabilities={capabilities}
        CardWrapper={RippleEffect}
        backgroundPattern={<RadarPattern />}
        sectorKey="events"
      />
    </>
  );
}
