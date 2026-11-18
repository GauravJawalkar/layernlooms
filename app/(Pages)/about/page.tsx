"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Heart,
  Linkedin,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import JsonLd, {
  getBreadcrumbSchema,
  getPersonSchema,
  getProfilePageSchema,
} from "@/app/components/JsonLd";
import { team } from "@/app/lib/site";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const teamMembers = [
  {
    name: "Gaurav Jawalkar",
    role: "Founder & CEO",
    bio: "Leads the company vision, partnerships, and long-term growth, with a focus on building useful, scalable digital products.",
    linkedin: "https://www.linkedin.com/in/gauravjawalkar",
  },
  {
    name: "Sanket Pathare",
    role: "Co-Founder & CTO",
    bio: "Shapes technology strategy and product architecture across modern web, mobile, and cloud-based applications.",
    linkedin: "https://www.linkedin.com/in/sanket-pathare-740703245",
  },
  {
    name: "Shubham Tawale",
    role: "Co-Founder & COO",
    bio: "Guides day-to-day operations, project execution, and team coordination to keep delivery thoughtful and dependable.",
    linkedin: "https://www.linkedin.com/in/shubham-tawale-b6a9b8200",
  },
  {
    name: "Jay Jawalkar",
    role: "Managing Director",
    bio: "Focuses on business management, strategic partnerships, and building lasting client relationships.",
    linkedin: "https://www.linkedin.com/in/jay-jawalkar/",
  },
];

const values = [
  {
    icon: Shield,
    number: "01",
    title: "Trust is built in the details",
    description:
      "Clear communication, honest decisions, and dependable follow-through are part of every engagement.",
  },
  {
    icon: Zap,
    number: "02",
    title: "Curiosity keeps us moving",
    description:
      "We explore emerging tools thoughtfully, choosing technology for the problem it solves—not for the trend.",
  },
  {
    icon: Heart,
    number: "03",
    title: "People make the product",
    description:
      "Good software starts with understanding the people who will use it, build it, and depend on it.",
  },
  {
    icon: Target,
    number: "04",
    title: "Craft shows up in delivery",
    description:
      "We sweat the details—from system architecture to the last interaction—so the whole experience feels considered.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "A small team, a clear belief",
    description:
      "LayerNLooms began with a simple idea: better software comes from close collaboration and care for the craft.",
  },
  {
    year: "Today",
    title: "Growing through meaningful work",
    description:
      "A team of 10+ brings together engineering, design, and strategy to take on a wider range of digital challenges.",
  },
  {
    year: "Next",
    title: "Keep building what matters",
    description:
      "We continue to learn, refine our approach, and help ambitious teams turn promising ideas into useful products.",
  },
];

const stats = [
  { value: "10+", label: "Projects delivered" },
  { value: "2+", label: "Years building" },
  { value: "10+", label: "Team members" },
  { value: "98%", label: "Client satisfaction" },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We listen, ask better questions, and get clear on the people, goals, and constraints behind the brief.",
  },
  {
    number: "02",
    title: "Shape",
    description:
      "We turn what we learn into a focused plan for the experience, design, and technical foundation.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We work in the open, share progress early, and make the important decisions together.",
  },
  {
    number: "04",
    title: "Keep improving",
    description:
      "We test, refine, and help your product stay ready for what comes next.",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={reveal}
      initial="hidden"
      animate={inView || reduceMotion ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400 sm:text-xs">
      <span className="h-px w-8 bg-neutral-400 dark:bg-neutral-500" />
      {children}
    </div>
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <JsonLd
        data={[
          getBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
          ...team.flatMap((member) => [
            getPersonSchema(member),
            getProfilePageSchema(member),
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden lg:min-h-[680px]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_42%,rgba(127,127,127,0.12),transparent_48%)]" />
          <div className="absolute inset-0 opacity-[0.2] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute -right-36 top-10 h-[520px] w-[520px] rounded-full border border-neutral-300/50 dark:border-white/10"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-[17%] top-[15%] h-3 w-3 rounded-full bg-primary shadow-[0_0_24px_currentColor]" />
            <span className="absolute bottom-[13%] right-[21%] h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-200" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="absolute -right-20 top-24 h-[390px] w-[390px] rounded-full border border-dashed border-neutral-300/60 dark:border-white/10"
            animate={reduceMotion ? undefined : { rotate: -360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-8 sm:px-8 sm:py-12 lg:min-h-[680px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-12">
          <div className="relative z-10">
            
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
              className="max-w-3xl text-[clamp(2.25rem,8vw,5.8rem)] font-black leading-[0.94] tracking-[-0.065em]"
            >
              <motion.span variants={reveal} className="block">
                Built with
              </motion.span>
              <motion.span
                variants={reveal}
                className="block bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent"
              >
                intention.
              </motion.span>
              <motion.span
                variants={reveal}
                className="mt-2 block text-[0.48em] font-semibold leading-tight tracking-[-0.04em] text-muted-foreground"
              >
                Designed for what&apos;s next.
              </motion.span>
            </motion.h1>
            <Reveal delay={0.28}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
                We&apos;re LayerNLooms—a close-knit team of engineers, designers,
                and strategists turning ambitious ideas into useful digital
                experiences.
              </p>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-transform hover:-translate-y-0.5"
                >
                  Let&apos;s talk about your idea
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="#our-story"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Get to know us
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.48}>
              <div className="mt-12 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex -space-x-2">
                  {teamMembers.slice(0, 3).map((member) => (
                    <span
                      key={member.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-bold text-foreground"
                    >
                      {member.name.split(" ").map((part) => part[0]).join("")}
                    </span>
                  ))}
                </div>
                <span>
                  A team of 10+ curious minds
                  <br />
                  working across disciplines
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative mx-auto w-full max-w-[560px]" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.18, ease }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-primary/5 blur-2xl" />
              <div className="relative aspect-[0.98] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 sm:aspect-[1.05]">
                <Image
                  src="/about.png"
                  alt="LayerNLooms team collaborating in their workspace"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/65">
                      People first. Always.
                    </p>
                    <p className="mt-2 text-lg font-bold tracking-tight sm:text-xl">
                      One team, many perspectives.
                    </p>
                  </div>
                
                </div>
              </div>
         
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* At-a-glance numbers */}
      <section className="px-4 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 md:grid-cols-4 md:divide-y-0">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="px-3 py-6 text-center sm:px-6 sm:py-9"
              >
                <p className="text-2xl font-black tracking-[-0.06em] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:mt-2 sm:tracking-[0.17em] sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story and timeline */}
      <section id="our-story" className="relative py-14 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow>Our story</Eyebrow>
              <h2 className="max-w-lg text-3xl font-black leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Good work starts with{" "}
                <span className="text-muted-foreground">good questions.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                We started LayerNLooms to make the distance between a great idea
                and a well-made product feel smaller.
              </p>
              <div className="mt-8 h-px w-full max-w-xs bg-gradient-to-r from-primary/60 to-transparent" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                A little context, a lot of care
              </p>
            </Reveal>

            <div className="space-y-12">
              <Reveal>
                <p className="text-lg leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed">
                  Founded in 2024, LayerNLooms began as a two-person team with a
                  simple belief: the best digital products emerge when sharp
                  thinking and careful engineering work together.
                </p>
                <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  Today, we are a growing team delivering web, mobile, and AI
                  solutions. We bring design, technology, and business context
                  into the same conversation—so the result is useful, not just
                  impressive.
                </p>
              </Reveal>

              <div className="relative border-l border-border pl-6 sm:pl-8">
                {milestones.map((item, index) => (
                  <Reveal key={item.year} delay={index * 0.08}>
                    <div className="relative pb-9 last:pb-0">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 + 0.1, type: "spring" }}
                        className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary ring-1 ring-primary/40 sm:-left-[39px]"
                      />
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                        {item.year}
                      </p>
                      <h3 className="mt-2 text-lg font-bold tracking-tight sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="border-y border-border/70 py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <Reveal className="mb-10 max-w-2xl sm:mb-16">
            <Eyebrow>What guides us</Eyebrow>
            <h2 className="text-3xl font-black tracking-[-0.06em] sm:text-5xl">
              A clear direction.
              <span className="text-muted-foreground"> A thoughtful way there.</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Target,
                label: "Our mission",
                title: "Make technology work harder for people.",
                description:
                  "We help businesses solve meaningful problems with elegant, scalable software—grounded in real needs and built for measurable impact.",
              },
              {
                icon: Eye,
                label: "Our vision",
                title: "Make great engineering a true partnership.",
                description:
                  "We want every ambitious team to have a technology partner who listens closely, communicates openly, and cares about what happens after launch.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={index * 0.1}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -5 }}
                    className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 sm:p-10"
                  >
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-secondary text-primary">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                      <h3 className="mt-9 max-w-md text-2xl font-bold leading-tight tracking-[-0.04em] sm:text-3xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-col gap-5 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Our values</Eyebrow>
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.06em] sm:text-5xl">
                The standards behind{" "}
                <span className="text-muted-foreground">the work.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Not a poster on the wall. These are the principles we bring into
              the everyday decisions that shape a product.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.number} delay={index * 0.07}>
                  <motion.article
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    className="group h-full rounded-2xl border border-border bg-card/70 p-6 transition-colors hover:bg-card sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {value.number}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-bold leading-snug tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {value.description}
                    </p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="relative overflow-hidden border-y border-border/70 py-14 sm:py-24">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <Reveal className="mb-10 sm:mb-16">
            <Eyebrow>How we work</Eyebrow>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.06em] sm:text-5xl">
                A good process makes{" "}
                <span className="text-muted-foreground">space for good work.</span>
              </h2>
              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                Clear steps keep us moving. Open collaboration keeps the work
                connected to what matters.
              </p>
            </div>
          </Reveal>

          <div className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-border lg:block" />
            {process.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  className="relative h-full rounded-2xl border border-border bg-background/80 p-6 backdrop-blur sm:p-7"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-xs font-black">
                      {step.number}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-14 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <Reveal className="mb-10 flex flex-col gap-5 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>The people behind the work</Eyebrow>
              <h2 className="max-w-2xl text-3xl font-black tracking-[-0.06em] sm:text-5xl">
                Small enough to stay{" "}
                <span className="text-muted-foreground">close to the work.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Leadership stays involved—from the first conversation through
              delivery—so context and accountability never get lost.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.07}>
                <motion.article
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 sm:p-7"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/5 blur-2xl transition-colors group-hover:bg-primary/15" />
                  <div className="relative flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-secondary text-sm font-black tracking-wide transition-colors group-hover:bg-foreground group-hover:text-background">
                      {member.name.split(" ").map((part) => part[0]).join("")}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="relative mt-8 flex-1">
                    <h3 className="text-lg font-bold tracking-tight">{member.name}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.13em] text-primary">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="relative mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-[#0077b5]/30 hover:bg-[#0077b5]/10 hover:text-[#0077b5]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-4 pb-14 sm:px-8 sm:pb-24 lg:px-12">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-border bg-foreground px-5 py-10 text-background shadow-2xl shadow-black/10 dark:shadow-black/30 sm:px-12 sm:py-20 lg:px-20">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-40 h-[28rem] w-[28rem] rounded-full border border-background/10"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute left-12 top-16 h-3 w-3 rounded-full bg-background/50" />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(127,127,127,0.22),transparent_45%)]" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Eyebrow>Have something in mind?</Eyebrow>
                <h2 className="max-w-3xl text-3xl font-black leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  Let&apos;s make the next thing matter.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-background/70 sm:mt-5 sm:text-base">
                  Tell us what you&apos;re trying to solve. We&apos;ll bring
                  thoughtful questions, practical ideas, and the right people to
                  the conversation.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-background px-6 py-4 text-sm font-bold text-foreground transition-transform hover:-translate-y-1 sm:w-fit"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
