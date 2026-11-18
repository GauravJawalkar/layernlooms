"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
    service: {
        slug: string;
        title: string;
        subtitle: string;
        description: string;
        features: string[];
        image: string;
    };
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <Link
            href={`/services/${service.slug}`}
            className="group flex h-full w-full no-snap rounded-[2rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-current"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-current/35 hover:shadow-xl"
            >
                {/* Image Section */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-border/70 bg-secondary/60">
                    <Image
                        src={service.image || "/services/01-custom-software.svg"}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center grayscale contrast-110 invert transition-transform duration-700 ease-out group-hover:scale-105 dark:invert-0"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground shadow-sm backdrop-blur-md">
                        <span className="text-accent-current">{String(index + 1).padStart(2, "0")}</span>
                        Service
                    </div>
                    <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-border/70 bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors group-hover:border-accent-current/30 group-hover:bg-accent-current group-hover:text-accent-current-foreground">
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 sm:p-8 grow relative z-10">
                    <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-current">
                        {service.title}
                    </h3>

                    <p className="mt-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                        {service.subtitle}
                    </p>

                    <p className="mt-3 line-clamp-3 text-xs font-medium leading-relaxed text-muted-foreground sm:text-sm">
                        {service.description}
                    </p>
                </div>

                {/* Link */}
                <div className="relative z-10 mt-auto px-5 pb-5 sm:px-8 sm:pb-8">
                    <div className="mb-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="inline-flex items-center text-sm font-bold text-muted-foreground transition-colors group-hover:text-accent-current">
                        Explore capability
                        <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
