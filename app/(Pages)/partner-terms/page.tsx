"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Handshake,
  Calculator,
} from "lucide-react";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";

export default function PartnerTermsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Partner Programme", url: "/partner" },
          { name: "Partner Terms & Conditions", url: "/partner-terms" },
        ])}
      />

      <div className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 overflow-hidden z-10">
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          {/* Top Navigation Strip */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center justify-between flex-wrap gap-3"
          >
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Partner Programme
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/partner#calculator"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border border-border/70 hover:border-accent-current/30 transition-all"
              >
                <Calculator className="size-3.5 text-accent-current" />
                Calculator
              </Link>
              <Link
                href="/partner#register-partner"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-current-foreground bg-accent-current px-3.5 py-1.5 rounded-full hover:opacity-90 shadow-sm transition-all"
              >
                <Handshake className="size-3.5" />
                Apply as Partner
              </Link>
            </div>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-secondary/80 text-[11px] font-semibold uppercase tracking-wider text-accent-current mb-4">
              <ShieldCheck className="size-3.5" />
              Corporate Governance & Commercial Terms
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-foreground">
              Partner Programme Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Last Updated & Effective Date: November 2026 • Governing Entity: LayerNlooms (Pune, Maharashtra, India)
            </p>
          </motion.div>

          {/* Quick Summary Highlights Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="p-5 sm:p-6 rounded-2xl border border-accent-current/30 bg-card/80 backdrop-blur-md mb-8 shadow-sm"
          >
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="size-5 text-accent-current" />
              Commercial Summary at a Glance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>10% Referral Commission:</strong> Earned on net eligible software & AI engineering service fees.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>GST Component (18% Statutory Tax):</strong> Standard statutory formulation: <code>Gross ÷ 1.18 × 10%</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Dual Settlement Tracks:</strong> Turnkey (14 business days) or Milestone (7 business days).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>90-Day Lead Protection:</strong> Active build attribution + 90-day extension on scope renewals.</span>
              </div>
            </div>
          </motion.div>

          {/* Terms Content Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Section 1 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">1. Scope, Purpose & Independent Relationship</h2>
              <p>
                These Partner Programme Terms & Conditions (&ldquo;Agreement&rdquo;) govern your participation as a referral and strategic partner (&ldquo;Partner&rdquo;) with <strong>LayerNlooms</strong>, a custom software and artificial intelligence development agency headquartered in Pune, Maharashtra, India (&ldquo;LayerNlooms&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
              </p>
              <p>
                By submitting a partner application or introducing prospective clients through our partner channels, you acknowledge that you have read, understood, and agreed to be legally bound by this Agreement:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li><strong>Independent Contractor Status:</strong> The Partner acts solely as an independent introducer. Nothing in this Agreement creates an employment, partnership, joint venture, franchise, or agency relationship between LayerNlooms and the Partner.</li>
                <li><strong>Introduction-Only Role:</strong> The Partner&rsquo;s scope is strictly limited to identifying, recommending, and introducing prospective clients to LayerNlooms. Partners bear no responsibility for sales closing, pricing negotiations, contract drafting, software architecture, technical delivery, or client support.</li>
                <li><strong>No Authority to Bind:</strong> The Partner possesses no authority, express or implied, to enter into agreements, make warranties, quote prices, issue binding commitments, or collect client payments on behalf of LayerNlooms.</li>
                <li><strong>Non-Exclusive Engagement:</strong> This Agreement is non-exclusive for both parties. The Partner remains free to refer opportunities to other providers, and LayerNlooms is free to accept introductions from other partners.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">2. Referral Procedure, Conflict Checks & Lead Acceptance</h2>
              <p>
                To maintain complete transparency and protect attribution, all client referrals must be submitted through our approved channels:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                <li><strong>Lead Submission:</strong> The Partner submits the prospective client&rsquo;s details (contact person, organization name, work email, phone, and expected software/AI scope) via the official Partner Registration Portal on <a href="https://layernlooms.com/partner" className="text-accent-current hover:underline font-semibold">layernlooms.com/partner</a> or via email to <a href="mailto:contact@layernlooms.com" className="text-accent-current hover:underline font-semibold">contact@layernlooms.com</a>.</li>
                <li><strong>Conflict Verification:</strong> Within twenty-four to forty-eight (24–48) business hours, LayerNlooms conducts a conflict check. A referral will be accepted unless:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>The prospective client is an active customer of LayerNlooms or has been in direct commercial discussions with LayerNlooms within the preceding ninety (90) days; or</li>
                    <li>The prospect was already introduced by another verified partner who holds active attribution.</li>
                  </ul>
                </li>
                <li><strong>Written Lead Acceptance:</strong> Once verified, LayerNlooms issues a formal <em>Lead Acceptance Notice</em> timestamping the Partner&rsquo;s exclusive attribution.</li>
              </ol>
            </div>

            {/* Section 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">3. Commission Rate, GST Component (18% Statutory Tax) & Calculation Base</h2>
              <p>
                LayerNlooms pays a referral commission of <strong>10%</strong> on net eligible service fees that are collected and retained by the Company from an accepted client referral:
              </p>
              <div className="my-4 p-4 rounded-xl border border-border bg-secondary/50 font-mono text-xs sm:text-sm">
                <p className="font-semibold text-foreground mb-1">Standard Calculation Formulation:</p>
                <p className="text-muted-foreground">1. Eligible Service Fee = Gross Project Invoice Amount ÷ 1.18</p>
                <p className="text-muted-foreground">2. GST Component (18% Statutory Tax) = Gross Project Invoice Amount − Eligible Service Fee</p>
                <p className="text-accent-current font-bold">3. Partner Referral Commission (10%) = Eligible Service Fee × 10%</p>
              </div>
              <p>
                <strong>Worked Benchmark Example:</strong>
              </p>
              <div className="overflow-x-auto my-3">
                <table className="w-full text-left text-xs sm:text-sm border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary/60 text-foreground">
                      <th className="p-2.5 border border-border">Description</th>
                      <th className="p-2.5 border border-border">Calculation Logic</th>
                      <th className="p-2.5 border border-border font-semibold">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="p-2.5 border border-border">Gross Project Value (Client Invoiced)</td>
                      <td className="p-2.5 border border-border">Gross contract agreement</td>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹10,00,000</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-border">GST Component (18% Statutory Tax)</td>
                      <td className="p-2.5 border border-border">Gross − Eligible Fee</td>
                      <td className="p-2.5 border border-border">₹1,52,542</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-border">Eligible Service Fee Base</td>
                      <td className="p-2.5 border border-border">₹10,00,000 ÷ 1.18</td>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹8,47,458</td>
                    </tr>
                    <tr className="bg-accent-current/10 font-bold text-foreground">
                      <td className="p-2.5 border border-border">Partner 10% Commission</td>
                      <td className="p-2.5 border border-border">₹8,47,458 × 10%</td>
                      <td className="p-2.5 border border-border text-accent-current font-bold">₹84,746</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 font-semibold text-foreground">
                Commission Schedule across Key Project Presets:
              </p>
              <div className="overflow-x-auto my-3">
                <table className="w-full text-left text-xs sm:text-sm border-collapse border border-border">
                  <thead>
                    <tr className="bg-secondary/60 text-foreground">
                      <th className="p-2.5 border border-border">Project Amount</th>
                      <th className="p-2.5 border border-border">GST Component (18%)</th>
                      <th className="p-2.5 border border-border">Eligible Service Fee</th>
                      <th className="p-2.5 border border-border font-semibold text-accent-current">10% Commission</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹1,00,000 (1 Lakh)</td>
                      <td className="p-2.5 border border-border">₹15,254</td>
                      <td className="p-2.5 border border-border">₹84,746</td>
                      <td className="p-2.5 border border-border font-bold text-foreground">₹8,475</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹5,00,000 (5 Lakhs)</td>
                      <td className="p-2.5 border border-border">₹76,271</td>
                      <td className="p-2.5 border border-border">₹4,23,729</td>
                      <td className="p-2.5 border border-border font-bold text-foreground">₹42,373</td>
                    </tr>
                    <tr className="bg-accent-current/10 font-bold text-foreground">
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹10,00,000 (10 Lakhs)</td>
                      <td className="p-2.5 border border-border">₹1,52,542</td>
                      <td className="p-2.5 border border-border">₹8,47,458</td>
                      <td className="p-2.5 border border-border text-accent-current font-bold">₹84,746</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹25,00,000 (25 Lakhs)</td>
                      <td className="p-2.5 border border-border">₹3,81,356</td>
                      <td className="p-2.5 border border-border">₹21,18,644</td>
                      <td className="p-2.5 border border-border font-bold text-foreground">₹2,11,864</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 border border-border font-semibold text-foreground">₹50,00,000 (50 Lakhs)</td>
                      <td className="p-2.5 border border-border">₹7,62,712</td>
                      <td className="p-2.5 border border-border">₹42,37,288</td>
                      <td className="p-2.5 border border-border font-bold text-foreground">₹4,23,729</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * Note on Deductions: Internal LayerNlooms employee salaries, project management overhead, software engineering costs, and general operating expenditures are <strong>never</strong> deducted from the eligible fee base.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">4. Payout Options, Settlement Cycles & Timelines</h2>
              <p>
                Partners may select between two distinct settlement options to align with their cash flow expectations:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 not-prose">
                <div className="p-4 rounded-xl border border-border bg-card/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-current">Option 01</span>
                  <h3 className="text-base font-bold text-foreground mt-1">Turnkey Settlement</h3>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Recommended for fixed-scope, single-milestone, and turnkey software deliverables.
                  </p>
                  <ul className="text-xs text-muted-foreground mt-3 space-y-1.5">
                    <li>• <strong>Disbursement Timeline:</strong> Paid within <strong>14 business days</strong> following full (100%) client payment receipt and project completion sign-off.</li>
                    <li>• <strong>Payment Mode:</strong> Single consolidated lump-sum bank transfer (NEFT/RTGS/IMPS).</li>
                    <li>• <strong>Minimum Threshold:</strong> None.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-current">Option 02</span>
                  <h3 className="text-base font-bold text-foreground mt-1">Milestone-Based Settlement</h3>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Recommended for multi-phase, enterprise sprint architectures, and ongoing retainers.
                  </p>
                  <ul className="text-xs text-muted-foreground mt-3 space-y-1.5">
                    <li>• <strong>Disbursement Timeline:</strong> Paid within <strong>7 business days</strong> following client payment clearance of each approved milestone invoice.</li>
                    <li>• <strong>Payment Mode:</strong> Pro-rata incremental disbursements per cleared invoice.</li>
                    <li>• <strong>Minimum Threshold:</strong> None.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">5. Lead Protection Guarantee & 90-Day Follow-On Window</h2>
              <p>
                LayerNlooms provides rigorous attribution protection to ensure partners are rewarded fairly:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Active Project Lifecycle Coverage:</strong> Once a lead is accepted, the Partner maintains full exclusivity for that prospective customer throughout the entire sales, negotiation, and delivery lifecycle.</li>
                <li><strong>90-Day Follow-on Protection:</strong> If the introduced client enters into any follow-on contracts, upgrades, phase two roadmaps, or additional Statement of Work (SOW) agreements with LayerNlooms within <strong>ninety (90) calendar days</strong> following the final completion of the initial contract, the Partner automatically earns the identical <strong>10% commission</strong> on all qualifying net service fees from those follow-on engagements.</li>
                <li><strong>Expirations:</strong> Engagements contracted after the expiry of the 90-day follow-on window without subsequent Partner re-introduction are treated as direct company engagements.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">6. Eligible Services vs. Non-Commissionable Pass-Through Items</h2>
              <p>
                Commissions apply to LayerNlooms custom engineering, web, mobile, and AI advisory services:
              </p>
              <p><strong>Qualifying Services include:</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Custom Software Development & Enterprise Portals</li>
                <li>Full-Stack Web Application Development (Next.js, React, Node.js)</li>
                <li>Native & Cross-Platform Mobile Applications (iOS, Android, React Native)</li>
                <li>AI & Machine Learning Solutions (LLMs, custom AI agents, RAG architectures)</li>
                <li>SaaS Product Engineering & Multi-tenant Platforms</li>
                <li>Cloud Infrastructure, DevOps & Container Orchestration (AWS, GCP, Azure)</li>
                <li>E-Commerce Engineering & Modern Headless Commerce</li>
                <li>Software Modernization & Technical Architecture Advisory</li>
              </ul>
              <p className="mt-3"><strong>Pass-Through Exclusions:</strong></p>
              <p className="text-muted-foreground">
                The commission calculation base explicitly excludes separately invoiced, pure third-party pass-through costs that do not constitute LayerNlooms software engineering fees. These include direct cloud infrastructure costs billed at cost (e.g., AWS, GCP, Azure hosting), third-party API usage tokens (e.g., direct OpenAI, Anthropic token consumption billed to client), purchased third-party software licenses, domain registrations, and pre-approved client-reimbursed travel expenses.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">7. Cancellations, Client Defaults & Refund Adjustments</h2>
              <p>
                Referral commissions are fundamentally contingent upon LayerNlooms actually receiving and retaining cleared funds from the client:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li><strong>No Receipt, No Commission:</strong> If a client defaults on payment, breaches their contract, or fails to settle invoices, no commission is payable on the uncollected amounts.</li>
                <li><strong>Scope Reductions & Partial Refunds:</strong> If an engagement scope is formally reduced or if a partial refund is issued to the client prior to completion, the Partner&rsquo;s commission will be calculated solely on the net retained service fee.</li>
                <li><strong>Clawback Provision:</strong> If LayerNlooms disburses commission for a payment that is subsequently charged back, reversed, or refunded due to client breach or legal dispute, LayerNlooms reserves the right to offset the excess amount against future partner payouts or request reimbursement.</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">8. Taxation, Invoicing & Indian Legal Compliance</h2>
              <p>
                Both parties agree to adhere strictly to applicable Indian and international tax statutes:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li><strong>Tax Deducted at Source (TDS):</strong> All commission payments made by LayerNlooms are subject to statutory withholding taxes, including TDS under Section 194H of the Indian Income Tax Act, 1961 (or equivalent applicable sections), at prevailing statutory rates. Partners must furnish a valid Permanent Account Number (PAN) prior to payment.</li>
                <li><strong>GST Registered Partners:</strong> Partners registered under the Goods and Services Tax (GST) Act must provide a valid GST invoice along with their GSTIN. Applicable GST will be paid in addition to the 10% commission amount upon receipt of a compliant tax invoice.</li>
                <li><strong>Unregistered Partners / Individuals:</strong> Partners not registered for GST will receive commission net of statutory TDS. The Partner bears sole responsibility for declaring income in their respective tax jurisdictions.</li>
              </ul>
            </div>

            {/* Section 9 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">9. Confidentiality & Non-Disclosure</h2>
              <p>
                During the term of this Agreement, Partners may gain access to non-public commercial, technical, and pricing information belonging to LayerNlooms or prospective clients. The Partner covenants that it shall keep all such information strictly confidential, shall not disclose it to any third party without prior written consent, and shall use it exclusively for the purposes of facilitating client introductions under this Agreement.
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">10. Term, Termination & Modifications</h2>
              <p>
                This Agreement commences upon the date of Partner application submission or initial accepted referral and continues until terminated:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li><strong>Termination for Convenience:</strong> Either party may terminate participation in the Partner Programme by providing thirty (30) days&rsquo; prior written notice via email.</li>
                <li><strong>Termination for Cause:</strong> LayerNlooms may terminate this Agreement immediately without notice if the Partner engages in fraudulent conduct, deceptive sales representations, intellectual property infringement, or conduct detrimental to LayerNlooms&rsquo; reputation.</li>
                <li><strong>Accrued Commission Rights:</strong> Termination shall not forfeit any verified commissions already accrued and payable for client contracts entered into prior to the effective date of termination.</li>
              </ul>
            </div>

            {/* Section 11 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">11. Governing Law & Jurisdiction</h2>
              <p>
                This Agreement, its interpretation, and any disputes arising out of or in connection with the Partner Programme shall be governed by and construed in accordance with the laws of the Republic of India.
              </p>
              <p>
                The parties irrevocably submit to the exclusive jurisdiction of the competent courts situated in <strong>Pune, Maharashtra, India</strong> to resolve any legal suit, action, or proceeding arising hereunder.
              </p>
            </div>

            {/* Section 12 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-sm prose prose-sm sm:prose-base dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-foreground mb-3">12. Official Partner Communications & Inquiries</h2>
              <p>
                For official correspondence, referral submissions, agreement notices, or commission inquiries, please communicate directly with our partnership office:
              </p>
              <div className="not-prose mt-4 p-4 rounded-xl border border-border bg-secondary/40 text-xs sm:text-sm space-y-1 text-muted-foreground">
                <p><strong className="text-foreground">LayerNlooms Partner Programme</strong></p>
                <p>Corporate Office: Pune, Maharashtra, India</p>
                <p>Official Website: <a href="https://layernlooms.com" target="_blank" rel="noopener noreferrer" className="text-accent-current hover:underline">https://layernlooms.com</a></p>
                <p>Partner Inquiries: <a href="mailto:contact@layernlooms.com" className="text-accent-current hover:underline">contact@layernlooms.com</a></p>
                <p>Executive Office: <a href="mailto:info@layernlooms.com" className="text-accent-current hover:underline">info@layernlooms.com</a></p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Action Cards */}
          <div className="mt-10 pt-8 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Return to Partner Programme Page
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/partner#calculator"
                className="inline-flex items-center gap-2 rounded-full border border-border/90 bg-card/80 px-5 py-2.5 text-xs sm:text-sm font-semibold text-foreground hover:bg-secondary/70 hover:border-accent-current/40 transition-all"
              >
                <Calculator className="size-4 text-accent-current" />
                Commission Calculator
              </Link>
              <Link
                href="/partner#register-partner"
                className="inline-flex items-center gap-2 rounded-full bg-accent-current px-5 py-2.5 text-xs sm:text-sm font-bold text-accent-current-foreground hover:opacity-90 transition-opacity shadow-sm"
              >
                <Handshake className="size-4" />
                Apply as Partner
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
