"use client";

import { Briefcase } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { PanoramicEffect } from "@/components/ui/SectorEffects";
import { GridPattern } from "@/components/ui/HexagonalPattern";

interface ManagementClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function ManagementClient({ capabilities }: ManagementClientProps) {
    return (
        <ServicePageLayout
            overline="Strategic Management Consultancy"
            title="Management Consultancy."
            subtitle="Strategic Operations & Organizational Infrastructure."
            description="We architect strategic frameworks and operational systems for organizations navigating complex regulatory, financial, and operational landscapes across the GCC."
            accent="var(--sector-mgmt)"
            glow="rgba(226, 232, 240, 0.15)"
            icon={Briefcase}
            metaphor="The Bridge"
            capabilities={capabilities}
            CardWrapper={PanoramicEffect}
            backgroundPattern={<GridPattern />}
            sectorKey="management"
        />
    );
}
