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
        <div className="rounded-2xl sm:rounded-[2rem] border border-border p-6 sm:p-8 bg-card/50 backdrop-blur-md shadow-sm relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-border" />
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-textMuted">
                        The Process
                    </p>
                </div>

                <div className="relative space-y-8">
                    <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-3 w-px bg-border/50" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative flex items-start gap-4 sm:gap-6 group/item"
                        >
                            <div className="z-10 shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-card border border-border text-textMuted flex items-center justify-center shadow-sm group-hover/item:border-primary group-hover/item:text-primary transition-all duration-300">
                                <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <div className="pt-1 min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">{step.title}</h4>
                                <p className="text-[11px] sm:text-xs text-textMuted mt-0.5 leading-relaxed">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
