"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Service } from "../../data/services";


interface ServiceCardProps {
    service: Service;
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    return (
        <Link href={`/services/${service.slug}`} className="w-full h-full flex no-snap">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-white/[0.05] bg-white/60 dark:bg-white/[0.02] backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/[0.05] hover:border-neutral-300 dark:hover:border-white/[0.12] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] justify-between"
            >
                <div>
                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-100/50 dark:bg-white/[0.02] border-b border-neutral-200/30 dark:border-white/[0.05]">
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col p-6">
                        <h3 className="text-xl font-semibold text-foreground">
                            {service.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-foreground/80">
                            {service.subtitle}
                        </p>

                        <p className="mt-3 text-sm line-clamp-3 text-textMuted">
                            {service.description}
                        </p>

                        {/* Features Preview */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {service.features.slice(0, 2).map((feature) => (
                                <span
                                    key={feature}
                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/50 dark:border-white/[0.08] text-textMuted"
                                >
                                    {feature}
                                </span>
                            ))}
                            {service.features.length > 2 && (
                                <span
                                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/50 dark:border-white/[0.08] text-textMuted/70"
                                >
                                    +{service.features.length - 2} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Link */}
                <div className="px-6 pb-6 mt-2">
                    <div
                        className="inline-flex items-center text-sm font-semibold transition-colors group/link text-neutral-800 dark:text-neutral-200 hover:text-primary dark:hover:text-white"
                    >
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
