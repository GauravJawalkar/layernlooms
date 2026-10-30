import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "./components/Home/HeroSection";

export const metadata: Metadata = {
  title: "LayerNLooms | Custom Software & AI Development",
  description:
    "Custom software development agency building web applications, mobile apps, AI systems, and cloud infrastructure for startups and enterprises worldwide.",
  alternates: { canonical: "https://layernlooms.com" },
};

const WhyChooseUs = dynamic(() => import("./components/Home/WhyChooseUs"));
const OurServices = dynamic(() => import("./components/Home/OurServices"));
const ProcessSection = dynamic(() => import("./components/Home/ProcessSection"));
const TechStackSection = dynamic(() => import("./components/Home/TechStackSection"));
const FAQSection = dynamic(() => import("./components/Home/FAQSection"));
const CTASection = dynamic(() => import("./components/Home/CTASection"));

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <div>
        <WhyChooseUs />
      </div>
      <div>
        <OurServices />
      </div>
      <div>
        <ProcessSection />
      </div>
      <div>
        <TechStackSection />
      </div>
      <div>
        <FAQSection />
      </div>
      <CTASection />
    </div>
  );
}

