"use client";

import { MapPin } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { RippleEffect } from "@/components/ui/SectorEffects";
import { RadarPattern } from "@/components/ui/HexagonalPattern";

interface EventLogisticsClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function EventLogisticsClient({ capabilities }: EventLogisticsClientProps) {
    return (
        <ServicePageLayout
            overline="Organization & Event Management"
            title="Organization and Event Management."
            subtitle="High-Stakes Logistics, Coordination & Operational Deployment."
            description="When precision and timing define success, our operational framework ensures every element from venue logistics to stakeholder management is executed with military-grade coordination."
            accent="var(--sector-events-lime)"
            glow="rgba(132, 204, 22, 0.15)"
            icon={MapPin}
            metaphor="The Radar"
            capabilities={capabilities}
            CardWrapper={RippleEffect}
            backgroundPattern={<RadarPattern />}
            sectorKey="events"
        />
    );
}
