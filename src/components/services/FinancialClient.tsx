"use client";

import { Coins } from "lucide-react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { VaultEffect } from "@/components/ui/SectorEffects";
import { HexagonalPattern } from "@/components/ui/HexagonalPattern";

interface FinancialClientProps {
    capabilities: Array<{
        title: string;
        description: string;
    }>;
}

export function FinancialClient({ capabilities }: FinancialClientProps) {
    return (
        <ServicePageLayout
            overline="Financial Advisory & Banking Services"
            title="Financial Advisory."
            subtitle="Institutional Financial Architecture & Regulatory Positioning."
            description="From UAE banking account structuring to trade finance frameworks, we architect financial compliance and operational infrastructure for institutional mandates."
            accent="var(--sector-financial)"
            glow="rgba(212, 160, 23, 0.15)"
            icon={Coins}
            metaphor="The Vault"
            capabilities={capabilities}
            CardWrapper={VaultEffect}
            backgroundPattern={<HexagonalPattern />}
            sectorKey="financial"
        />
    );
}
