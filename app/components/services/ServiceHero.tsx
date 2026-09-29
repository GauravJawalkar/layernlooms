"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";

import Image from "next/image";

interface ServiceHeroProps {
    service: {
        slug: string;
        title: string;
        subtitle: string;
        longDescription: string;
        image: string;
    };
}

export default function ServiceHero({ service }: ServiceHeroProps) {
    const router = useRouter();

    return (
        <section className="relative overflow-hidden bg-background text-foreground border-b border-border pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-24">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-foreground/[0.03] rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/[0.02] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
                <div className="absolute inset-0 bg-grid-foreground/[0.02] bg-[length:32px_32px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 sm:mb-8"
                >
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/30 hover:bg-card/80 backdrop-blur-md text-muted-foreground hover:text-foreground transition-all group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs sm:text-sm font-medium">Back to Services</span>
                    </button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-current/10 border border-accent-current/20 mb-6 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 text-accent-current" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-current">Specialized Domain</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-foreground leading-[1.1] mb-6">
                            {service.title}
                        </h1>

                        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium mb-6">
                            {service.subtitle}
                        </p>

                        <div className="w-16 h-0.5 bg-foreground/20 mb-6 rounded-full" />

                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                            {service.longDescription}
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                            <Link
                                href="/contact"
                                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-4 text-sm font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                            >
                                Initiate Project
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/portfolio"
                                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-transparent border border-border/50 px-8 py-4 text-sm font-bold text-foreground hover:bg-card hover:border-foreground/50 transition-all"
                            >
                                Technical Case Studies
                            </Link>
                        </div>
                    </motion.div>

                    {/* 3D Image Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] xl:aspect-[16/11] flex items-center justify-center rounded-[2.5rem] overflow-hidden border border-border/40 bg-card/20 shadow-2xl order-1 lg:order-2 group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-0 bg-grid-foreground/[0.02] bg-[length:24px_24px] z-10 pointer-events-none" />
                        <Image
                            src={service.image || "/web-dev-bw.jpg"}
                            alt={service.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                        {/* Soft Glow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] z-10 pointer-events-none rounded-[2.5rem]" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

