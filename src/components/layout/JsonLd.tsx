export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quartermasters F.Z.C",
    url: "https://quartermasters.me",
    logo: "https://quartermasters.me/og-image.jpg",
    description:
      "Ajman Free Zone Licensed Consultancy. Banking Services Consultancy, Human Resources Consultancy, Management Consultancies, Organization & Event Management, and Technology Education R&D.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C1 Building, Office SF2097",
      addressLocality: "Ajman Free Zone",
      addressRegion: "Ajman",
      addressCountry: "AE",
    },
    sameAs: [
      "https://twitter.com/QuartermastersFZC",
      "https://linkedin.com/company/quartermasters-fzc"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Quartermasters F.Z.C",
    image: "https://quartermasters.me/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C1 Building, Office SF2097",
      addressLocality: "Ajman Free Zone",
      addressRegion: "Ajman",
      addressCountry: "AE",
    },
    description:
      "Licensed consultancy operating across five integrated verticals: Banking Services Consultancy, Human Resources Consultancy, Management Consultancies, Organization & Event Management, and Technology Education R&D.",
    priceRange: "$$$$",
  };

  const services = [
    {
      name: "Banking Services Consultancy",
      description:
        "Strategic advisory on banking operations, regulatory compliance, capital structuring, and financial framework development.",
    },
    {
      name: "Human Resources Consultancy",
      description:
        "Talent acquisition, workforce deployment, organizational development, and HR compliance advisory.",
    },
    {
      name: "Management Consultancies",
      description:
        "Strategic management advisory, organizational design, governance frameworks, and executive decision-making support.",
    },
    {
      name: "Organization and Event Management",
      description:
        "High-stakes logistics, venue coordination, event strategy, and operational deployment at scale.",
    },
    {
      name: "Technology Education and Research Consulting",
      description:
        "Digital transformation advisory, technology education consulting, R&D strategy, and emerging technology assessment.",
    },
  ];

  const serviceSchema = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Quartermasters F.Z.C",
    },
    name: s.name,
    description: s.description,
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Quartermasters F.Z.C offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters F.Z.C is licensed under AFZA License 37357 to provide five consultancy services: Banking Services Consultancy, Human Resources Consultancy, Management Consultancies, Organization and Event Management, and Technology Education and Research Consulting.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Quartermasters F.Z.C located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters F.Z.C is headquartered in Ajman Free Zone, C1 Building, Office SF2097, United Arab Emirates.",
        },
      },
      {
        "@type": "Question",
        name: "Who offers R&D in Tech Education in Ajman?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Quartermasters F.Z.C, licensed under AFZA License 37357, provides consulting in technology education and research from their Ajman Free Zone headquarters.",
        },
      },
      {
        "@type": "Question",
        name: "Is Quartermasters F.Z.C a regulated consultancy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Quartermasters F.Z.C is regulated by the Ajman Free Zone Authority (AFZA) under License Number 37357. All services are subject to UAE Government Authority Approvals.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {serviceSchema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
