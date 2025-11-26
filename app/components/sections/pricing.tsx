"use client"

import { useInView } from "@/hooks/use-in-view"

const pricingOptions = [
  {
    title: "Fixed Project",
    description: "Ideal for well-defined projects with clear scope",
    features: ["Custom scope", "Fixed timeline", "Predictable cost", "Full deliverables"],
  },
  {
    title: "Monthly Retainer",
    description: "Perfect for ongoing development and support",
    features: ["Dedicated team", "Flexible scope", "Priority support", "Continuous improvement"],
    highlighted: true,
  },
  {
    title: "Hourly Engagement",
    description: "Best for consultations and flexible work",
    features: ["Pay as you go", "Expert guidance", "Flexible hours", "Advisory support"],
  },
]

export default function Pricing() {
  const ref = useInView()

  return (
    <section id="pricing" ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Engagement Models</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose the model that works best for your project needs.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className={`p-8 rounded-lg transition-all duration-300 ${option.highlighted
                  ? "bg-black text-white shadow-xl scale-105"
                  : "bg-white text-black border border-gray-200 hover:shadow-lg"
                }`}
            >
              <h3 className="text-2xl font-semibold mb-2">{option.title}</h3>
              <p className={`text-sm mb-8 ${option.highlighted ? "text-gray-300" : "text-gray-600"}`}>
                {option.description}
              </p>
              <ul className="space-y-3 mb-8">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#5f7fff] font-bold">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
