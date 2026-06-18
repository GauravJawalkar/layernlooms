"use client";
import HeroSection from "./components/Home/HeroSection";
import WhyChooseUs from "./components/Home/WhyChooseUs";
import PartnershipsSection from "./components/Home/PartnershipsSection";
import FAQSection from "./components/Home/FAQSection";
import ProcessSection from "./components/Home/ProcessSection";
import EngagementModels from "./components/Home/EngagementModels";
import ExpertiseSection from "./components/Home/ExpertiseSection";
import OurServices from "./components/Home/OurServices";
import TechStackSection from "./components/Home/TechStackSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <WhyChooseUs />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <OurServices />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <ProcessSection />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <TechStackSection />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <PartnershipsSection />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <EngagementModels />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <FAQSection />
      </div>
    </div>
  );
}
