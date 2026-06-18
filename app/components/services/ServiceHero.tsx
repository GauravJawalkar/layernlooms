"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Service } from "@/app/data/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";

interface ServiceHeroProps {
    service: Service;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
    const router = useRouter();

    return (
        <section className="relative overflow-hidden bg-background border-b border-border">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/50 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 py-10 sm:py-14 lg:py-16">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-textMuted hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-border mb-5">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted">Our Service</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
                            {service.title}
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-foreground/80 font-medium">
                            {service.subtitle}
                        </p>

                        <p className="mt-4 text-sm sm:text-base text-textMuted leading-relaxed max-w-xl">
                            {service.longDescription}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-primary/20 hover:opacity-90 transition-all duration-300"
                            >
                                Get Started
                                <ArrowLeft className="h-4 w-4 rotate-180" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center rounded-full bg-card border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                            >
                                View All Services
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="order-1 lg:order-2"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-3 bg-gradient-to-tr from-primary/15 via-transparent to-secondary/30 rounded-[2rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative h-52 sm:h-64 md:h-72 w-full rounded-2xl overflow-hidden shadow-xl border border-border">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
