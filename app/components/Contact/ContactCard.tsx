"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle, Zap, ShieldCheck } from "lucide-react";

export function StepsCard() {
    const steps = [
        { title: "Briefing", desc: "Share your mission & goals", icon: MessageCircle },
        { title: "Analysis", desc: "We map out the technical path", icon: ShieldCheck },
        { title: "Kickoff", desc: "Alignment & strategic deep-dive", icon: Zap },
        { title: "Build", desc: "Excellence in every line of code", icon: CheckCircle2 }
    ];

    return (
        <div className="rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 bg-card">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-border" />
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground">
                    The Process
                </p>
            </div>

            <div className="relative space-y-6">
                <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border" />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="relative flex items-start gap-4 group/item"
                    >
                        <div className="z-10 shrink-0 w-8 h-8 rounded-lg bg-card border border-border text-muted-foreground flex items-center justify-center group-hover/item:border-primary group-hover/item:text-primary transition-colors duration-300">
                            <step.icon className="w-4 h-4" />
                        </div>
                        <div className="pt-1 min-w-0">
                            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">{step.title}</h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
