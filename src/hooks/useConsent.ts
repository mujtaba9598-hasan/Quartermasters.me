'use client'

import { useState, useEffect } from 'react'

// Constants
export const COOKIE_NAME = 'qm_consent'
export const GEO_COOKIE_NAME = 'qm_geo_mode'
export const MIN_EXPIRY_DAYS = 365

// Default State (Must match CEO spec: Analytics ON by default for CCPA/PDPL, OFF for GDPR)
export type ConsentState = {
    essential: boolean
    analytics: boolean
    marketing: boolean
    preferences: boolean
}

// Helpers
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

function setCookie(name: string, value: string, days: number = MIN_EXPIRY_DAYS) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`
}

export function useConsent() {
    const [consent, setConsent] = useState<ConsentState>({
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false
    })
    const [geoMode, setGeoMode] = useState<string>('default')
    const [hasConsented, setHasConsented] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        // 1. Determine Region Mode
        const mode = getCookie(GEO_COOKIE_NAME) || 'default' // gdpr | ccpa | pdpl | default
        setGeoMode(mode)

        // 2. Check Existing Consent
        const existing = getCookie(COOKIE_NAME)

        if (existing) {
            try {
                setConsent(JSON.parse(existing))
                setHasConsented(true)
                setShowBanner(false)
            } catch (e) {
                // Invalid consent, clear it
                initDefaults(mode)
            }
        } else {
            // No consent yet, initialize defaults based on region
            initDefaults(mode)
            setShowBanner(true)
        }

        setIsLoaded(true)
    }, [])

    const initDefaults = (mode: string) => {
        // GDPR: Opt-in (Everything OFF except essential)
        if (mode === 'gdpr') {
            setConsent({ essential: true, analytics: false, marketing: false, preferences: false })
        }
        // CCPA/PDPL/Default: Opt-out (Analytics ON by default per prompt requirement)
        else {
            setConsent({ essential: true, analytics: true, marketing: false, preferences: false })
        }
    }

    const saveConsent = (ct: ConsentState) => {
        setCookie(COOKIE_NAME, JSON.stringify(ct))
        setConsent(ct)
        setHasConsented(true)
        setShowBanner(false)

        // Trigger analytics load if consented
        if (ct.analytics) {
            if (typeof window !== 'undefined') {
                // TODO: Integrate PostHog conditional loading here. 
                // Do not load analytics scripts until consent.analytics === true in GDPR mode.
                // PostHog or GTM reload trigger should be initialized here.
                window.dispatchEvent(new Event('consent-updated'))
            }
        }
    }

    const acceptAll = () => saveConsent({ essential: true, analytics: true, marketing: true, preferences: true })
    const rejectAll = () => saveConsent({ essential: true, analytics: false, marketing: false, preferences: false })
    const acceptCurrent = () => saveConsent(consent)

    return {
        consent,
        geoMode,
        hasConsented,
        isLoaded,
        showBanner,
        setShowBanner,
        setConsent,
        saveConsent,
        acceptAll,
        rejectAll,
        acceptCurrent
    }
}
