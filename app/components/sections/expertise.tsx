"use client"

import type React from "react"

import { useInView } from "@/hooks/use-in-view"

interface Service {
  title: string
  description: string
  icon: React.ReactNode
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Custom websites, web apps, and dashboards built for performance and scale.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 3H4.5A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5V9.75M21 3h-5.25m0 0V21m0-18l-8.26 8.26"
        />
      </svg>
    ),
  },
  {
    title: "Mobile Development",
    description: "iOS, Android, Flutter & cross-platform solutions that users love.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "AI Solutions",
    description: "Chatbots, automation & custom LLM integrations that drive results.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Enterprise Software",
    description: "SaaS, ERP & CRM solutions tailored to your business needs.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
        />
      </svg>
    ),
  },
]

export default function Expertise() {
  const ref = useInView()

  return (
    <section id="expertise" ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Expertise</h2>
          <div className="w-16 h-1 bg-black mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-gray-50 border border-gray-200 hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-gray-950 group-hover:text-[#5f7fff] mb-4 transition-colors">{service.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
