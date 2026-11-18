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
    const name = sanitizeHeader(body?.name, 100);
    const email = sanitizeHeader(body?.email, 160);
    const company = sanitizeHeader(body?.company, 120);
    const projectType = sanitizeHeader(body?.projectType, 120);
    const budget = sanitizeHeader(body?.budget, 80);
    const message = String(body?.message ?? "").trim().slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      return NextResponse.json(
        { error: "Email delivery is not configured on the server" },
        { status: 503 }
      );
    }

    const recipients = (process.env.NOTIFICATION_EMAIL || process.env.SMTP_EMAIL)
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No notification recipient configured" },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeProjectType = escapeHtml(projectType);
    const safeBudget = escapeHtml(budget);
    const safeMessage = escapeHtml(message);

    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.default.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const detailRows = [
      ["Name", safeName, true],
      ["Email", safeEmail, true],
      ["Company", safeCompany, Boolean(company)],
      ["Project Type", safeProjectType, Boolean(projectType)],
      ["Budget", safeBudget, Boolean(budget)],
    ].filter(([, , show]) => show) as [string, string, boolean][];

    await transporter.sendMail({
      from: `"${name.replace(/"/g, "")}" <${process.env.SMTP_EMAIL}>`,
      replyTo: email,
      to: recipients,
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width:480px){
              .wrapper{width:100%!important;padding:0!important}
              .inner{padding:20px!important}
              .label{display:block!important;width:100%!important;padding:4px 0!important}
              .val{display:block!important;width:100%!important;padding:0 0 8px 0!important}
              .header-logo{text-align:center!important}
              .header-badge{text-align:center!important;display:block!important;margin-top:6px!important}
              h1{font-size:20px!important}
            }
          </style>
        </head>
        <body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9">
            <tr><td align="center" style="padding:40px 16px">
              <table class="wrapper" role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06)">
                <tr>
                  <td style="background:#ffffff;border-bottom:2px solid #f1f5f9">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding:24px 32px">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td class="header-logo" style="vertical-align:middle">
                              <img src="https://layernlooms.com/favicon.png" alt="LayerNLooms" width="40" height="40" style="display:inline-block;border-radius:8px;vertical-align:middle;margin-right:10px">
                            </td>
                            <td class="header-badge" style="vertical-align:middle;text-align:right">
                              <span style="display:inline-block;font-size:11px;font-weight:600;color:#6366f1;background:#eef2ff;padding:4px 14px;border-radius:20px;letter-spacing:0.3px">CONTACT INQUIRY</span>
                            </td>
                          </tr>
                        </table>
                      </td></tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="padding:32px 32px 0 32px" class="inner"><h1 style="margin:0 0 4px 0;font-size:22px;font-weight:700;color:#0f172a">New Message</h1><p style="margin:0 0 28px 0;font-size:14px;color:#64748b">${safeName} sent an inquiry via the contact form</p></td></tr>
                <tr>
                  <td style="padding:0 32px 24px 32px" class="inner">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden">
                      <tr><td style="background:#f8fafc;padding:12px 20px;border-bottom:1px solid #e2e8f0"><span style="font-size:8px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Contact Details</span></td></tr>
                      <tr><td style="padding:4px 20px">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          ${detailRows.map(([label, value], i, arr) => `
                            <tr>
                              <td class="label" width="90" style="vertical-align:top;padding:${i === 0 ? '12px 16px 6px 0' : '6px 16px 6px 0'};font-size:12px;color:#94a3b8;font-weight:500">${label}</td>
                              <td class="val" style="vertical-align:top;padding:${i === 0 ? '12px 0 6px 0' : '6px 0 6px 0'};font-size:14px;color:#0f172a;font-weight:600;word-break:break-word">${label === 'Email' ? `<a href="mailto:${value}" style="color:#6366f1;text-decoration:none;font-weight:600">${value}</a>` : value}</td>
                            </tr>
                            ${i < arr.length - 1 ? '<tr><td colspan="2"><div style="height:1px;background:#f1f5f9;margin:0"></div></td></tr>' : ''}
                          `).join("")}
                        </table>
                      </td></tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 24px 32px" class="inner">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden">
                      <tr><td style="background:#f8fafc;padding:12px 20px;border-bottom:1px solid #e2e8f0"><span style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px">Message</span></td></tr>
                      <tr><td style="padding:16px 20px;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap">${safeMessage}</td></tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 28px 32px" class="inner">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding-top:16px;border-top:1px solid #f1f5f9"><p style="margin:0;font-size:11px;color:#94a3b8;text-align:center">Sent from <span style="color:#6366f1;font-weight:600">layernlooms.com</span></p></td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Email send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
