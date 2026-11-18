"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, Layers3, Sparkles } from "lucide-react";
import JsonLd, { getBreadcrumbSchema, getFAQPageSchema } from "@/app/components/JsonLd";


const plans = [
    {
        title: "Fixed Project",
        description: "Ideal for well-defined projects with clear scope",
        features: ["Custom scope", "Fixed timeline", "Predictable cost", "Full deliverables", "1 revision round", "Email support"],
        featured: false,
        cta: "Get Started",
    },
    {
        title: "Monthly Retainer",
        description: "Perfect for ongoing development and support",
        features: ["Dedicated team", "Flexible scope", "Priority support", "Continuous improvement", "Unlimited revisions", "Slack & call access"],
        featured: true,
        cta: "Start Retainer",
    },
    {
        title: "Hourly Engagement",
        description: "Best for consultations and flexible work",
        features: ["Pay as you go", "Expert guidance", "Flexible hours", "Advisory support", "No commitment", "Quick turnaround"],
        featured: false,
        cta: "Book Hours",
    },
];

const faqs = [
    { q: "Can I switch plans later?", a: "Yes, you can upgrade or change your engagement model at any time. We'll prorate any remaining balance." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, bank transfers, and invoicing for retainer clients." },
    { q: "Is there a minimum commitment for the retainer?", a: "We recommend a minimum of 3 months for the best results, but there's no hard lock-in." },
    { q: "Do you offer discounts for non-profits?", a: "Yes — reach out to our team and we'll discuss a custom arrangement that works for your organization." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? "border-accent-current/30 bg-card" : "border-border/80 bg-card/60 hover:border-accent-current/20"}`}>
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            >
                <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">{q}</span>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${open ? "bg-accent-current/10 text-accent-current" : "bg-secondary text-muted-foreground"}`}>
                    <ChevronDown className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <p className="border-t border-border/70 px-5 pb-5 pt-4 text-sm leading-7 text-muted-foreground sm:px-6">
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function PricingPage() {
    const reduceMotion = useReducedMotion();

    return (
        <main className="overflow-hidden bg-background text-foreground">
            <JsonLd
                data={[
                    getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Pricing", url: "/pricing" }]),
                    getFAQPageSchema(faqs.map((faq) => ({ question: faq.q, answer: faq.a }))),
                ]}
            />

            <section className=" rounded-2xl relative isolate overflow-hidden">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
                    <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
                    <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
                </div>
                <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-8 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_0.8fr] lg:gap-16 lg:px-12 lg:pb-20 lg:pt-20">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
                            <Layers3 className="size-3.5" />
                            Flexible ways to work together
                        </p>
                        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:mt-5 sm:text-6xl lg:text-7xl">
                            Clear options.
                            <span className="mt-1 block text-accent-current">Thoughtful work.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:mt-7 sm:text-base sm:leading-8">
                            Choose the engagement model that fits your scope, timeline, and team. Start with a conversation and find the right way forward.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href="#plans"
                                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                            >
                                Explore engagement models
                                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-6 text-sm font-bold text-foreground transition-colors hover:border-accent-current/40 hover:bg-accent-current/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                            >
                                Talk to our team
                                <ArrowUpRight className="size-4 text-accent-current" />
                            </Link>
                        </div>
                        <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">
                            <span>Fixed scope</span>
                            <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                            <span>Ongoing team</span>
                            <span aria-hidden="true" className="size-1 rounded-full bg-accent-current/60" />
                            <span>Flexible hours</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative mx-auto w-full max-w-md"
                    >
                        <div className="absolute -inset-8 rounded-full bg-accent-current/10 blur-[70px]" />
                        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-6 shadow-2xl shadow-foreground/5 backdrop-blur-xl sm:p-8">
                            <div className="flex items-center justify-between border-b border-border/70 pb-5">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Engagement guide</p>
                                    <h2 className="mt-1 text-lg font-semibold tracking-tight">A model for your momentum</h2>
                                </div>
                                <span className="grid size-10 place-items-center rounded-xl border border-accent-current/20 bg-accent-current/10 text-accent-current">
                                    <Sparkles className="size-5" />
                                </span>
                            </div>
                            <div className="mt-5 space-y-3">
                                {plans.map((plan, index) => (
                                    <div key={plan.title} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-background/70 p-4">
                                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-current/10 font-mono text-xs font-bold text-accent-current">
                                            0{index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold text-foreground">{plan.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-5 flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                                <Clock3 className="size-3.5 text-accent-current" />
                                Pick a starting point; we&apos;ll work through the details together.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CARDS ── */}
            <section id="plans" className="scroll-mt-24 px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col gap-3 border-b border-border/70 pb-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">Engagement models</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Choose how we build together</h2>
                        </div>
                        <p className="max-w-md text-xs leading-6 text-muted-foreground sm:text-right sm:text-sm">
                            Find the fit for a defined delivery, ongoing product work, or focused expert time.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
                    {plans.map((plan, i) => (
                        <motion.article
                            key={plan.title}
                            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: reduceMotion ? 0 : i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.2 } }}
                            className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl sm:p-7 ${
                                plan.featured
                                    ? "border-accent-current/35 bg-accent-current/[0.06] shadow-lg shadow-accent-current/5"
                                    : "border-border/80 bg-card"
                            }`}
                        >
                            {plan.featured && (
                                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 size-48 rounded-full bg-accent-current/10 blur-3xl" />
                            )}
                            <div>
                                <div className="flex min-h-7 items-center justify-between gap-3">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-accent-current">
                                        Model {String(i + 1).padStart(2, "0")}
                                    </p>
                                    {plan.featured && (
                                        <span className="rounded-full border border-accent-current/20 bg-accent-current/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-accent-current">
                                            Most popular
                                        </span>
                                    )}
                                </div>
                                <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                                    {plan.title}
                                </h3>
                                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="my-6 flex-1 space-y-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-current/10 text-accent-current">
                                            <Check className="size-3" strokeWidth={2.5} />
                                        </span>
                                        <span className="text-sm leading-6 text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/contact?plan=${encodeURIComponent(plan.title)}`}
                                className={`group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current ${
                                    plan.featured
                                        ? "bg-accent-current text-accent-current-foreground"
                                        : "bg-foreground text-background"
                                }`}
                            >
                                {plan.cta}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.article>
                    ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-6 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 border-y border-border/70 py-8 text-center md:grid-cols-4 md:py-10">
                    {[
                        { stat: "10+", label: "Projects delivered" },
                        { stat: "2+", label: "Years in business" },
                        { stat: "10+", label: "Team members" },
                        { stat: "98%", label: "Client satisfaction" },
                    ].map(({ stat, label }, index) => (
                        <motion.div
                            key={label}
                            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: reduceMotion ? 0 : index * 0.06 }}
                            className="group"
                        >
                            <p className="text-3xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-current sm:text-4xl">{stat}</p>
                            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:text-[10px]">{label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="px-4 py-12 sm:px-8 sm:py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">Good to know</p>
                        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-4xl">
                            A few things before we get started.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground">
                            Here are some answers to common questions about choosing an engagement model and working with our team.
                        </p>
                        <Link
                            href="/contact"
                            className="group mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-bold text-foreground transition-colors hover:text-accent-current"
                        >
                            Ask us a question
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((item) => (
                            <FAQItem key={item.q} q={item.q} a={item.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="px-4 pb-12 sm:px-8 sm:pb-20 lg:px-12">
                <motion.div
                    className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border/80 bg-card px-5 py-10 text-center sm:px-10 sm:py-16 lg:px-16"
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 -z-10 size-96 rounded-full bg-accent-current/10 blur-[100px]" />
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-20 -z-10 size-80 rounded-full bg-accent-current/5 blur-[90px]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">Start with a conversation</p>
                    <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-4xl">
                        Not sure which model fits your next move?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                        Book a free 30-minute consultation and we&apos;ll find the right fit together.
                    </p>
                    <Link
                        href="/contact?type=consultation"
                        className="group mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
                    >
                        Book a free call
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </section>
        </main>
    );
}

