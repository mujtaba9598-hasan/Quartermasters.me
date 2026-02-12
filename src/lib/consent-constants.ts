export const COOKIE_NAME = 'qm_consent'
export const GEO_COOKIE_NAME = 'qm_geo_mode'
export const COOKIE_EXPIRY_DAYS = 365

export const CONSENT_CATEGORIES = {
    ESSENTIAL: 'essential',
    ANALYTICS: 'analytics',
    MARKETING: 'marketing',
    PREFERENCES: 'preferences',
} as const

export const REGIONS = {
    // GDPR: EU/EEA + UK
    GDPR: [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'IS', 'LI', 'NO', 'CH'
    ],
    // CCPA: United States ONLY (CA in geo headers means Canada, not California)
    CCPA: ['US'],
    // PDPL: United Arab Emirates
    PDPL: ['AE'],
}

export type ConsentState = {
    [K in keyof typeof CONSENT_CATEGORIES]: boolean
}

export const DEFAULT_CONSENT: ConsentState = {
    ESSENTIAL: true,
    ANALYTICS: false,
    MARKETING: false,
    PREFERENCES: false,
}
