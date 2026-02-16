import Link from "next/link";
import { QuartermasterLogo } from "@/components/icons/QuartermasterLogo";
import { FooterTicker } from "@/components/layout/FooterTicker";
import { CookiePreferencesButton } from "@/components/layout/CookiePreferencesButton";

const footerLinks = {
  services: [
    { label: "Banking Services Consultancy", href: "/financial-advisory" },
    { label: "Human Resources Consultancy", href: "/human-capital" },
    { label: "Technology Education R&D", href: "/tech-rnd" },
    { label: "Organization & Event Management", href: "/event-logistics" },
    { label: "Management Consultancies", href: "/management" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "/portal" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Cookie Preferences", href: "#", onclick: "deleteCookiePreferences" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

/**
 * Footer — Server Component.
 * All text, links, and structural HTML render on the server for SEO.
 * Link hover effects use pure CSS (Tailwind classes). Only the live ticker is a client island.
 */
export function Footer() {
  return (
    <footer>
      {/* Live Operations Ticker — client island */}
      <div
        className="overflow-hidden py-2"
        style={{
          background: "rgba(15, 26, 23, 0.8)",
          borderTop: "1px solid var(--glass-border)",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <FooterTicker />
      </div>

      {/* Main Footer */}
      <div
        style={{
          background: "linear-gradient(180deg, #0f1a17 0%, #0a1410 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" aria-label="Back to Homepage" className="inline-block transition-opacity hover:opacity-80">
                <QuartermasterLogo size={44} variant="full" />
              </Link>
              <p
                className="mt-4 max-w-sm text-sm leading-relaxed"
                style={{ color: "var(--color-text-dim)" }}
              >
                Strategic orchestration for Capital and Talent.
                Integrated advisory across Banking Services, Human Resources,
                Management Consultancies, Organization & Event Management,
                and Technology Education R&D.
              </p>
              <div className="mt-6 flex gap-3">
                <span className="pill-tag pill-tag--financial">#Capital</span>
                <span className="pill-tag pill-tag--hr">#Talent</span>
                <span className="pill-tag pill-tag--hr">#HR</span>
                <span className="pill-tag pill-tag--mgmt">#Strategy</span>
              </div>
            </div>

            {/* Service Links */}
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-accent-gold)",
                }}
              >
                Service Arms
              </p>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-dim transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-accent-gold)",
                }}
              >
                Company
              </p>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    {link.label === "Cookie Preferences" ? (
                      <CookiePreferencesButton />
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-dim transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar — Trust Anchors */}
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
            style={{ borderTop: "1px solid var(--glass-border)" }}
          >
            <div>
              <p
                className="text-sm font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-text-base)",
                }}
              >
                Quartermasters - F.Z.C
              </p>
            </div>
            <div className="text-right">
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-text-dim)", opacity: 0.7 }}
              >
                Subject to UAE Government Authority Approvals
              </p>
              <div className="mt-2 text-[10px] text-emerald-500/50 font-mono">
                v2.1-CLEAN-BUILD
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
