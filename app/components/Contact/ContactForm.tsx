"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatInput from "./Floatinput";
import { Send, CheckCircle2, Plus, X } from "lucide-react";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { saveContact } = await import("../../lib/admin/contacts");
            await saveContact(form);
            fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }).catch((err) => console.error("Failed to send email notification:", err));
            setSubmitted(true);
            setForm({ name: "", email: "", company: "", projectType: "", budget: "", message: "" });
            setProjectTypes(defaultProjectTypes);
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            console.error("Failed to save contact:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full rounded-xl sm:rounded-2xl border border-border bg-card p-5 sm:p-8 flex flex-col gap-5 sm:gap-6"
        >
            {/* Form Header */}
            <div className="flex items-baseline justify-between gap-4">
                <div>
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">Project Brief</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tell us about your vision and we&apos;ll take it from there.</p>
                </div>
            </div>

            <div className="w-full h-px bg-border" />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatInput label="Full Name" name="name" type="text" value={form.name} focused={focused} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required />
                <FloatInput label="Email Address" name="email" type="email" value={form.email} focused={focused} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required />
            </div>

            {/* Company */}
            <FloatInput label="Company / Organization" name="company" type="text" value={form.company} focused={focused} onChange={handleChange} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />

            {/* Project Type + Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full group">
                    <label
                        htmlFor="projectType"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${focused === "projectType" || form.projectType
                                ? "top-2 text-[10px] tracking-widest uppercase font-bold text-primary"
                                : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60 group-hover:text-muted-foreground"
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
                        className={`w-full border rounded-lg px-4 pt-7 pb-3 text-sm appearance-none cursor-pointer outline-none transition-all duration-200 bg-secondary/40 text-foreground ${focused === "projectType" ? "border-primary ring-1 ring-primary bg-background" : "border-border hover:border-muted-foreground/40"}`}
                    >
                        <option value="" disabled hidden />
                        {projectTypes.map((p) => (
                            <option key={p} value={p} className="bg-background text-foreground">
                                {p}
                            </option>
                        ))}
                        <option value="__add_new__" className="font-bold text-foreground">+ Other Specialty</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
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
                        <div className="p-4 rounded-lg bg-secondary border border-border">
                            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                                <div className="w-full sm:flex-1">
                                    <FloatInput label="Describe Specialty" name="customType" type="text" value={customType} focused={focused} onChange={(e) => setCustomType(e.target.value)} onFocus={() => setFocused("customType")} onBlur={() => setFocused(null)} />
                                </div>
                                <div className="flex gap-2 justify-end sm:w-auto">
                                    <button type="button" onClick={handleCancelCustom} aria-label="Cancel" className="flex items-center justify-center p-3 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={handleAddCustomType} className="flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-background font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
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
                            : "top-5 text-sm text-muted-foreground/60 group-hover:text-muted-foreground"
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
                    className={`w-full border rounded-lg px-4 pt-10 pb-4 text-sm resize-none outline-none transition-all duration-200 bg-secondary/40 text-foreground ${focused === "message" ? "border-primary ring-1 ring-primary bg-background" : "border-border hover:border-muted-foreground/40"}`}
                    placeholder={focused === "message" || form.message ? "Tell us about your mission, goals and timelines..." : ""}
                />
            </div>

            <div className="w-full h-px bg-border" />

            {/* Submit */}
            <div className="flex flex-col gap-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                    disabled={submitted}
                    className={`w-full py-4 rounded-lg font-bold text-xs tracking-[0.2em] uppercase transition-opacity duration-300 ${submitted
                            ? "bg-emerald-600 text-white"
                            : "bg-primary text-background hover:opacity-85"
                        }`}
                >
                    <span className="flex items-center justify-center gap-2">
                        {submitted ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Sent Successfully
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Send Message
                            </>
                        )}
                    </span>
                </motion.button>

                <div className="flex items-center justify-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">Response in &lt; 24h</p>
                </div>
            </div>
        </form>
    );
}
