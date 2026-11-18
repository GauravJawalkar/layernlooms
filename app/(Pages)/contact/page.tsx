"use client";

import { Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    const reduceMotion = useReducedMotion();
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
        <main className=" rounded-2xl relative isolate min-h-screen overflow-hidden bg-background text-foreground">
            <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }])} />

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
                <div className="absolute -right-36 -top-32 size-[min(75vw,54rem)] rounded-full bg-accent-current/10 blur-[130px]" />
                <div className="absolute -bottom-48 -left-40 size-[min(55vw,34rem)] rounded-full bg-accent-current/5 blur-[110px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12 lg:pb-24 lg:pt-10">
                <motion.div
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    variants={stagger}
                    className="mb-8 max-w-4xl sm:mb-14"
                >
                    <motion.div variants={fadeUp} className="mb-4 sm:mb-5 flex items-center gap-3">
                        <span aria-hidden="true" className="h-px w-8 bg-accent-current" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-current">
                            Get in Touch
                        </p>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
                    >
                        Let&apos;s build something{" "}
                        <span className="text-accent-current">great.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-6 sm:text-base sm:leading-8"
                    >
                        Have a vision? Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    variants={stagger}
                    className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-8"
                >
                    <motion.div
                        variants={fadeUp}
                        className="min-w-0"
                    >
                        <Suspense fallback={<div className="h-[34rem] w-full animate-pulse rounded-3xl border border-border/80 bg-card" />}>
                            <ContactForm />
                        </Suspense>
                    </motion.div>

                    <div className="min-w-0 space-y-4 lg:space-y-5">
                        <motion.div variants={fadeUp} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            {contactInfo.map((info, i) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={info.label}
                                        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.06 }}
                                        className="group rounded-2xl border border-border/80 bg-card/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-current/30 hover:shadow-lg sm:p-5"
                                    >
                                        <div className="flex min-w-0 items-center gap-3.5">
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent-current/15 bg-accent-current/10 text-accent-current transition-colors duration-300 group-hover:bg-accent-current group-hover:text-accent-current-foreground">
                                                <Icon className="size-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{info.label}</p>
                                                {info.href ? (
                                                    <Link
                                                        href={info.href}
                                                        target={info.href.startsWith("http") ? "_blank" : undefined}
                                                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                        className="flex items-center gap-1.5 break-words text-sm font-semibold text-foreground transition-colors hover:text-accent-current"
                                                    >
                                                        {info.value}
                                                        <ArrowUpRight className="size-3.5 shrink-0 text-accent-current opacity-0 transition-opacity group-hover:opacity-100" />
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

                        <motion.div variants={fadeUp} className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm sm:p-6">
                            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Follow Us</p>
                            <div className="flex flex-wrap gap-2">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex size-10 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground transition-all duration-300 hover:border-accent-current/30 hover:bg-accent-current/10 hover:text-accent-current"
                                    >
                                        <social.icon className="size-4" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <StepsCard />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
