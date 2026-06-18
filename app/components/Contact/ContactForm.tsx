"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatInput from "./Floatinput";
import { Send, CheckCircle2, Plus, X, Sparkles } from "lucide-react";

const defaultProjectTypes = [
    "Web Development",
    "Mobile App Development",
    "AI & ML Solutions",
    "SaaS & Cloud",
    "UI/UX & Branding",
    "E-Commerce",
];

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        message: "",
    });
    const [focused, setFocused] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customType, setCustomType] = useState("");
    const [projectTypes, setProjectTypes] = useState(defaultProjectTypes);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "projectType" && value === "__add_new__") {
            setShowCustomInput(true);
            return;
        }

        setForm({ ...form, [name]: value });
    };

    const handleAddCustomType = () => {
        if (customType.trim() && !projectTypes.includes(customType.trim())) {
            const newType = customType.trim();
            setProjectTypes([...projectTypes, newType]);
            setForm({ ...form, projectType: newType });
            setCustomType("");
            setShowCustomInput(false);
        }
    };

    const handleCancelCustom = () => {
        setShowCustomInput(false);
        setCustomType("");
        setForm({ ...form, projectType: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-border bg-card/80 backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-primary/5 flex flex-col gap-6 sm:gap-7"
        >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/50 rounded-full blur-[80px] -mr-20 -mt-20" />

            {/* Form Header */}
            <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Project Brief</h2>
                    <p className="text-xs sm:text-sm text-textMuted mt-1">Tell us about your vision and we&apos;ll take it from there.</p>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border" />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <FloatInput label="Full Name" name="name" type="text" value={form.name} focused={focused} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required />
                <FloatInput label="Email Address" name="email" type="email" value={form.email} focused={focused} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required />
            </div>

            {/* Company */}
            <FloatInput label="Company / Organization" name="company" type="text" value={form.company} focused={focused} onChange={handleChange} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />

            {/* Project Type + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="relative w-full group">
                    <label
                        htmlFor="projectType"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${focused === "projectType" || form.projectType
                                ? "top-2 text-[10px] tracking-widest uppercase font-bold text-primary"
                                : "top-1/2 -translate-y-1/2 text-sm text-textMuted/60 group-hover:text-textMuted"
                            }`}
                    >
                        Project Specialty
                    </label>
                    <select
                        id="projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        onFocus={() => setFocused("projectType")}
                        onBlur={() => setFocused(null)}
                        className={`w-full border rounded-xl sm:rounded-2xl px-4 pt-7 pb-3 text-sm appearance-none cursor-pointer outline-none transition-all duration-200 bg-secondary/30 text-foreground ${focused === "projectType" ? "border-primary ring-1 ring-primary bg-background" : "border-border hover:border-textMuted/30"}`}
                    >
                        <option value="" disabled hidden />
                        {projectTypes.map((p) => (
                            <option key={p} value={p} className="bg-background text-foreground">
                                {p}
                            </option>
                        ))}
                        <option value="__add_new__" className="font-bold text-foreground">+ Other Specialty</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-textMuted">
                        <Plus className={`w-4 h-4 transition-transform duration-300 ${focused === "projectType" ? "rotate-45" : ""}`} />
                    </div>
                </div>

                <FloatInput label="Estimated Budget" name="budget" type="text" value={form.budget} focused={focused} onChange={handleChange} onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)} placeholder="e.g. $10k - $25k" />
            </div>

            {/* Custom Input */}
            <AnimatePresence>
                {showCustomInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 rounded-xl sm:rounded-2xl bg-secondary border border-border">
                            <div className="flex gap-3 items-center">
                                <div className="flex-1">
                                    <FloatInput label="Describe Specialty" name="customType" type="text" value={customType} focused={focused} onChange={(e) => setCustomType(e.target.value)} onFocus={() => setFocused("customType")} onBlur={() => setFocused(null)} />
                                </div>
                                <div className="flex gap-2">
                                    <button type="button" onClick={handleCancelCustom} className="p-3 rounded-xl bg-card border border-border text-textMuted hover:text-foreground transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={handleAddCustomType} className="px-5 rounded-xl bg-primary text-background font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-colors">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Message */}
            <div className="relative group">
                <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${focused === "message" || form.message
                            ? "top-2 text-[10px] tracking-widest uppercase font-bold text-primary"
                            : "top-5 text-sm text-textMuted/60 group-hover:text-textMuted"
                        }`}
                >
                    Project Details
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`w-full border rounded-xl sm:rounded-3xl px-4 pt-10 pb-4 text-sm resize-none outline-none transition-all duration-200 bg-secondary/30 text-foreground ${focused === "message" ? "border-primary ring-1 ring-primary bg-background shadow-sm" : "border-border hover:border-textMuted/30"}`}
                    placeholder={focused === "message" || form.message ? "Tell us about your mission, goals and timelines..." : ""}
                />
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border" />

            {/* Submit */}
            <div className="flex flex-col gap-4">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={submitted}
                    className={`group relative overflow-hidden w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-xs tracking-[.25em] uppercase transition-all duration-500 ${submitted
                            ? "bg-emerald-500 text-white"
                            : "bg-primary text-background hover:opacity-90 shadow-lg shadow-primary/10"
                        }`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitted ? (
                            <>
                                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                                Sent Successfully
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Send Message
                            </>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.button>

                <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-textMuted">Response in &lt; 24h</p>
                </div>
            </div>
        </form>
    );
}
