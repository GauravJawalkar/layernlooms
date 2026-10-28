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

