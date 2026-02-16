"use client";

import { Users } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { BreathingEffect } from "@/components/ui/SectorEffects";
import { NetworkPattern } from "@/components/ui/HexagonalPattern";

interface HumanCapitalClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function HumanCapitalClient({ capabilities }: HumanCapitalClientProps) {
    return (
        <ServicePageLayout
            overline="Human Capital & Resource Management"
            title="Human Resources."
            subtitle="Workforce Infrastructure & Regulatory Compliance."
            description="We manage end-to-end HR compliance, workforce structuring, and regulatory positioning across the UAE's evolving labor framework."
            accent="var(--sector-hr-teal)"
            glow="rgba(20, 184, 166, 0.15)"
            icon={Users}
            metaphor="The Network"
            capabilities={capabilities}
            CardWrapper={BreathingEffect}
            backgroundPattern={<NetworkPattern />}
            sectorKey="hr"
        />
    );
}
