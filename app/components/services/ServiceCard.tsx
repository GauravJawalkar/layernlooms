"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Service3DModel from "./Service3DModel";
import { useState } from "react";

interface ServiceCardProps {
    service: {
        slug: string;
        title: string;
        subtitle: string;
        description: string;
        features: string[];
    };
    index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/services/${service.slug}`} className="w-full h-full flex no-snap">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] justify-between"
            >
                {/* 3D Model Section */}
                <div className="relative h-48 sm:h-64 w-full bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-white/5">
                    <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:24px_24px]" />
                    <Service3DModel slug={service.slug} className="transition-transform duration-700 ease-out group-hover:scale-110" />
                    
                    {/* Glowing orb effect on hover */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col p-6 sm:p-8 grow relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-zinc-200 transition-colors duration-300">
                        {service.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-semibold text-zinc-400">
                        {service.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm line-clamp-3 text-zinc-500 leading-relaxed font-medium">
                        {service.description}
                    </p>


                </div>

                {/* Link */}
                <div className="px-6 pb-6 sm:px-8 sm:pb-8 mt-auto relative z-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
                    <div
                        className="inline-flex items-center text-sm font-bold transition-colors group/link text-zinc-400 group-hover:text-white"
                    >
                        Explore Capability
                        <motion.span
                            animate={{ x: isHovered ? 6 : 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
