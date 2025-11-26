"use client"

import { useInView } from "@/hooks/use-in-view"

const steps = [
  { number: "01", title: "Research & Strategy", description: "Deep dive into your needs and market landscape" },
  { number: "02", title: "Wireframes", description: "Structural planning and user flow mapping" },
  { number: "03", title: "Design", description: "High-fidelity UI with pixel-perfect precision" },
  { number: "04", title: "Development", description: "Clean, scalable code built for the future" },
  { number: "05", title: "Testing", description: "Rigorous QA to ensure flawless performance" },
  { number: "06", title: "Launch & Support", description: "Deployment and ongoing optimization" },
]

export default function Process() {
  const ref = useInView()

  return (
    <section id="process" ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Proven methodology that ensures excellence at every stage.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-300 to-transparent" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Circle */}
                <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  {step.number}
                </div>
                {/* Content */}
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-black mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
