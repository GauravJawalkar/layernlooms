import dynamic from "next/dynamic";
import HeroSection from "./components/Home/HeroSection";

const WhyChooseUs = dynamic(() => import("./components/Home/WhyChooseUs"));
const OurServices = dynamic(() => import("./components/Home/OurServices"));
const ProcessSection = dynamic(() => import("./components/Home/ProcessSection"));
const TechStackSection = dynamic(() => import("./components/Home/TechStackSection"));
const FAQSection = dynamic(() => import("./components/Home/FAQSection"));
const CTASection = dynamic(() => import("./components/Home/CTASection"));

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-background text-foreground transition-colors duration-300">
      <HeroSection />
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <OurServices />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <ProcessSection />
      </div>
      <div>
        <TechStackSection />
      </div>
      <div className="rounded-2xl border border-neutral-300 dark:border-white/[0.06] overflow-hidden">
        <FAQSection />
      </div>
      <CTASection />
    </div>
  );
}

