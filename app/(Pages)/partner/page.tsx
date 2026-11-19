"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Handshake,
  Mail,
  Send,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  FileText,
} from "lucide-react";
import JsonLd, { getBreadcrumbSchema, getFAQPageSchema } from "@/app/components/JsonLd";

// ── Preset Project Amounts ──
const PRESET_AMOUNTS = [
  { label: "₹1,00,000", sublabel: "1 Lakh", value: 100000 },
  { label: "₹5,00,000", sublabel: "5 Lakhs", value: 500000 },
  { label: "₹10,00,000", sublabel: "10 Lakhs", value: 1000000 },
  { label: "₹25,00,000", sublabel: "25 Lakhs", value: 2500000 },
  { label: "₹50,00,000", sublabel: "50 Lakhs", value: 5000000 },
];

// ── 10 Comprehensive FAQs ──
const partnerFaqs = [
  {
    question: "Who is eligible to join the LayerNlooms Partner Programme?",
    answer:
      "Our programme is open to technology consultants, enterprise architects, digital marketing agencies, UI/UX design studios, freelance software engineers, startup advisors, and business network leaders. Anyone who regularly engages with companies requiring custom software, web platforms, mobile apps, or AI engineering can join. Participation is completely free, non-exclusive, and requires zero upfront fees or minimum quotas.",
  },
  {
    question: "How is the 10% partner commission calculated?",
    answer:
      "Partner commission is calculated as 10% on the net eligible service fee after separating the 18% statutory GST component (Eligible Service Fee = Gross Invoice Amount ÷ 1.18). For example, on a ₹10,00,000 project, the GST component (18% Statutory Tax) is ₹1,52,542, the eligible service fee is ₹8,47,458, and your 10% commission is ₹84,746. Internal developer salaries and agency overheads are never deducted.",
  },
  {
    question: "What are the two payout options (Turnkey vs. Milestone)?",
    answer:
      "We offer two flexible settlement structures: Option 01 (Turnkey Settlement) pays 100% of your commission in a single consolidated lump-sum within 14 business days following full project delivery and complete client payment. Option 02 (Milestone-Based Settlement) pays out pro-rata within 7 business days each time the client clears an agreed milestone invoice, providing regular cash flow throughout the project lifecycle.",
  },
  {
    question: "How does the 90-day lead protection and follow-on policy work?",
    answer:
      "Once LayerNlooms accepts your lead, the prospect is exclusively attributed to you for the entire active project lifecycle. In addition, our 90-day follow-on protection guarantees that if the same client signs any additional contract, scope expansion, or phase-two upgrade within 90 calendar days following delivery of the initial project, you automatically receive the identical 10% commission on that follow-on contract.",
  },
  {
    question: "Do I need to manage client communications, sales pitching, or technical delivery?",
    answer:
      "No. Your role is strictly introduction-only. You identify and introduce the prospect to LayerNlooms. Our executive leadership and engineering architects conduct all discovery meetings, technical scoping, proposal drafting, contract negotiations, software development, QA testing, and ongoing client management. You enjoy zero delivery obligations.",
  },
  {
    question: "Which LayerNlooms services qualify for the 10% referral commission?",
    answer:
      "All custom engineering and digital transformation services delivered by LayerNlooms are eligible. This includes Custom Software Development, Modern Web Application Development, Native and Cross-Platform Mobile Apps (iOS & Android), AI & Machine Learning Solutions (LLMs, AI agents, RAG), SaaS Product Engineering, Cloud Infrastructure & DevOps, E-Commerce Systems, and Legacy Software Modernization.",
  },
  {
    question: "Is there any minimum referral quota or joining fee?",
    answer:
      "None whatsoever. Joining the LayerNlooms Partner Programme is 100% free. There are no monthly or quarterly referral quotas, no maintenance fees, and no minimum commission payout thresholds. Whether you refer one project or twenty, every qualified deal receives identical commercial priority.",
  },
  {
    question: "What happens if a client cancels or receives a refund?",
    answer:
      "Commissions are paid solely on net service fees actually received and retained by LayerNlooms. If a client terminates an engagement early or receives a partial refund for unfulfilled work, your commission is adjusted pro-rata based on the non-refundable net fees retained for delivered work.",
  },
  {
    question: "How are statutory taxes (TDS and GST) handled on my payouts?",
    answer:
      "All payouts are disbursed directly via bank transfer (NEFT/RTGS/IMPS). In compliance with Indian tax regulations, statutory Tax Deducted at Source (TDS under Section 194H of the Income Tax Act) is deducted where applicable based on your PAN. If you or your organization is GST-registered, you can submit a valid GST invoice, and the applicable GST amount will be added to your payment.",
  },
  {
    question: "How do I register a prospective client and ensure attribution?",
    answer:
      "You can introduce a client by filling out the Partner Application Form on this page, or by emailing contact@layernlooms.com with the subject 'Partner Referral'. Our team performs a conflict check within 24 to 48 business hours to confirm the lead is not an active existing client, after which we issue a formal written Lead Acceptance Notice timestamping your attribution.",
  },
];

// ── Currency Formatter ──
function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val);
}

export default function PartnerPage() {
  const reduceMotion = useReducedMotion();

  // ── Calculator State ──
  const [projectAmount, setProjectAmount] = useState<number>(1000000);
  const [customInputValue, setCustomInputValue] = useState<string>("1000000");
  const eligibleServiceFee = Math.round(projectAmount / 1.18);
  const gstComponent = projectAmount - eligibleServiceFee;
  const partnerCommission = Math.round(eligibleServiceFee * 0.1);

  const handleSelectPreset = (value: number) => {
    setProjectAmount(value);
    setCustomInputValue(value.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setCustomInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setProjectAmount(parsed);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setProjectAmount(val);
    setCustomInputValue(val.toString());
  };

  const handleInputBlur = () => {
    const parsed = parseInt(customInputValue, 10);
    if (isNaN(parsed) || parsed < 100000) {
      setProjectAmount(100000);
      setCustomInputValue("100000");
    } else if (parsed > 20000000) {
      setProjectAmount(20000000);
      setCustomInputValue("20000000");
    }
  };

  // ── FAQ State ──
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ── Partner Form State ──
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    partnerType: "Technology Consultant / Advisor",
    company: "",
    payoutPreference: "Turnkey Settlement (14 Business Days)",
    message: "",
    agreedToTerms: false,
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const formId = useId();

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter your phone or WhatsApp number.");
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMessage("You must agree to the LayerNlooms Partner Terms & Conditions to proceed.");
      return;
    }

    setFormStatus("submitting");

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setErrorMessage(
          data.error || "Submission failed. Please try again or email us directly at contact@layernlooms.com."
        );
      }
    } catch (err) {
      console.error("Partner submission client error:", err);
      setFormStatus("error");
      setErrorMessage("Unable to connect to partner server. Please reach out to contact@layernlooms.com.");
    }
  };

  return (
    <main className=" rounded-2xl relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      {/* ── SEO JSON-LD Structured Data ── */}
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Partner Programme", url: "/partner" },
          ]),
          getFAQPageSchema(partnerFaqs),
        ]}
      />

      {/* ── Dynamic Theme Ambient Glows ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[140px]" />
        <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[120px]" />
      </div>

      <div className=" relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        {/* ========================================================= */}
        {/* SECTION 1: HERO SECTION (SPLIT 2-COLUMN)                  */}
        {/* ========================================================= */}
        <section className="pt-6 sm:pt-14 pb-16 sm:pb-24 border-b border-border/70">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading & CTAs */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-4">
                PARTNER PROGRAMME
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                Your Network <br />
                <span className="text-accent-current">Our Engineering</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Earn a flat 10% commission on every qualified referral. Introduce ambitious brands to LayerNlooms and
                let us handle technical scoping, architecture, and full-stack software delivery.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="#register-partner"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-current hover:opacity-90 text-accent-current-foreground px-7 py-3.5 text-sm font-bold shadow-sm transition-all duration-300 cursor-pointer"
                >
                  <Handshake className="size-4" />
                  Become a Partner
                </a>
                <Link
                  href="/partner-terms"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/90 bg-card/70 hover:bg-secondary/70 hover:border-accent-current/40 text-foreground px-6 py-3.5 text-sm font-semibold transition-all duration-300 cursor-pointer"
                >
                  <FileText className="size-4 text-accent-current" />
                  Partner Terms
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </Link>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-2 cursor-pointer"
                >
                  <Calculator className="size-4 text-accent-current" />
                  Calculate Earnings
                </a>
              </div>
            </motion.div>

            {/* Right Column: Sleek 3-Row Vertical Stats Panel */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border border-border/90 bg-card/80 dark:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/50 divide-y divide-border/80"
            >
              {/* Row 1: 10% */}
              <div className="pb-6">
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-accent-current">10%</p>
                <p className="text-sm font-bold text-foreground mt-1">Flat Referral Commission</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Calculated directly on eligible project service fees with zero overhead deductions.
                </p>
              </div>

              {/* Row 2: 02 */}
              <div className="py-6">
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-foreground">02</p>
                <p className="text-sm font-bold text-foreground mt-1">Payout Settlement Options</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose between 14-day Turnkey settlement or 7-day Milestone disbursements.
                </p>
              </div>

              {/* Row 3: 90 Days */}
              <div className="pt-6">
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-foreground">90 Days</p>
                <p className="text-sm font-bold text-foreground mt-1">Follow-On Lead Protection</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Active lifecycle attribution plus 90-day extension on any scope expansion or renewal.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: WHY PARTNER WITH LAYERNLOOMS? (4-CARD GRID)    */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 border-b border-border/70">
          <div className="mb-12 sm:mb-16">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              WHY LAYERNLOOMS?
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Why Partner with LayerNlooms?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              A transparent, high-yield referral programme built for technology consultants, agencies, and business leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Card 1: 10% */}
            <div className="p-7 sm:p-9 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-accent-current/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-accent-current">10%</span>
                <h3 className="text-lg font-bold text-foreground mt-3">10% Referral Reward</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Earn 10% directly on net project service fees after statutory 18% GST. Internal operational overhead,
                  engineering team salaries, and delivery margins are never deducted.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/70">
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-current hover:underline"
                >
                  Calculate Earnings
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: 14d / 7d */}
            <div className="p-7 sm:p-9 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-accent-current/40 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground">14d / 7d</span>
              <h3 className="text-lg font-bold text-foreground mt-3">Two Payout Options</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Choose between 14-day Turnkey settlement upon project sign-off or 7-day Milestone payouts as each phase invoice
                is cleared by the client.
              </p>
            </div>

            {/* Card 3: 90d+ */}
            <div className="p-7 sm:p-9 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-accent-current/40 transition-all duration-300">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-accent-current">90d+</span>
              <h3 className="text-lg font-bold text-foreground mt-3">Lead Protection</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Full active project lifecycle protection plus an additional 90-day extension on any follow-on contracts, scope
                expansions, or retainer renewals.
              </p>
            </div>

            {/* Card 4: Agency Integrity */}
            <div className="p-7 sm:p-9 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm hover:border-accent-current/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-foreground">Direct</span>
                <h3 className="text-lg font-bold text-foreground mt-3">Agency Integrity</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Direct partnership agreement with LayerNlooms executive founders. Clear written terms, zero intermediaries,
                  and no minimum payout accumulation thresholds.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/70">
                <Link
                  href="/partner-terms"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-current hover:underline"
                >
                  Read Partner Terms
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: ESTIMATE YOUR REFERRAL EARNINGS (CALCULATOR)    */}
        {/* ========================================================= */}
        <section id="calculator" className="py-16 sm:py-24 border-b border-border/70">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
            {/* Left Column: Title & Key Principles */}
            <div>
              <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
                COMMISSION CALCULATOR
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Estimate Your <br />
                Referral Earnings
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                See how much you can earn by introducing clients to LayerNlooms. Our commission structure is simple, direct,
                and completely transparent.
              </p>

              <div className="mt-8 space-y-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-accent-current shrink-0 mt-0.5" />
                  <span><strong>10% Commission Model:</strong> 10% calculated on net eligible service fee after statutory 18% GST (Gross ÷ 1.18).</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-accent-current shrink-0 mt-0.5" />
                  <span><strong>Zero Minimum Threshold:</strong> Payouts wired directly with no accumulation wait.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-accent-current shrink-0 mt-0.5" />
                  <span><strong>Two Payout Tracks:</strong> Turnkey (14 days) or Milestone-based (7 days).</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="size-4 text-accent-current shrink-0 mt-0.5" />
                  <span><strong>90-Day Extension:</strong> Earn on all follow-on contracts signed by the client.</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculator Box with Editable Input & Slider */}
            <div className="rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-black/50">
              {/* Presets Row */}
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  {PRESET_AMOUNTS.map((preset) => {
                    const isActive = projectAmount === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => handleSelectPreset(preset.value)}
                        className={`p-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer text-center ${
                          isActive
                            ? "bg-accent-current text-accent-current-foreground font-bold shadow-sm scale-[1.02]"
                            : "border border-border/80 bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-accent-current/30"
                        }`}
                      >
                        {preset.sublabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Project Value (Custom Amount) Box */}
              <div className="mb-6">
                <label
                  htmlFor="custom-calc-amount"
                  className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  EDITABLE PROJECT VALUE (CUSTOM AMOUNT)
                </label>

                {/* Big Input Box with Theme Accent Rupee */}
                <div className="flex items-center px-4 sm:px-6 py-4 rounded-xl border border-border bg-background focus-within:border-accent-current focus-within:ring-1 focus-within:ring-accent-current transition-all">
                  <span className="text-3xl sm:text-5xl font-extrabold font-mono text-accent-current mr-3 select-none">
                    ₹
                  </span>
                  <input
                    id="custom-calc-amount"
                    type="text"
                    inputMode="numeric"
                    value={customInputValue}
                    onChange={handleCustomInputChange}
                    onBlur={handleInputBlur}
                    placeholder="100000"
                    className="w-full bg-transparent border-none outline-none text-3xl sm:text-5xl font-extrabold font-mono text-foreground placeholder-muted-foreground focus:ring-0 p-0 tracking-tight"
                  />
                </div>

                {/* Min & Max Labels */}
                <div className="flex items-center justify-between text-xs font-mono mt-3 mb-2">
                  <span className="text-accent-current font-medium font-mono">₹1,00,000 (Min)</span>
                  <span className="text-accent-current font-medium font-mono">₹2,00,00,000 (Max)</span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={100000}
                  max={20000000}
                  step={50000}
                  value={Math.min(projectAmount, 20000000)}
                  onChange={handleSliderChange}
                  className="w-full accent-accent-current h-2 bg-secondary rounded-lg cursor-pointer"
                />
              </div>

              {/* Summary Rows */}
              <div className="space-y-2.5 py-4 border-t border-border/80 text-xs sm:text-sm font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Project Value</span>
                  <span className="text-foreground font-semibold">{formatINR(projectAmount)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST Component (18% Statutory Tax)</span>
                  <span className="text-foreground/90 font-medium">- {formatINR(gstComponent)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Eligible Service Fee</span>
                  <span className="text-foreground font-semibold">{formatINR(eligibleServiceFee)}</span>
                </div>
              </div>

              {/* Big Highlighted Commission Output Box */}
              <div className="mt-2 p-5 rounded-2xl border border-border/80 bg-secondary/40 text-center">
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
                  Partner Commission (10%)
                </p>
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-accent-current">
                  {formatINR(partnerCommission)}
                </p>
              </div>

              {/* Payout preview strip */}
              <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span>Option 01: Turnkey (14d)</span>
                <span>Option 02: Milestone (7d)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: CHOOSE HOW YOU GET PAID (2 PAYOUT CARDS)        */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 border-b border-border/70">
          <div className="mb-12 sm:mb-16">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              SETTLEMENT SCHEDULES
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Choose How You Get Paid
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Select the payout structure that best aligns with your financial planning and client project style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 14 Days Turnkey */}
            <div className="p-7 sm:p-9 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-foreground mb-2">14 Days</p>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  OPTION 01 — FULL PROJECT DELIVERY (TURNKEY)
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ideal for fixed-scope software deliverables and rapid MVPs. Receive 100% of your commission in a single
                  consolidated lump sum within 14 business days of project sign-off and complete payment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/80 text-xs font-mono text-muted-foreground">
                • 100% single lump-sum transfer • Disbursed in 14 business days • Zero minimum threshold
              </div>
            </div>

            {/* Card 2: 7 Days Milestone */}
            <div className="p-7 sm:p-9 rounded-3xl border border-accent-current/40 bg-card/70 backdrop-blur-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-accent-current text-accent-current-foreground text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                POPULAR
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold font-mono text-accent-current mb-2">7 Days</p>
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-current mb-4">
                  OPTION 02 — MILESTONE-BASED DELIVERY
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Ideal for multi-phase enterprise architectures, AI integrations, and ongoing retainers. Receive 10% commission
                  incrementally within 7 business days each time the client clears an agreed milestone invoice.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/80 text-xs font-mono text-muted-foreground">
                • Pro-rata phased payouts • Disbursed in 7 business days per cleared invoice • Continuous cash flow
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: LEAD PROTECTION ACROSS TWO HORIZONS (2 CARDS)  */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 border-b border-border/70">
          <div className="mb-12 sm:mb-16">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              ATTRIBUTION GUARANTEE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Lead Protection Across Two Horizons
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              We protect your client relationships through two distinct commercial horizons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Horizon 01 */}
            <div className="p-7 sm:p-9 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-3">
                HORIZON 01 — ACTIVE BUILD
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Once your referral is accepted, the client is exclusively attributed to you throughout the entire sales,
                negotiation, and delivery lifecycle. Whether the project takes 4 weeks or 6 months, your 10% attribution
                remains 100% locked.
              </p>
            </div>

            {/* Horizon 02 */}
            <div className="p-7 sm:p-9 rounded-3xl border border-accent-current/40 bg-card/70 backdrop-blur-sm">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-current mb-3">
                HORIZON 02 — 90-DAY EXTENSION
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Attribution doesn&apos;t end at project handover. Any follow-on development contracts, scope expansions, retainer
                renewals, or phase-two roadmaps signed by that client within 90 calendar days following delivery completion
                earn you the same 10% commission.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: A TRANSPARENT & COMPLIANT MODEL (GOVERNANCE)   */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 border-b border-border/70">
          <div className="mb-12 sm:mb-16">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              CORPORATE GOVERNANCE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              A Transparent & Compliant Model
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl">
              Clear, ethical rules governing commission eligibility, payment accountability, and independent status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="p-7 sm:p-9 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Payment Responsibility & Direct Accountability
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Commissions are disbursed directly by <strong>LayerNlooms</strong> via electronic bank transfer. We take full
                  financial accountability without intermediaries. Commission is payable on service fees actually received and
                  retained by the Company.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">Settlement Policy</span>
                <Link
                  href="/partner-terms"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-current hover:underline"
                >
                  Partner Terms
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-7 sm:p-9 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Partner Independence & Compliance
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Partners act as independent introducers, not employees or sales agents. There are no sales quotas or
                  exclusivity lock-ins. All disbursements adhere to statutory Indian tax laws (TDS Section 194H / GST invoicing).
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between">
                <span className="text-[11px] font-mono text-muted-foreground">Governance Terms</span>
                <Link
                  href="/partner-terms"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-current hover:underline"
                >
                  Partner Terms
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: FREQUENTLY ASKED QUESTIONS                     */}
        {/* ========================================================= */}
        <section className="py-16 sm:py-24 border-b border-border/70">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Everything you need to know about partnering with LayerNlooms.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {partnerFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-accent-current/40 bg-card shadow-sm"
                      : "border-border/80 bg-card/60 hover:border-accent-current/20"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold tracking-tight text-foreground">
                      {index + 1}. {faq.question}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-accent-current/15 text-accent-current"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-border/80 px-5 pb-5 pt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground sm:px-6">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 8: JOIN THE PARTNER NETWORK (APPLICATION FORM)    */}
        {/* ========================================================= */}
        <section id="register-partner" className="py-16 sm:py-24 border-b border-border/70">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-2">
              APPLICATION
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Join the Partner Network
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Submit your details below to register as an official LayerNlooms referral partner.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Link
                href="/partner-terms"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent-current px-3 py-1.5 rounded-full border border-border/80 bg-secondary/50 transition-colors"
              >
                <FileText className="size-3.5 text-accent-current" />
                Review Partner Terms & Conditions
                <ArrowUpRight className="size-3 text-muted-foreground" />
              </Link>
            </div>
          </div>

          <div className="max-w-2xl mx-auto rounded-3xl border border-border/90 bg-card/85 backdrop-blur-md p-6 sm:p-10 shadow-xl shadow-black/5 dark:shadow-black/50">
            {formStatus === "success" ? (
              <div className="text-center py-8">
                <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-500 grid place-items-center mx-auto mb-5">
                  <CheckCircle2 className="size-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Application Received!</h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Thank you for applying to the LayerNlooms Partner Programme, <strong>{formData.fullName}</strong>. We have
                  received your profile and referral interests.
                </p>

                <div className="my-6 p-4 rounded-2xl border border-border/80 bg-secondary/50 text-left text-xs sm:text-sm text-muted-foreground space-y-2 max-w-md mx-auto">
                  <p className="font-semibold text-foreground">What happens next?</p>
                  <p>1. Our executive team reviews your application within 24–48 business hours.</p>
                  <p>2. You will receive an official onboarding confirmation & partner channel access via email.</p>
                  <p>3. Introduce your first client opportunity to lock in your 10% referral commission.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFormStatus("idle");
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      partnerType: "Technology Consultant / Advisor",
                      company: "",
                      payoutPreference: "Turnkey Settlement (14 Business Days)",
                      message: "",
                      agreedToTerms: false,
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                {formStatus === "error" && errorMessage && (
                  <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="size-5 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label htmlFor={`${formId}-fullName`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Full Name <span className="text-accent-current">*</span>
                  </label>
                  <input
                    id={`${formId}-fullName`}
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleFormChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${formId}-email`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Work Email <span className="text-accent-current">*</span>
                    </label>
                    <input
                      id={`${formId}-email`}
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Phone / WhatsApp <span className="text-accent-current">*</span>
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all"
                    />
                  </div>
                </div>

                {/* Partner Classification & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${formId}-partnerType`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Partner Classification
                    </label>
                    <select
                      id={`${formId}-partnerType`}
                      name="partnerType"
                      value={formData.partnerType}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all cursor-pointer"
                    >
                      <option value="Technology Consultant / Advisor">Technology Consultant / Advisor</option>
                      <option value="Digital Agency / Studio Owner">Digital Agency / Studio Owner</option>
                      <option value="Freelance Engineer / Designer">Freelance Engineer / Designer</option>
                      <option value="Enterprise Executive / Director">Enterprise Executive / Director</option>
                      <option value="Startup Investor / Incubator">Startup Investor / Incubator</option>
                      <option value="Other">Other Strategic Partner</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-company`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                      Company / Organization <span className="text-muted-foreground font-normal">(Optional)</span>
                    </label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      placeholder="e.g. Apex Advisory"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all"
                    />
                  </div>
                </div>

                {/* Message / Lead Details */}
                <div>
                  <label htmlFor={`${formId}-message`} className="block text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                    Referral Details or Partnership Goals <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about the clients you typically work with or specific prospective projects you'd like to introduce..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-accent-current focus:border-accent-current transition-all"
                  />
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id={`${formId}-terms`}
                    type="checkbox"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleFormChange}
                    required
                    className="size-4.5 rounded border border-border accent-accent-current mt-0.5 cursor-pointer"
                  />
                  <label htmlFor={`${formId}-terms`} className="text-xs text-muted-foreground cursor-pointer leading-normal">
                    I understand and agree to the{" "}
                    <Link href="/partner-terms" target="_blank" className="text-accent-current hover:underline font-semibold">
                      LayerNlooms Partner Programme Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-accent-current hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                    . I acknowledge the 10% commission calculation and introduction-only scope.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-current hover:opacity-90 py-3.5 px-6 text-sm font-bold text-accent-current-foreground shadow-sm disabled:opacity-50 transition-all cursor-pointer"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Send className="size-4" />
                      Become a Partner
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 9: READY TO GET STARTED? (FINAL CTA)              */}
        {/* ========================================================= */}
        <section className="mt-16 sm:mt-24 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md p-8 sm:p-14 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-current mb-3">
              GET STARTED
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Monetize your network by introducing high-value software and AI opportunities to LayerNlooms.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#register-partner"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-current hover:opacity-90 px-8 py-3.5 text-sm font-bold text-accent-current-foreground shadow-sm transition-all cursor-pointer"
              >
                <Handshake className="size-4" />
                Become a Partner
              </a>
              <Link
                href="/partner-terms"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/90 bg-card/80 hover:bg-secondary/70 hover:border-accent-current/40 px-7 py-3.5 text-sm font-semibold text-foreground transition-all cursor-pointer"
              >
                <FileText className="size-4 text-accent-current" />
                Partner Terms
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
              <a
                href="mailto:contact@layernlooms.com?subject=Partner%20Programme%20Inquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-secondary/50 hover:bg-secondary hover:border-accent-current/40 px-5 py-3.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              >
                <Mail className="size-4 text-accent-current" />
                contact@layernlooms.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
