import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// Rate-limit store  (in-memory; resets on cold-start — fine for edge/serverless
// because Vercel keeps the process alive for ~15 min between invocations)
// ---------------------------------------------------------------------------
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5; // max submissions
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SERVICES = [
  "banking",
  "hr",
  "management",
  "events",
  "tech",
  "general",
];

const SERVICE_LABELS: Record<string, string> = {
  banking: "Banking Services Consultancy",
  hr: "Human Resources Consultancy",
  management: "Management Consultancies",
  events: "Organization & Event Management",
  tech: "Technology Education R&D",
  general: "General Inquiry",
};

const MAX_LENGTHS: Record<string, number> = {
  name: 200,
  email: 320,
  organization: 300,
  service: 50,
  message: 5000,
};

interface ContactPayload {
  name: string;
  email: string;
  organization: string;
  whatsapp?: string;
  service: string;
  message: string;
  _honeypot?: string;
}

function validate(data: unknown): { ok: true; payload: ContactPayload } | { ok: false; error: string } {
  if (!data || typeof data !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const d = data as Record<string, unknown>;

  // Honeypot check — if filled, silently "succeed" to fool bots
  if (typeof d._honeypot === "string" && d._honeypot.length > 0) {
    return { ok: true, payload: d as unknown as ContactPayload };
  }

  // Required fields
  const requiredFields: (keyof ContactPayload)[] = ["name", "email", "service", "message"];
  for (const field of requiredFields) {
    const val = d[field];
    if (typeof val !== "string" || val.trim().length === 0) {
      return { ok: false, error: `"${field}" is required.` };
    }
  }

  // Max-length checks
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const val = d[field];
    if (typeof val === "string" && val.length > max) {
      return { ok: false, error: `"${field}" exceeds maximum length of ${max} characters.` };
    }
  }

  // Email format
  if (!EMAIL_RE.test((d.email as string).trim())) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (!VALID_SERVICES.includes((d.service as string).trim())) {
    return { ok: false, error: "Invalid service selection." };
  }

  return {
    ok: true,
    payload: {
      name: (d.name as string).trim(),
      email: (d.email as string).trim(),
      organization: typeof d.organization === "string" ? d.organization.trim() : "",
      whatsapp: typeof d.whatsapp === "string" ? d.whatsapp.trim() : "",
      service: (d.service as string).trim(),
      message: (d.message as string).trim(),
      _honeypot: typeof d._honeypot === "string" ? d._honeypot : "",
    },
  };
}

// ---------------------------------------------------------------------------
// HTML email template
// ---------------------------------------------------------------------------
function buildEmailHtml(p: ContactPayload): string {
  const serviceLabel = SERVICE_LABELS[p.service] ?? p.service;
  const escapedMessage = p.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0c0a09;color:#e7e5e4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0a09;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1c1917;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="padding:32px 32px 20px;border-bottom:1px solid #292524;">
            <h1 style="margin:0;font-size:20px;color:#c15a2c;letter-spacing:0.05em;text-transform:uppercase;">
              New Contact Inquiry
            </h1>
            <p style="margin:8px 0 0;font-size:13px;color:#a8a29e;">
              Submitted via quartermasters.me contact form
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;width:140px;vertical-align:top;">Name</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">${p.name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Email</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">
                  <a href="mailto:${p.email}" style="color:#c15a2c;text-decoration:none;">${p.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">WhatsApp</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">${p.whatsapp || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Organization</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">${p.organization || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;vertical-align:top;">Service</td>
                <td style="padding:10px 0;font-size:14px;color:#e7e5e4;">${serviceLabel}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:18px 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#78716c;font-weight:600;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:8px 16px;font-size:14px;color:#e7e5e4;background:#292524;border-radius:8px;line-height:1.6;">
                  ${escapedMessage}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #292524;font-size:11px;color:#78716c;">
            Quartermasters F.Z.C &mdash; Ajman Free Zone, UAE &bull; License No: 37357
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

// ---------------------------------------------------------------------------
// SMTP transporter (Hostinger)
// ---------------------------------------------------------------------------
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true, // SSL
    auth: {
      user: process.env.SMTP_USER ?? "",
      pass: process.env.SMTP_PASS ?? "",
    },
  });
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    // --- Rate limiting ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // --- Parse body ---
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    // --- Validate ---
    const result = validate(body);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const { payload } = result;

    // If honeypot was filled, return fake success (don't send email)
    if (payload._honeypot && payload._honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    // --- Check SMTP credentials ---
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpUser || !smtpPass) {
      console.error("[contact] SMTP credentials not configured.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact us directly at hello@quartermasters.me." },
        { status: 503 },
      );
    }

    // --- Send email via Hostinger SMTP ---
    const transporter = createTransporter();

    const toEmails = (process.env.CONTACT_EMAIL ?? "hello@quartermasters.me,mujtaba@quartermasters.me")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const fromEmail = process.env.SMTP_USER;
    const serviceLabel = SERVICE_LABELS[payload.service] ?? payload.service;

    await transporter.sendMail({
      from: `Quartermasters Contact <${fromEmail}>`,
      to: toEmails.join(", "),
      replyTo: payload.email,
      subject: `New Inquiry: ${serviceLabel} — ${payload.name}`,
      html: buildEmailHtml(payload),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or contact us directly at hello@quartermasters.me." },
      { status: 502 },
    );
  }
}
