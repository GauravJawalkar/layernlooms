"use client";

import { motion } from "framer-motion";
import ContactForm from "../../components/Contact/ContactForm";
import { StepsCard } from "../../components/Contact/ContactCard";
import { Linkedin, Facebook, Twitter, Instagram, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/layernlooms", color: "hover:text-[#0077b5]" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/layernlooms", color: "hover:text-[#1877f2]" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-[#1da1f2]" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-[#e4405f]" },
];

const contactInfo = [
    { icon: Mail, label: "Email", value: "info@layernlooms.com", href: "mailto:info@layernlooms.com" },
    { icon: Phone, label: "Phone", value: "+91 9730516224", href: "tel:+919730516224" },
    { icon: MapPin, label: "Location", value: "Pune, Maharashtra, India", href: null },
];

export default function ContactPage() {
    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <div className="min-h-screen bg-background selection:bg-primary selection:text-background">
            {/* ── Background Elements ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] opacity-30" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="max-w-4xl mb-10 sm:mb-14"
                >


                    <motion.h1
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]"
                    >
                        <span className="text-reflect">
                            Let&apos;s build
                            <br />
                            <span className="text-textMuted/50">something</span>{" "}
                            <span className="text-primary">great</span>
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="text-sm sm:text-base md:text-lg text-textMuted max-w-2xl mt-4 leading-relaxed"
                    >
                        Have a vision? We have the engineering expertise to bring it to life.
                        Tell us about your project and we&apos;ll get back to you within 24 hours.
                    </motion.p>
                </motion.div>

                {/* ── Main Content Grid ── */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
                >
                    {/* ── Left Column: Form ── */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-7 order-2 lg:order-1"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 rounded-[3rem] blur-3xl opacity-80" />
                            <div className="relative">
                                <ContactForm />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Right Column: Info ── */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 sm:space-y-8">
                        {/* Contact Cards */}
                        <motion.div variants={fadeUp} className="space-y-4">
                            {contactInfo.map((info, i) => {
                                const Icon = info.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-secondary rounded-full blur-3xl -mr-8 -mt-8 opacity-50 group-hover:opacity-80 transition-opacity" />
                                        <div className="relative flex items-center gap-4">
                                            <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-secondary text-textMuted group-hover:bg-primary group-hover:text-background transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted mb-0.5">{info.label}</p>
                                                {info.href ? (
                                                    <Link
                                                        href={info.href}
                                                        className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-2 break-all"
                                                    >
                                                        {info.value}
                                                        <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" />
                                                    </Link>
                                                ) : (
                                                    <p className="text-sm sm:text-base font-semibold text-foreground">{info.value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeUp} className="p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-border bg-card/50 backdrop-blur-sm">
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted mb-4">Follow Us</p>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-secondary border border-border shadow-sm transition-all duration-300 group ${social.color}`}
                                    >
                                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 text-foreground" />
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
