export function ServiceJsonLd({ service }: {
    service: {
        name: string
        description: string
        url: string
        image?: string
    }
}) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Quartermasters F.Z.C",
            "url": "https://quartermasters.me"
        },
        "serviceType": service.name,
        "areaServed": {
            "@type": "Country",
            "name": "United Arab Emirates"
        },
        "url": service.url,
        "image": service.image || "https://quartermasters.me/og-image.jpg"
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
