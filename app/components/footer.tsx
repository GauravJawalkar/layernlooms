"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
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
    { name: "Facebook", href: "https://facebook.com/layernlooms", icon: Facebook },
  ],
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };


  /* ─── tokens ─── */
  const bg = "bg-background";
  const borderTop = "border-border";
  const headText = "text-foreground";
  const bodyText = "text-textMuted";
  const labelText = "text-foreground";
  const hoverText = "hover:text-primary";
  const divider = "border-border";
  const iconColor = "text-textMuted";

  return (
    <footer className={`relative border-t transition-colors duration-300 ${bg} ${borderTop}`}>
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Company Info */}
          <motion.div
            className="lg:col-span-2"
            initial="initial" whileInView="animate"
            viewport={{ once: true }} variants={fadeInUp}
          >
            <Link href="/" className="inline-block">
              <Logo className="w-auto h-20" />
            </Link>
            <p className={`mt-4 text-sm max-w-md transition-colors duration-300 ${bodyText}`}>
              {footerData.company.tagline}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <Link
                href={`mailto:${footerData.contact.email}`}
                className={`flex items-center gap-3 text-sm transition-colors group ${bodyText} ${hoverText}`}
              >
                <Mail className={`h-4 w-4 group-hover:scale-110 transition-transform ${iconColor}`} />
                <span>{footerData.contact.email}</span>
              </Link>
              <Link
                href={`tel:${footerData.contact.phone}`}
                className={`flex items-center gap-3 text-sm transition-colors group ${bodyText} ${hoverText}`}
              >
                <Phone className={`h-4 w-4 group-hover:scale-110 transition-transform ${iconColor}`} />
                <span>{footerData.contact.phone}</span>
              </Link>
              <div className={`flex items-start gap-3 text-sm ${bodyText}`}>
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
          >
            <h3 className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${labelText}`}>
              Services
            </h3>
            <ul className="mt-4 space-y-3">
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
                    className={`text-sm flex items-center gap-1 group transition-colors duration-200 ${bodyText} ${hoverText}`}
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
          >
            <h3 className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${labelText}`}>
              Company
            </h3>
            <ul className="mt-4 space-y-3">
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
                    className={`text-sm flex items-center gap-1 group transition-colors duration-200 ${bodyText} ${hoverText}`}
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
          className={`mt-12 pt-8 border-t transition-colors duration-300 ${divider}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className={`text-sm text-center md:text-left transition-colors duration-300 ${bodyText}`}>
              © {currentYear} {footerData.company.name}. All rights reserved.
            </div>

            {/* Right Group: ThemeToggle + Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
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
                    className={`transition-all duration-300 hover:scale-110 ${iconColor} ${hoverText}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
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
