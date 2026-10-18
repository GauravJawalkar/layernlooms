"use client";
import HeroSection from "./components/Home/HeroSection";
import WhyChooseUs from "./components/Home/WhyChooseUs";
import FAQSection from "./components/Home/FAQSection";
import ProcessSection from "./components/Home/ProcessSection";
import OurServices from "./components/Home/OurServices";
import TechStackSection from "./components/Home/TechStackSection";
import CTASection from "./components/Home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-background text-foreground transition-colors duration-300">
      <HeroSection />
      <div className="">
        <WhyChooseUs />
      </div>
      <div className="">
        <OurServices />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <ProcessSection />
      </div>
      <div className="">
        <TechStackSection />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <FAQSection />
      </div>
      <CTASection />
    </div>
  );
}

