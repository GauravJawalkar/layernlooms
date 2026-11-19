import { NextResponse } from "next/server";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeader(value: unknown, maxLen = 120): string {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLen);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const fullName = sanitizeHeader(body?.fullName || body?.name, 100);
    const email = sanitizeHeader(body?.email, 160);
    const phone = sanitizeHeader(body?.phone || body?.telephone, 50);
    const partnerType = sanitizeHeader(body?.partnerType || body?.classification, 100);
    const company = sanitizeHeader(body?.company, 120);
    const payoutPreference = sanitizeHeader(body?.payoutPreference, 80);
    const message = String(body?.message ?? "").trim().slice(0, 5000);

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full Name, email, and phone number are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Try storing to Firestore if configured
    try {
      const { db } = await import("@/app/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      if (db) {
        await addDoc(collection(db, "partner_applications"), {
          fullName,
          email,
          phone,
          partnerType: partnerType || "Individual / Consultant",
          company: company || "N/A",
          payoutPreference: payoutPreference || "Turnkey (14 Business Days)",
          message: message || "No message provided",
          createdAt: serverTimestamp(),
          read: false,
          status: "pending_review",
        });
      }
    } catch (firestoreErr) {
      console.warn("Firestore partner save fallback:", firestoreErr);
    }

    // Attempt to send email if SMTP credentials are provided
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      try {
        const recipients = (process.env.NOTIFICATION_EMAIL || process.env.SMTP_EMAIL)
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);

        if (recipients.length > 0) {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.default.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD,
            },
          });

          const safeName = escapeHtml(fullName);
          const safeEmail = escapeHtml(email);
          const safePhone = escapeHtml(phone);
          const safeCompany = escapeHtml(company || "Not specified");
          const safePartnerType = escapeHtml(partnerType || "Technology Consultant / Other");
          const safePayout = escapeHtml(payoutPreference || "Turnkey (14 Business Days)");
          const safeMessage = escapeHtml(message || "No initial note provided");

          await transporter.sendMail({
            from: `"${fullName.replace(/"/g, "")}" <${process.env.SMTP_EMAIL}>`,
            replyTo: email,
            to: recipients,
            subject: `New Partner Application: ${fullName} (${safePartnerType})`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
                  .container { max-width: 600px; margin: 0 auto; background: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 28px; }
                  .badge { display: inline-block; padding: 4px 12px; background: #27272a; color: #e4e4e7; border-radius: 9999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
                  h1 { font-size: 22px; margin: 16px 0 8px 0; color: #ffffff; }
                  p { color: #a1a1aa; line-height: 1.5; margin: 0 0 20px 0; font-size: 14px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
                  th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #27272a; }
                  th { color: #71717a; font-weight: 500; width: 35%; }
                  td { color: #f4f4f5; }
                  .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #27272a; font-size: 12px; color: #71717a; text-align: center; }
                </style>
              </head>
              <body>
                <div class="container">
                  <span class="badge">Partner Programme Application</span>
                  <h1>New Partner Registration</h1>
                  <p>A new partner has submitted an application through the LayerNlooms Partner Programme portal.</p>
                  <table>
                    <tr><th>Applicant Name</th><td><strong>${safeName}</strong></td></tr>
                    <tr><th>Email</th><td><a href="mailto:${safeEmail}" style="color: #60a5fa;">${safeEmail}</a></td></tr>
                    <tr><th>Phone / WhatsApp</th><td>${safePhone}</td></tr>
                    <tr><th>Partner Type</th><td>${safePartnerType}</td></tr>
                    <tr><th>Company / Agency</th><td>${safeCompany}</td></tr>
                    <tr><th>Payout Preference</th><td>${safePayout}</td></tr>
                    <tr><th>Referral / Message</th><td>${safeMessage}</td></tr>
                  </table>
                  <div class="footer">
                    LayerNlooms Partner Management • Pune, Maharashtra, India • <a href="https://layernlooms.com" style="color: #a1a1aa;">layernlooms.com</a>
                  </div>
                </div>
              </body>
              </html>
            `,
          });
        }
      } catch (mailErr) {
        console.warn("Partner email delivery warning:", mailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your partner registration application has been received. Our leadership team will review and respond within 24-48 business hours.",
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Partner API submission error:", err);
    return NextResponse.json(
      { error: "Failed to process partner application. Please try again or reach out directly to contact@layernlooms.com" },
      { status: 500 }
    );
  }
}
