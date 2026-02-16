import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://quartermasters.me'

    // Core routes
    const routes = [
        '',
        '/about',
        '/services',
        '/contact',
        '/knowledge-base',
        '/banking-services',
        '/human-resources',
        '/management-consultancy',
        '/organization-event-management',
        '/tech-rnd',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
