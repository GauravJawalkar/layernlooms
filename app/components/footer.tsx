"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const footerData = {
  company: {
    name: "LayerNLooms",
    tagline: "Weaving digital excellence with precision and innovation.",
  },
  services: [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Apps", href: "/services/mobile-app-development" },
    { name: "AI Solutions", href: "/services/ai-ml-solutions" },
    { name: "Enterprise", href: "/services/cloud-infrastructure" },
  ],
  companyLinks: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  contact: {
    email: "info@layernlooms.com",
    phone: "+91 9730516224",
    address: "Pune, Maharashtra, India",
  },
  social: [
    { name: "LinkedIn", href: "https://linkedin.com/company/layernlooms", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/layernlooms", icon: Instagram },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  /* ─── tokens ─── */
  const bg = "bg-background";
  const borderTop = "border-border";
  const bodyText = "text-textMuted";
  const labelText = "text-foreground";
  const hoverText = "hover:text-primary";
  const divider = "border-border";
  const iconColor = "text-textMuted";

  return (
    <footer className={`relative border-t transition-colors duration-300 my-6 sm:my-8 lg:my-10 ${bg} ${borderTop}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 my-4 sm:my-6">

          {/* Company Info */}
          <motion.div
            className="sm:col-span-2 lg:col-span-2 space-y-4"
            initial="initial" whileInView="animate"
            viewport={{ once: true }} variants={fadeInUp}
          >
            <Link href="/" className="inline-block">
              <Logo className="w-auto h-16 sm:h-20" />
            </Link>
            <p className={`text-sm sm:text-base max-w-md leading-relaxed transition-colors duration-300 ${bodyText}`}>
              {footerData.company.tagline}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3 pt-2">
              <Link
                href={`mailto:${footerData.contact.email}`}
                className={`flex items-center gap-3 text-xs sm:text-sm transition-colors group ${bodyText} ${hoverText}`}
              >
                <Mail className={`h-4 w-4 shrink-0 group-hover:scale-110 transition-transform ${iconColor}`} />
                <span className="break-all">{footerData.contact.email}</span>
              </Link>
              <Link
                href={`tel:${footerData.contact.phone}`}
                className={`flex items-center gap-3 text-xs sm:text-sm transition-colors group ${bodyText} ${hoverText}`}
              >
                <Phone className={`h-4 w-4 shrink-0 group-hover:scale-110 transition-transform ${iconColor}`} />
                <span>{footerData.contact.phone}</span>
              </Link>
              <div className={`flex items-start gap-3 text-xs sm:text-sm ${bodyText}`}>
                <MapPin className={`h-4 w-4 mt-0.5 shrink-0 ${iconColor}`} />
                <span>{footerData.contact.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="initial" whileInView="animate"
            viewport={{ once: true }} variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${labelText}`}>
              Services
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerData.services.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm flex items-center gap-1.5 group transition-colors duration-200 ${bodyText} ${hoverText}`}
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial="initial" whileInView="animate"
            viewport={{ once: true }} variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${labelText}`}>
              Company
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerData.companyLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`text-xs sm:text-sm flex items-center gap-1.5 group transition-colors duration-200 ${bodyText} ${hoverText}`}
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className={`mt-10 sm:mt-12 pt-6 sm:pt-8 border-t transition-colors duration-300 ${divider}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
            <div className={`text-xs sm:text-sm transition-colors duration-300 ${bodyText}`}>
              © {currentYear} {footerData.company.name}. All rights reserved.
            </div>

            {/* Right Group: ThemeToggle + Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <ThemeToggle />

              {/* Social icons */}
              <div className="flex items-center gap-4">
                {footerData.social.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-110 ${iconColor} ${hoverText}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
