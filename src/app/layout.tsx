import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { JsonLd } from "@/components/layout/JsonLd";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://quartermasters.me'),
  title: {
    default: "Quartermasters F.Z.C — Strategic Orchestration",
    template: "%s | Quartermasters F.Z.C"
  },
  description:
    "Ajman Free Zone Licensed Consultancy. Banking Services Consultancy, Human Resources Consultancy, Management Consultancies, Organization & Event Management, and Technology Education R&D. License No: 37357.",
  keywords: [
    "Quartermasters",
    "Ajman Free Zone",
    "Human Resources Consultancy UAE",
    "Banking Services Consultancy",
    "Organization and Event Management",
    "Technology Education R&D",
    "Management Consultancies UAE",
    "AFZA",
  ],
  authors: [{ name: "Quartermasters F.Z.C" }],
  openGraph: {
    title: "Quartermasters F.Z.C — Strategic Orchestration",
    description:
      "Strategic Orchestration for Capital, Talent, and Logistics. Licensed by Ajman Free Zone Authority.",
    url: 'https://quartermasters.me',
    siteName: 'Quartermasters F.Z.C',
    images: [
      {
        url: 'https://quartermasters.me/og-image.jpg', // Placeholder, needs asset
        width: 1200,
        height: 630,
        alt: 'Quartermasters F.Z.C Sovereign Nexus',
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quartermasters F.Z.C',
    description: 'Strategic Orchestration for Capital, Talent, and Logistics.',
    creator: '@QuartermastersFZC', // Placeholder
    images: ['https://quartermasters.me/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://quartermasters.me',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
