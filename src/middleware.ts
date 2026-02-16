import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { REGIONS } from '@/lib/consent-constants'

export function middleware(request: NextRequest) {
    // Get Country from Cloudflare Header
    const country = request.headers.get('cf-ipcountry') || 'US'

    // Determine Geo Mode
    let geoMode = 'default'
    if (REGIONS.GDPR.includes(country)) geoMode = 'gdpr'
    else if (REGIONS.CCPA.includes(country)) geoMode = 'ccpa'
    else if (REGIONS.PDPL.includes(country)) geoMode = 'pdpl'

    // Set Cookie
    const response = NextResponse.next()

    // 'qm_geo_mode' cookie is read by client components to apply consent rules
    response.cookies.set('qm_geo_mode', geoMode, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    // Optional: Also set raw country code for other features
    response.cookies.set('qm-country', country, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
