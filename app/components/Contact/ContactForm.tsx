"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FloatInput from "./Floatinput";
import { Send, CheckCircle2, ChevronDown, X, Loader2, AlertCircle, ClipboardList } from "lucide-react";

const defaultProjectTypes = [
    "Web Development",
    "Mobile App Development",
    "AI & ML Solutions",
    "SaaS & Cloud",
    "UI/UX & Branding",
    "E-Commerce",
];

export default function ContactForm() {
    const searchParams = useSearchParams();
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
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customType, setCustomType] = useState("");
    const [projectTypes, setProjectTypes] = useState(defaultProjectTypes);

    useEffect(() => {
        const plan = searchParams?.get("plan");
        const type = searchParams?.get("type");
        if (plan) {
            setForm((prev) => ({
                ...prev,
                budget: prev.budget || plan,
                message: prev.message || `Inquiring about ${plan} engagement model.`,
            }));
        } else if (type === "consultation") {
            setForm((prev) => ({
                ...prev,
                message: prev.message || "Requesting a free 30-minute discovery consultation.",
            }));
        }
    }, [searchParams]);

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
        setLoading(true);
        setSubmitError("");
        try {
            let saved = false;
            try {
                const { saveContact } = await import("../../lib/admin/contacts");
                await saveContact(form);
                saved = true;
            } catch (firestoreErr) {
                console.warn("Firestore save fallback:", firestoreErr);
            }

            try {
                const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });
                if (res.ok) saved = true;
            } catch (emailErr) {
                console.warn("Email API fallback:", emailErr);
            }

            if (!saved) {
                throw new Error("Unable to deliver message right now. Please reach out directly to info@layernlooms.com or via WhatsApp.");
            }

            setSubmitted(true);
            setForm({ name: "", email: "", company: "", projectType: "", budget: "", message: "" });
            setProjectTypes(defaultProjectTypes);
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to send message. Please try again or contact us directly.";
            setSubmitError(msg);
            console.error("Contact submission error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-3.5 rounded-2xl border border-border/80 bg-card/85 p-4 shadow-xl shadow-foreground/[0.03] backdrop-blur-xl sm:gap-6 sm:rounded-3xl sm:p-8 lg:p-9"
        >
            {/* Form Header */}
            <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-2xl">Project Brief</h2>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground sm:mt-1.5 sm:text-sm sm:leading-6">Tell us about your vision and we&apos;ll take it from there.</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent-current/20 bg-accent-current/10 text-accent-current sm:size-11 sm:rounded-2xl">
                    <ClipboardList className="size-4 sm:size-5" />
                </span>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-accent-current/30 via-border to-transparent" />

            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <FloatInput label="Full Name" name="name" type="text" value={form.name} focused={focused} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required />
                <FloatInput label="Email Address" name="email" type="email" value={form.email} focused={focused} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required />
            </div>

            {/* Company */}
            <FloatInput label="Company / Organization" name="company" type="text" value={form.company} focused={focused} onChange={handleChange} onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />

            {/* Project Type + Budget */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                <div className="relative w-full group">
                    <label
                        htmlFor="projectType"
                        className={`absolute left-3.5 sm:left-4 max-w-[calc(100%-3rem)] truncate transition-all duration-200 pointer-events-none z-10 ${focused === "projectType" || form.projectType
                                ? "top-2 text-[10px] tracking-widest uppercase font-bold text-accent-current"
                                : "top-1/2 -translate-y-1/2 text-[13.5px] sm:text-sm text-muted-foreground group-hover:text-foreground"
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
                        className={`h-[56px] sm:h-[58px] w-full appearance-none rounded-xl border bg-secondary/30 pl-3.5 pr-10 sm:pl-4 pb-2 pt-6 text-base sm:text-sm text-foreground outline-none transition-all duration-200 cursor-pointer ${focused === "projectType" ? "border-accent-current ring-2 ring-accent-current/15 bg-background" : "border-border/80 hover:border-accent-current/30"}`}
                    >
                        <option value="" disabled hidden />
                        {projectTypes.map((p) => (
                            <option key={p} value={p} className="bg-background text-foreground">
                                {p}
                            </option>
                        ))}
                        <option value="__add_new__" className="bg-background font-bold text-foreground">+ Other Specialty</option>
                    </select>
                    <div className="pointer-events-none absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent-current">
                        <ChevronDown className={`size-4 transition-transform duration-200 ${focused === "projectType" ? "rotate-180 text-accent-current" : ""}`} />
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
                        <div className="rounded-2xl border border-accent-current/20 bg-accent-current/[0.04] p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 sm:items-center">
                                <div className="w-full sm:flex-1">
                                    <FloatInput label="Describe Specialty" name="customType" type="text" value={customType} focused={focused} onChange={(e) => setCustomType(e.target.value)} onFocus={() => setFocused("customType")} onBlur={() => setFocused(null)} />
                                </div>
                                <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
                                    <button type="button" onClick={handleCancelCustom} aria-label="Cancel" className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:p-3">
                                        <X className="size-4" />
                                        <span className="sm:hidden">Cancel</span>
                                    </button>
                                    <button type="button" onClick={handleAddCustomType} className="flex items-center justify-center rounded-xl bg-accent-current px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-current-foreground transition-opacity hover:opacity-90">
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
                    className={`absolute left-3.5 sm:left-4 transition-all duration-200 pointer-events-none z-10 ${focused === "message" || form.message
                            ? "top-2 text-[10px] tracking-widest uppercase font-bold text-accent-current"
                            : "top-4 text-[13.5px] sm:text-sm text-muted-foreground group-hover:text-foreground"
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
                    className={`min-h-[120px] w-full resize-none rounded-xl border bg-secondary/30 px-3.5 sm:px-4 pb-3 pt-7 sm:pb-4 sm:pt-8 text-base sm:text-sm text-foreground outline-none transition-all duration-200 placeholder:text-xs sm:placeholder:text-sm placeholder:text-muted-foreground/70 ${focused === "message" ? "border-accent-current ring-2 ring-accent-current/15 bg-background" : "border-border/80 hover:border-accent-current/30"}`}
                    placeholder={focused === "message" || form.message ? "Tell us about your mission, goals and timelines..." : ""}
                />
            </div>

            <div className="h-px w-full bg-gradient-to-r from-border via-border/70 to-transparent" />

            {/* Submit & Status Feedback */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
                <AnimatePresence>
                    {submitError && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 p-3.5 sm:p-4 text-xs leading-relaxed text-destructive"
                            role="alert"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{submitError}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    type="submit"
                    whileHover={{ scale: loading || submitted ? 1 : 1.005 }}
                    whileTap={{ scale: loading || submitted ? 1 : 0.995 }}
                    disabled={submitted || loading}
                    className={`w-full rounded-full py-3.5 sm:py-4 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${submitted
                            ? "cursor-default bg-emerald-600 text-white"
                            : loading
                            ? "cursor-wait bg-accent-current/70 text-accent-current-foreground"
                            : "cursor-pointer bg-accent-current text-accent-current-foreground shadow-md shadow-accent-current/10 hover:-translate-y-0.5 hover:opacity-90"
                        }`}
                >
                    <span className="flex items-center justify-center gap-2">
                        {submitted ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Sent Successfully
                            </>
                        ) : loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending Message...
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
