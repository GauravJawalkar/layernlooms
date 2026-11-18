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
        <div className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm sm:rounded-3xl sm:p-6">
            <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-accent-current" />
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    The Process
                </p>
            </div>

            <div className="relative space-y-6">
                <div className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-accent-current/30 via-border to-transparent" />

                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group/item relative flex items-start gap-4"
                    >
                        <div className="z-10 flex size-8 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors duration-300 group-hover/item:border-accent-current/30 group-hover/item:bg-accent-current/10 group-hover/item:text-accent-current">
                            <step.icon className="size-4" />
                        </div>
                        <div className="min-w-0 pt-1">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">{step.title}</h4>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
