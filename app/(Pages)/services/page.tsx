"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { getAllServicesFromDb, AdminService } from "../../lib/admin/services";
import ServiceCard from "../../components/services/ServiceCard";


export default function ServicesPage() {
  const [services, setServices] = useState<AdminService[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  useEffect(() => {
    getAllServicesFromDb()
      .then((data) => setServices(data.filter((s) => s.visible !== false)))
      .catch((err) => {
        console.error("Failed to load services:", err);
        setLoadError("Failed to load services");
      })
      .finally(() => setLoading(false));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-24 pb-4 text-center px-6 transition-colors duration-300 bg-background"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4 transition-colors duration-300 text-foreground">
            Our Services
          </h1>
          <motion.div
            className="mx-auto w-20 h-1 rounded-full mb-6 transition-colors duration-300 bg-primary"
            initial={{ width: 0 }}
            animate={isHeroInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className="text-lg max-w-xl mx-auto transition-colors duration-300 text-textMuted">
            Comprehensive solutions to transform your business and drive
            digital innovation.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section
        ref={servicesRef}
        className="relative py-24 transition-colors duration-300 bg-background overflow-hidden"
      >
        {/* Ambient glassmorphic glows */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 -right-40 h-[500px] w-[500px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-neutral-200/20 dark:bg-zinc-900/10 blur-3xl opacity-60" />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : loadError ? (
              <div className="col-span-full text-center py-20">
                <p className="text-sm text-red-500 mb-4">{loadError}</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    setLoadError("");
                    getAllServicesFromDb()
                      .then((data) => setServices(data.filter((s) => s.visible !== false)))
                      .catch((err) => {
                        console.error("Retry failed:", err);
                        setLoadError("Failed to load services");
                      })
                      .finally(() => setLoading(false));
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-background"
                >
                  Retry
                </button>
              </div>
            ) : services.length === 0 ? (
              <div className="col-span-full text-center py-20 text-sm text-textMuted">
                No services available yet.
              </div>
            ) : (
              services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" as const }
                    }
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <ServiceCard service={service} index={index} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 transition-colors duration-300 bg-primary text-background rounded-3xl mx-6 mb-20 shadow-2xl shadow-primary/20"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl text-background"
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ready to start your project?
            </motion.h2>
            <motion.p
              className="mt-4 text-lg opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Let&apos;s discuss how we can help you achieve your goals
            </motion.p>
            <motion.div
              className="mt-8 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block rounded-full px-8 py-3 text-sm font-semibold shadow-sm transition-all duration-300 bg-background text-foreground hover:bg-background/90"
                >
                  Contact Us Today
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block text-sm font-semibold border-2 rounded-full px-6 py-3 transition-all duration-300 text-background border-background hover:bg-background hover:text-primary"
                >
                  View Our Work{" "}
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    <ArrowRight className="inline-block ml-1 w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
