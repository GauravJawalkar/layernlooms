"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllServices } from "@/app/data/services";
import ServiceCard from "../../components/services/ServiceCard";
import JsonLd, { getBreadcrumbSchema } from "@/app/components/JsonLd";

export default function ServicesPage() {
  const services = getAllServices();
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <div className="min-h-screen text-white selection:bg-white selection:text-black">
      <JsonLd data={getBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Services", url: "/services" }])} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              Our Services
            </h1>
            
            <div className="w-24 h-[3px] bg-white mx-auto mt-4 mb-6 rounded-full" />
            
            <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Explore our comprehensive capabilities where design meets engineering excellence. We build digital products that drive results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        ref={servicesRef}
        className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            animate={isServicesInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1
                }
              }
            }}
          >
            {services.length === 0 ? (
              <div className="col-span-full text-center py-20 text-sm text-zinc-500 border border-dashed border-white/10 rounded-3xl">
                No services available yet.
              </div>
            ) : (
              services.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="relative py-16 mb-12 sm:mb-16 mx-4 sm:mx-8 md:mx-12 lg:mx-20 rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.02)]"
      >
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/[0.02] rounded-[100%] blur-[120px]" />
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-tight"
              variants={containerVariants}
            >
              Ready to engineer your<br />next breakthrough?
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
              variants={containerVariants}
            >
              Connect with our technical architects to discuss your infrastructure, platform, or product requirements.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              variants={containerVariants}
            >
              <Link
                href="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold shadow-xl transition-all duration-300 bg-white text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Initiate Project
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/portfolio"
                className="group w-full sm:w-auto inline-flex items-center justify-center text-sm font-bold border rounded-full px-8 py-4 transition-all duration-300 text-white border-white/20 hover:bg-white/5 hover:border-white/40"
              >
                Review Case Studies
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
