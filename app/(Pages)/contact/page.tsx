"use client";

import { motion } from "framer-motion";
import ContactForm from "../../components/Contact/ContactForm";
import { StepsCard } from "../../components/Contact/ContactCard";
import { Linkedin, Instagram, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";
import { GoogleIcon, WhatsAppIcon, XIcon } from "@/app/components/Icons";

const socialLinks = [
    { name: "X", icon: XIcon, href: "https://x.com/Layernlooms" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/layernlooms" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/layernlooms" },
    { name: "Google Business", icon: GoogleIcon, href: "https://share.google/S46H7wVpxAKJO4Eom" },
    { name: "WhatsApp", icon: WhatsAppIcon, href: "https://wa.me/9511864578" },
];

const contactInfo = [
    { icon: Mail, label: "Email", value: "info@layernlooms.com", href: "mailto:info@layernlooms.com" },
    { icon: Phone, label: "Phone", value: "+91 9730516224", href: "tel:+919730516224" },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "+91 9511864578", href: "https://wa.me/9511864578" },
    { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India", href: "https://share.google/S46H7wVpxAKJO4Eom" },
];

export default function ContactPage() {
    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.15 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <div className="accent-zinc-scope min-h-screen bg-background selection:bg-primary selection:text-background">
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />

            {/* ── Background: subtle noise only ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-14 sm:pt-20 pb-16 sm:pb-24">
                {/* ── Header ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-3xl mb-10 sm:mb-16"
                >
                    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                        <span className="w-8 h-px bg-primary" />
                        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                            Get in Touch
                        </p>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
                    >
                        <span className="text-reflect">
                            Let&apos;s build something{" "}
                            <span className="text-muted-foreground/50">great</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-sm sm:text-base text-muted-foreground max-w-xl mt-5 leading-relaxed"
                    >
                        Have a vision? Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </motion.p>
                </motion.div>

                {/* ── Main Content Grid ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
                >
                    {/* ── Left Column: Form ── */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-7 order-2 lg:order-1"
                    >
                        <ContactForm />
                    </motion.div>

                    {/* ── Right Column: Info ── */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                        {/* Contact Cards */}
                        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            {contactInfo.map((info, i) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="group rounded-xl border border-border bg-card p-4 sm:p-5 hover:border-primary/30 transition-colors duration-300"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary text-muted-foreground flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-0.5">{info.label}</p>
                                                {info.href ? (
                                                    <Link
                                                        href={info.href}
                                                        target={info.href.startsWith("http") ? "_blank" : undefined}
                                                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 break-all"
                                                    >
                                                        {info.value}
                                                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                ) : (
                                                    <p className="text-sm font-semibold text-foreground">{info.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeUp} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3.5">Follow Us</p>
                            <div className="flex flex-wrap gap-2.5">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-border text-foreground hover:bg-primary hover:text-background transition-colors duration-300"
                                    >
                                        <social.icon className="w-4 h-4" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        {/* Steps / Process */}
                        <motion.div variants={fadeUp}>
                            <StepsCard />
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
