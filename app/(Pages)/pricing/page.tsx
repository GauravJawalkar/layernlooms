"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";


const plans = [
    {
        title: "Fixed Project",
        description: "Ideal for well-defined projects with clear scope",
        price: "$2,999",
        period: "per project",
        features: ["Custom scope", "Fixed timeline", "Predictable cost", "Full deliverables", "1 revision round", "Email support"],
        featured: false,
        cta: "Get Started",
    },
    {
        title: "Monthly Retainer",
        description: "Perfect for ongoing development and support",
        price: "$4,999",
        period: "per month",
        features: ["Dedicated team", "Flexible scope", "Priority support", "Continuous improvement", "Unlimited revisions", "Slack & call access"],
        featured: true,
        cta: "Start Retainer",
    },
    {
        title: "Hourly Engagement",
        description: "Best for consultations and flexible work",
        price: "$149",
        period: "per hour",
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
        <motion.div
            className="border-b py-5 cursor-pointer transition-colors duration-300 border-border"
            onClick={() => setOpen(!open)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center gap-4">
                <span className="text-base font-bold transition-colors duration-300 text-foreground">{q}</span>
                <motion.span
                    className="text-xl transition-colors duration-300 text-textMuted"
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    +
                </motion.span>
            </div>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0, marginTop: open ? 12 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <p className="text-sm leading-relaxed transition-colors duration-300 text-textMuted">{a}</p>
            </motion.div>
        </motion.div>
    );
}

export default function PricingPage() {
    const heroRef = useRef(null);
    const cardsRef = useRef(null);
    const trustRef = useRef(null);
    const faqRef = useRef(null);

    const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });
    const isCardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
    const isTrustInView = useInView(trustRef, { once: true, amount: 0.1 });
    const isFaqInView = useInView(faqRef, { once: true, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const } }),
    };

    return (
        <main className="w-full min-h-screen transition-colors duration-300 bg-background">

            {/* ── HERO ── */}
            <section ref={heroRef} className="pt-24 pb-4 text-center px-6">
                <motion.div variants={containerVariants} initial="hidden" animate={isHeroInView ? "visible" : "hidden"}>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4 transition-colors duration-300 text-foreground">
                        Engagement Models
                    </h1>
                    <motion.div
                        className="mx-auto h-1 rounded-full mb-6 bg-primary"
                        initial={{ width: 0 }}
                        animate={isHeroInView ? { width: 80 } : { width: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <p className="text-lg max-w-xl mx-auto transition-colors duration-300 text-textMuted">
                        Choose the model that works best for your project needs.
                    </p>
                </motion.div>
            </section>

            {/* ── CARDS ── */}
            <section ref={cardsRef} className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isCardsInView ? "visible" : "hidden"}
                            className={`rounded-2xl p-8 flex flex-col gap-6 transition-colors duration-300 ${plan.featured
                                ? "bg-primary text-background scale-105 shadow-2xl z-10"
                                : "bg-card border border-border shadow-sm hover:shadow-lg text-foreground"
                                }`}
                            whileHover={!plan.featured ? { y: -4, transition: { duration: 0.2 } } : {}}
                        >
                            <div>
                                {plan.featured && (
                                    <motion.span
                                        className="inline-block text-xs font-bold tracking-widest uppercase mb-3 opacity-60"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isCardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                                    >
                                        Most Popular
                                    </motion.span>
                                )}
                                <h2 className={`text-2xl font-black mb-2 ${plan.featured ? "text-background" : "text-foreground"}`}>{plan.title}</h2>
                                <p className={`text-sm leading-relaxed ${plan.featured ? "opacity-80" : "text-textMuted"}`}>{plan.description}</p>
                            </div>

                            <ul className="space-y-3 flex-1">
                                {plan.features.map((f, idx) => (
                                    <motion.li
                                        key={f}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isCardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 + idx * 0.05 + 0.3 }}
                                    >
                                        {/* check icon */}
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                                            <path d="M3 8.5L6.5 12L13 5"
                                                stroke="currentColor"
                                                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className={`text-sm font-medium ${plan.featured ? "text-background" : "text-foreground/80"}`}>{f}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                className={`w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${plan.featured
                                    ? "bg-background text-foreground hover:opacity-90"
                                    : "bg-primary text-background hover:opacity-90"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.cta}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── TRUST BAR ── */}
            <section ref={trustRef} className="py-10 px-6">
                <motion.div
                    className="max-w-4xl mx-auto rounded-2xl px-10 py-8 shadow-sm flex flex-col md:flex-row items-center justify-around gap-8 text-center border border-border transition-colors duration-300 bg-secondary"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isTrustInView ? "visible" : "hidden"}
                >
                    {[
                        { stat: "200+", label: "Projects Delivered" },
                        { stat: "98%", label: "Client Satisfaction" },
                        { stat: "5 yrs", label: "Industry Experience" },
                        { stat: "24/7", label: "Support Available" },
                    ].map(({ stat, label }, i) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isTrustInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className="text-3xl font-black transition-colors duration-300 text-foreground">{stat}</div>
                            <div className="text-xs mt-1 tracking-wide uppercase transition-colors duration-300 text-textMuted">{label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── FAQ ── */}
            <section ref={faqRef} className="py-16 px-6">
                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isFaqInView ? "visible" : "hidden"}
                >
                    <h2 className="text-3xl font-black mb-2 text-center transition-colors duration-300 text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-center mb-10 transition-colors duration-300 text-textMuted">
                        Everything you need to know before getting started.
                    </p>
                    {faqs.map((item) => (
                        <FAQItem key={item.q} q={item.q} a={item.a} />
                    ))}
                </motion.div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="py-16 px-6">
                <motion.div
                    className="max-w-4xl mx-auto rounded-3xl px-10 py-14 text-center transition-colors duration-300 bg-primary"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl font-black mb-3 text-background">
                        Not sure which plan fits?
                    </h2>
                    <p className="text-base mb-8 opacity-60 text-background">
                        Book a free 30-minute consultation and we'll find the right fit together.
                    </p>
                    <motion.button
                        className="px-8 py-3 rounded-xl font-bold text-sm transition-colors duration-200 bg-background text-foreground hover:opacity-90"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Book a Free Call
                    </motion.button>
                </motion.div>
            </section>
        </main>
    );
}
