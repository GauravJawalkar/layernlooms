"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUp,
} from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { GoogleIcon, WhatsAppIcon, XIcon } from "./Icons";

const footerData = {
  company: {
    name: "LayerNLooms",
    tagline:
      "Weaving digital experiences with precision, depth, and scalable technology for forward-thinking brands worldwide.",
  },
  services: [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile App Development", href: "/services/mobile-app-development" },
    { name: "AI & ML Solutions", href: "/services/ai-ml-solutions" },
    { name: "Cloud Infrastructure", href: "/services/cloud-infrastructure" },
    { name: "UI/UX Design", href: "/services/ui-ux-design" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "SaaS Analytics", href: "/services/saas-analytics" },
    { name: "E-Commerce Development", href: "/services/e-commerce-development" },
  ],
  companyLinks: [
    { name: "About Us", href: "/about" },
    { name: "Case Studies / Portfolio", href: "/portfolio" },
    { name: "Tech Blog", href: "/blog" },
    { name: "Pricing Models", href: "/pricing" },
    { name: "Partner Programme", href: "/partner" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ],
  contact: {
    email: "info@layernlooms.com",
    phone: "+91 9730516224",
    whatsapp: "https://wa.me/9511864578",
    address: "Pune, Maharashtra, India",
    googleBusiness: "https://share.google/S46H7wVpxAKJO4Eom",
  },
  social: [
    { name: "X", href: "https://x.com/Layernlooms", icon: XIcon },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/layernlooms",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/layernlooms",
      icon: Instagram,
    },
    {
      name: "Google Business",
      href: "https://share.google/S46H7wVpxAKJO4Eom",
      icon: GoogleIcon,
    },
    { name: "WhatsApp", href: "https://wa.me/9511864578", icon: WhatsAppIcon },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative rounded-3xl sm:rounded-4xl border border-neutral-200/80 dark:border-white/10 bg-card/70 dark:bg-neutral-950/70 backdrop-blur-xl shadow-lg shadow-neutral-950/5 dark:shadow-black/60 my-6 sm:my-8 lg:my-10 overflow-hidden transition-colors duration-500">
      {/* ── Ambient Background Lighting ── */}
      <div className="pointer-events-none absolute -top-40 right-0 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-neutral-300/25 dark:from-white/[0.035] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-neutral-400/15 dark:from-white/[0.025] to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 py-8 sm:py-14">
        {/* ── Top Status & Quick Link Strip ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-10 border-b border-neutral-200/70 dark:border-white/10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-neutral-300/80 dark:border-white/15 bg-neutral-100/90 dark:bg-white/[0.06] text-neutral-900 dark:text-white text-[11px] sm:text-xs font-medium backdrop-blur-md">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-white/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-900 dark:bg-white" />
            </span>
            <span>Available for new projects & collaborations</span>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-950 dark:text-white hover:opacity-80 transition-opacity"
          >
            <span>Start a conversation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-14 pt-8 sm:pt-12">
          {/* Col 1 & 2: Brand, Bio & Contact Chips */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2 space-y-5 sm:space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link
              href="/"
              className="inline-block hover:opacity-85 transition-opacity"
            >
              <Logo className="w-auto h-14 sm:h-20 lg:h-25" />
            </Link>

            <p className="text-sm sm:text-base max-w-md leading-relaxed text-muted-foreground font-normal">
              {footerData.company.tagline}
            </p>

            {/* Interactive Contact Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Link
                href={`mailto:${footerData.contact.email}`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-950 dark:hover:text-white transition-all shadow-xs"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                <span>{footerData.contact.email}</span>
              </Link>

              <Link
                href={`tel:${footerData.contact.phone}`}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-950 dark:hover:text-white transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                <span>{footerData.contact.phone}</span>
              </Link>

              <a
                href={footerData.contact.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-white/30 hover:text-neutral-950 dark:hover:text-white transition-all shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
                <span>{footerData.contact.address}</span>
              </a>
            </div>

            {/* Social Icons Dock */}
            <div className="pt-2">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                Follow LayerNLooms
              </span>
              <div className="flex items-center gap-2.5">
                {footerData.social.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95 shadow-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Col 3: Services */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span>Services</span>
            </div>
            <ul className="space-y-2.5">
              {footerData.services.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + index * 0.03 }}
                >
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-neutral-950 dark:text-white" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Company */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span>Company</span>
            </div>
            <ul className="space-y-2.5">
              {footerData.companyLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 + index * 0.03 }}
                >
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-neutral-950 dark:text-white" />
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      {item.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Bottom Utility Row ── */}
        <motion.div
          className="mt-10 sm:mt-12 pt-6 border-t border-neutral-200/70 dark:border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left text-xs text-muted-foreground">
            {/* Copyright & Legal links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <span>
                © {currentYear} {footerData.company.name}. All rights reserved.
              </span>
              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="opacity-30">•</span>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
                <span className="opacity-30">•</span>
                <Link
                  href="/partner-terms"
                  className="hover:text-foreground transition-colors"
                >
                  Partner Terms
                </Link>
              </div>
            </div>

            {/* Right: Theme Toggle & Scroll to Top */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/10 transition-all cursor-pointer shadow-xs"
                aria-label="Back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
