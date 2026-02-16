"use client";

import { Cpu } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { GlitchEffect } from "@/components/ui/SectorEffects";
import { WireframePattern } from "@/components/ui/HexagonalPattern";

interface TechRndClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function TechRndClient({ capabilities }: TechRndClientProps) {
    return (
        <ServicePageLayout
            overline="Technology & R&D Services"
            title="Technology R&D."
            subtitle="Innovation Infrastructure & Technical Operations."
            description="From curriculum design for education technology to technical R&D for government innovation mandates, we architect the operational backbone for technology-driven enterprises."
            accent="var(--sector-tech)"
            glow="rgba(6, 182, 212, 0.15)"
            icon={Cpu}
            metaphor="The Lab"
            capabilities={capabilities}
            CardWrapper={GlitchEffect}
            backgroundPattern={<WireframePattern />}
            sectorKey="tech"
        />
    );
}
