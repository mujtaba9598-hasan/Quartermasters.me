'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronDown, ChevronUp, Check } from 'lucide-react'

// --- Types ---
type ConsentCategory = 'necessary' | 'analytics' | 'marketing'
type ConsentState = Record<ConsentCategory, boolean>
type Region = 'EU' | 'US-CA' | 'ROW' // GDPR, CCPA, Rest of World

interface CookieConsentProps { }

// --- Helpers ---
function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

function setCookie(name: string, value: string, days: number = 365) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`
}

// --- Component ---
export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [region, setRegion] = useState<Region>('ROW')
    const [consent, setConsent] = useState<ConsentState>({
        necessary: true,
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        // 1. Check existing consent
        const existing = getCookie('qm-consent')
        if (existing) return // Already consented

        // 2. Check Region from Middleware Cookie
        const country = getCookie('qm-country') || 'US'

        // Simple EU detection (expand list as needed)
        const euCountries = ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'PL', 'AT', 'DK', 'FI', 'IE', 'PT', 'GR', 'CZ', 'RO', 'HU']

        if (euCountries.includes(country)) {
            setRegion('EU')
            setConsent({ necessary: true, analytics: false, marketing: false }) // GDPR: Opt-in
        } else if (country === 'US' || country === 'CA') {
            setRegion('US-CA')
            setConsent({ necessary: true, analytics: true, marketing: true }) // CCPA: Opt-out
        } else {
            setRegion('ROW')
            setConsent({ necessary: true, analytics: true, marketing: true }) // Default: Opt-out/Notice
        }

        // Delay show for animation
        const timer = setTimeout(() => setIsVisible(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    const saveConsent = (finalConsent: ConsentState) => {
        setCookie('qm-consent', JSON.stringify(finalConsent))
        setIsVisible(false)

        // PostHog Logic: Only load if analytics is true
        if (finalConsent.analytics) {
            if (typeof window !== 'undefined') {
                window.location.reload() // Simple reload to activate analytics scripts managed by layout
            }
        }
    }

    const handleAcceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true })
    const handleRejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false })
    const handleSavePreferences = () => saveConsent(consent)

    if (!isVisible) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-8 md:w-[480px]"
                >
                    {/* Glass Panel */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
                        {/* Glow Effect */}
                        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#C15A2C]/20 blur-3xl" />

                        <div className="relative flex flex-col gap-4">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C15A2C]/10 text-[#C15A2C]">
                                        <Shield className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">
                                            {region === 'EU' ? 'Cookie Consent' : 'We use cookies'}
                                        </h3>
                                        <p className="text-xs text-slate-400">
                                            {region === 'EU'
                                                ? 'We value your privacy. Choose which cookies you allow.'
                                                : 'Enhancing your digital experience securely.'}
                                        </p>
                                    </div>
                                </div>
                                {region === 'EU' && (
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                                    >
                                        {isExpanded ? 'Less' : 'Options'}
                                        {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                    </button>
                                )}
                            </div>

                            {/* Collapsed View (Simple Actions) */}
                            {!isExpanded && (
                                <div className="flex gap-3">
                                    {region === 'EU' ? (
                                        <>
                                            <button
                                                onClick={handleRejectAll}
                                                className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                                            >
                                                Reject All
                                            </button>
                                            <button
                                                onClick={handleAcceptAll}
                                                className="flex-1 rounded-lg bg-[#C15A2C] py-2.5 text-xs font-medium text-white shadow-lg shadow-[#C15A2C]/20 transition-all hover:bg-[#A04823] hover:shadow-[#C15A2C]/40"
                                            >
                                                Accept All
                                            </button>
                                        </>
                                    ) : region === 'US-CA' ? (
                                        <div className="flex w-full flex-col gap-3">
                                            <div className="text-xs text-slate-400">
                                                By continuing, you agree to our use of cookies.
                                                <button onClick={() => setIsExpanded(true)} className="ml-1 text-[#C15A2C] underline decoration-dotted">Do Not Sell My Info</button>
                                            </div>
                                            <button
                                                onClick={handleAcceptAll}
                                                className="w-full rounded-lg bg-[#C15A2C] py-2.5 text-xs font-medium text-white shadow-lg shadow-[#C15A2C]/20 transition-all hover:bg-[#A04823]"
                                            >
                                                Acknowledge
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleAcceptAll}
                                            className="w-full rounded-lg bg-[#C15A2C] py-2.5 text-xs font-medium text-white shadow-lg shadow-[#C15A2C]/20 transition-all hover:bg-[#A04823]"
                                        >
                                            Accept & Continue
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Expanded View (Granular Options) */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-3 border-t border-white/10 pt-4">
                                            {/* Necessary */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-white">Necessary</span>
                                                    <span className="text-[10px] text-slate-500">Required for the site to function.</span>
                                                </div>
                                                <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-700">
                                                    <Check className="h-3 w-3 text-slate-400" />
                                                </div>
                                            </div>

                                            {/* Analytics */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-white">Analytics</span>
                                                    <span className="text-[10px] text-slate-500">Helps us improve our services.</span>
                                                </div>
                                                <button
                                                    onClick={() => setConsent(prev => ({ ...prev, analytics: !prev.analytics }))}
                                                    className={`relative h-5 w-9 rounded-full transition-colors ${consent.analytics ? 'bg-[#C15A2C]' : 'bg-slate-700'}`}
                                                >
                                                    <motion.div
                                                        layout
                                                        className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow-sm"
                                                        animate={{ x: consent.analytics ? 16 : 0 }}
                                                    />
                                                </button>
                                            </div>

                                            {/* Marketing */}
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-white">Marketing</span>
                                                    <span className="text-[10px] text-slate-500">Tailored content and ads.</span>
                                                </div>
                                                <button
                                                    onClick={() => setConsent(prev => ({ ...prev, marketing: !prev.marketing }))}
                                                    className={`relative h-5 w-9 rounded-full transition-colors ${consent.marketing ? 'bg-[#C15A2C]' : 'bg-slate-700'}`}
                                                >
                                                    <motion.div
                                                        layout
                                                        className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white shadow-sm"
                                                        animate={{ x: consent.marketing ? 16 : 0 }}
                                                    />
                                                </button>
                                            </div>

                                            <button
                                                onClick={handleSavePreferences}
                                                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-white hover:bg-white/10"
                                            >
                                                Save Preferences
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
