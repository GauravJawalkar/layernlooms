"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Target, Eye, Heart, Shield, Zap, Users, Linkedin, Sparkles, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const sectionHeader = (title: string) => (
  <div className="flex items-center gap-3 mb-6 sm:mb-8">
    <div className="w-6 h-px bg-border" />
    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-textMuted">{title}</h2>
  </div>
);

function FadeInSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const teamMembers = [
  {
    name: "Gaurav Jawalkar",
    role: "Founder & CEO",
    bio: "Entrepreneur and business strategist leading the company's vision, innovation, and long-term growth. Focused on building scalable digital solutions and driving organizational success.",
    linkedin: "https://www.linkedin.com/in/gauravjawalkar"
  },
  {
    name: "Sanket Pathare",
    role: "Co-Founder & CTO",
    bio: "Full-stack developer specializing in modern web technologies including Next.js, React, Node.js, and cloud-based applications. Responsible for technology strategy, architecture, and product development.",
    linkedin: "https://www.linkedin.com/in/sanket-pathare-740703245"
  },
  {
    name: "Shubham Tawale",
    role: "Co-Founder & COO",
    bio: "Operations leader overseeing project execution, team coordination, and business processes. Ensures efficient delivery of products and services while maintaining operational excellence.",
    linkedin: "https://www.linkedin.com/in/shubham-tawale-b6a9b8200"
  },
  {
    name: "Jay Jawalkar",
    role: "Managing Director (MD)",
    bio: "Responsible for business management, strategic partnerships, and organizational growth. Focused on expanding market presence and strengthening client relationships.",
    linkedin: "https://www.linkedin.com/in/jay-jawalkar/"
  }
];

const coreValues = [
  { icon: Shield, title: "Trust First", desc: "We build relationships on transparency, integrity, and dependable delivery." },
  { icon: Zap, title: "Innovation Obsession", desc: "Cutting-edge AI and modern architecture in every solution we craft." },
  { icon: Heart, title: "People-Centric", desc: "Our team and clients thrive in a culture of respect, growth, and collaboration." },
  { icon: Target, title: "Precision Execution", desc: "Clean code, rigorous testing, and on-time delivery — no exceptions." },
];

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "1+", label: "Years in Business" },
  { value: "10+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-background">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative z-10 pt-10 pb-10 sm:pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className=" grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div className="order-2 ">
              {/* <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-border mb-5">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted">About Us</span>
              </motion.div> */}

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
              >
                Where vision meets{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">execution</span>
                <br />
                <span className="text-textMuted/30">we build what matters</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-textMuted max-w-xl mt-5 leading-relaxed"
              >
                LayerNLooms is a team of passionate engineers, designers, and strategists.
                We partner with startups and enterprises to build high-impact digital solutions
                that drive real business growth.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-primary/20 hover:opacity-90 transition-all duration-300"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center rounded-full bg-card border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="order-1 lg:order-2">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20 rounded-[3rem] blur-3xl" />
                <div className="relative aspect-[4/3] sm:aspect-[4/3] rounded-2xl sm:rounded-[2rem] overflow-hidden border border-border group shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
                  <Image src="/about.png" alt="About LayerNLooms" fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative z-10 pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <FadeInSection>
            <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-textMuted mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="relative z-10 py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <FadeInSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                {sectionHeader("Our Story")}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
                  From a bold vision to a
                  <br />
                  <span className="text-textMuted/30">digital powerhouse</span>
                </h3>
                <div className="mt-6 sm:mt-8 relative aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border border-border group lg:hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <Image src="/about.png" alt="Our journey" fill className="object-cover transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                  Founded in 2025, LayerNLooms began as a two-person team in a co-working space with a simple belief —
                  that great software comes from deep collaboration and uncompromising quality.
                </p>
                <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                  Today, we are a 30+ member team spanning across India, delivering cutting-edge web, mobile, and AI
                  solutions to clients worldwide. From YC-backed startups to Fortune 500 enterprises, we&apos;ve helped
                  dozens of organizations transform their digital landscape.
                </p>
                <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                  Our culture is built on curiosity, craftsmanship, and continuous learning. Every project is an
                  opportunity to push boundaries and set new standards in engineering excellence.
                </p>
               
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ═══ MISSION & VISION ═══ */}
      <section className="relative z-10 py-12 sm:py-16 bg-secondary/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeInSection>
              <div className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-8 -mt-8" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">Our Mission</h3>
                  <p className="mt-3 text-sm sm:text-base text-textMuted leading-relaxed">
                    To empower businesses with elegant, scalable technology solutions that drive measurable impact.
                    We combine deep technical expertise with strategic thinking to deliver products that users love
                    and businesses rely on.
                  </p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary rounded-full blur-3xl -mr-8 -mt-8" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">Our Vision</h3>
                  <p className="mt-3 text-sm sm:text-base text-textMuted leading-relaxed">
                    To be the most trusted technology partner for ambitious companies worldwide.
                    A future where every business, regardless of size, has access to world-class engineering
                    that accelerates their growth journey.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ═══ CORE VALUES ═══ */}
      <section className="relative z-10 py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <FadeInSection>
            {sectionHeader("Core Values")}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-10">
              What we stand for
            </h3>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <FadeInSection key={value.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-5 sm:p-6 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all duration-500">
                      <Icon className="w-5 h-5 text-primary group-hover:text-background transition-colors" />
                    </div>
                    <h4 className="mt-4 text-base sm:text-lg font-bold text-foreground">{value.title}</h4>
                    <p className="mt-2 text-xs sm:text-sm text-textMuted leading-relaxed">{value.desc}</p>
                  </motion.div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="relative z-10 py-12 sm:py-16 bg-secondary/30 border-t border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16 relative">
          <FadeInSection>
            {sectionHeader("Leadership")}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-[1.1] mb-10">
              Meet the people behind the code
            </h3>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teamMembers.map((member, i) => (
              <FadeInSection key={member.name}>
                <motion.div
                  onMouseEnter={() => setActiveTeam(i)}
                  onMouseLeave={() => setActiveTeam(null)}
                  className="group relative p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-secondary border border-border flex items-center justify-center text-sm sm:text-base font-bold text-foreground group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-500">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-foreground">{member.name}</h4>
                      <p className="text-xs text-textMuted font-medium mt-0.5">{member.role}</p>
                      <p className="text-xs text-textMuted/70 mt-2 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: activeTeam === i ? "auto" : 0, opacity: activeTeam === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-2 pt-4 border-t border-border mt-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-textMuted hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL / QUOTE ═══ */}
      <section className="relative z-10 py-12 sm:py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <FadeInSection>
            <div className="relative rounded-2xl sm:rounded-[2.5rem] border border-border bg-card/50 backdrop-blur-sm p-8 sm:p-12 lg:p-16 overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/50 rounded-full blur-3xl" />

              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/30 mx-auto mb-6" />

              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed max-w-3xl mx-auto">
                &ldquo;Design is not just what it looks like and feels like.
                Design is how it works.&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-px h-6 bg-border" />
                <p className="text-xs font-bold tracking-widest uppercase text-textMuted">Steve Jobs</p>
                <div className="w-px h-6 bg-border" />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

   

      {/* ═══ CTA ═══ */}
      <section className="relative z-10 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
          <FadeInSection>
            <div className="relative rounded-2xl sm:rounded-[2.5rem] bg-primary p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl shadow-primary/20">
              <div className="absolute top-0 right-0 w-60 h-60 bg-background/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-background/5 rounded-full blur-[80px]" />

              <div className="relative">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-background leading-[1.1]">
                  Ready to build something remarkable?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-background/70 max-w-xl mx-auto leading-relaxed">
                  Let&apos;s discuss your vision and create a solution that drives real impact for your business.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
                  >
                    Start a Conversation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center rounded-full border-2 border-background/30 text-background px-6 py-3 text-sm font-semibold hover:bg-background hover:text-primary transition-all duration-300"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
