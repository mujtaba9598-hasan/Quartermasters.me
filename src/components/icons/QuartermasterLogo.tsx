interface LogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "mono" | "icon";
}

/**
 * Quartermasters brand logo — renders the official .avif logo image.
 * variant="icon" renders just the logo mark.
 * variant="full" renders the logo mark + "QUARTERMASTERS F.Z.C" text.
 */
export function QuartermasterLogo({
  size = 48,
  className = "",
  variant = "full",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/quartermasters-logo.avif"
        alt="Quartermasters Logo"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain" }}
      />

      {variant === "full" && (
        <div className="flex flex-col">
          <span
            className="text-lg font-semibold tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "#A0B5AA" }}
          >
            QUARTERMASTERS
          </span>
          <span
            className="text-xs tracking-widest"
            style={{ fontFamily: "var(--font-heading)", color: "#5E7A6E" }}
          >
            F.Z.C
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Favicon-ready version — simplified, no text.
 */
export function QuartermasterIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <QuartermasterLogo size={size} className={className} variant="icon" />;
}
