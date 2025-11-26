"use client"

import { useInView } from "@/hooks/use-in-view"

const reasons = [
  "100% Custom & Scalable Solutions",
  "End-to-End Development",
  "World-Class UI/UX Expertise",
  "Fast Delivery with Quality",
  "AI-Driven Enhancements",
  "Transparent Process & Project Tracking",
]

export default function WhyChoose() {
  const ref = useInView()

  return (
    <section ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Why Choose LayerNLooms?</h2>
            <p className="text-gray-600 text-lg mb-8">
              We blend technical excellence with creative vision to deliver solutions that not only work but inspire.
            </p>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-gray-700 font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-32 h-32 bg-[#5f7fff] rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-gray-500 rounded-full blur-3xl" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center text-white font-mono text-sm">
              &lt; Excellence in Every Layer /&gt;
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
