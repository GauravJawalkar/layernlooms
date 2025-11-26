"use client"

import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"
import Ecommerce from "../../public/E-Commerce.png"
import AI from "../../public/AI.png"
import SaaS from "../../public/SaaS.png"
import Cloud from "../../public/Cloud.png"
import Design from "../../public/Design.png"
import Mobile from "../../public/Mobile.png"

const projects = [
  {
    name: "E-Commerce Platform",
    tags: ["UI/UX", "Web", "Performance"],
    description: "High-performance shopping experience built with Next.js",
    image: Ecommerce,
  },
  {
    name: "Mobile Banking App",
    tags: ["Mobile", "iOS", "Android"],
    description: "Secure financial management app with real-time updates",
    image: Mobile,
  },
  {
    name: "AI Chat Assistant",
    tags: ["AI", "NLP", "Web"],
    description: "Intelligent customer support powered by LLMs",
    image: AI,
  },
  {
    name: "SaaS Analytics",
    tags: ["SaaS", "Dashboard", "Data Viz"],
    description: "Real-time analytics and insights platform",
    image: SaaS,
  },
  {
    name: "Cloud Infrastructure",
    tags: ["Backend", "DevOps", "Scalable"],
    description: "Enterprise-grade cloud solution",
    image: Cloud,
  },
  {
    name: "Design System",
    tags: ["UI Kit", "Components", "Documentation"],
    description: "Comprehensive component library and design tokens",
    image: Design,
  },
]

export default function Portfolio() {
  const ref = useInView()

  return (
    <section id="portfolio" ref={ref} className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Work</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A showcase of projects that demonstrate our commitment to excellence and innovation.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-lg text-black mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 text-black font-medium text-sm hover:text-gray-600 transition-colors cursor-pointer">
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
