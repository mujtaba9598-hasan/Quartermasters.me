'use client'

import { useState, useEffect, useCallback } from 'react'

// Constants
export const COOKIE_NAME = 'qm_consent'
export const GEO_COOKIE_NAME = 'qm_geo_mode'
export const MIN_EXPIRY_DAYS = 365

// Default State
export type ConsentState = {
    essential: boolean
    analytics: boolean
    marketing: boolean
    preferences: boolean
}

const DEFAULT_CONSENT: ConsentState = {
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
}

// Helpers
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

const setCookie = (name: string, value: string, days: number = MIN_EXPIRY_DAYS) => {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

export function useConsent() {
    // Lazy initialization for consent
    const [consent, setConsent] = useState<ConsentState>(() => {
        const existing = getCookie(COOKIE_NAME)
        if (existing) {
            try {
                return JSON.parse(existing)
            } catch {
                return DEFAULT_CONSENT
            }
        }
        return DEFAULT_CONSENT
    })

    // Lazy initialization for geoMode
    const [geoMode, setGeoMode] = useState<string>(() => {
        return getCookie(GEO_COOKIE_NAME) || 'default'
    })

    const [hasConsented, setHasConsented] = useState(() => {
        return !!getCookie(COOKIE_NAME)
    })

    const [isLoaded, setIsLoaded] = useState(false)
    const [showBanner, setShowBanner] = useState(false)

    const initDefaults = useCallback((mode: string) => {
        if (mode === 'gdpr') {
            setConsent({ essential: true, analytics: false, marketing: false, preferences: false })
        } else {
            setConsent({ essential: true, analytics: true, marketing: false, preferences: false })
        }
    }, [])

    useEffect(() => {
        // Initialization happened in useState, but we need to show banner if no consent
        const existing = getCookie(COOKIE_NAME)
        if (!existing) {
            const mode = getCookie(GEO_COOKIE_NAME) || 'default'
            initDefaults(mode)
            setShowBanner(true)
        }
        setIsLoaded(true)
    }, [initDefaults])

    const saveConsent = useCallback((ct: ConsentState) => {
        setCookie(COOKIE_NAME, JSON.stringify(ct))
        setConsent(ct)
        setHasConsented(true)
        setShowBanner(false)

        if (ct.analytics) {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('consent-updated'))
            }
        }
    }, [])

    const acceptAll = useCallback(() => saveConsent({ essential: true, analytics: true, marketing: true, preferences: true }), [saveConsent])
    const rejectAll = useCallback(() => saveConsent({ essential: true, analytics: false, marketing: false, preferences: false }), [saveConsent])

    return {
        geoMode,
        consent,
        hasConsented,
        isLoaded,
        showBanner,
        setShowBanner,
        acceptAll,
        rejectAll,
        saveConsent,
        setConsent
    }
}
