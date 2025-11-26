"use client"

import { useInView } from "@/hooks/use-in-view"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CEO, TechStart India",
    content:
      "LayerNLooms transformed our vision into reality. Their attention to detail and technical expertise is unmatched.",
    avatar: "",
  },
  {
    name: "Arjun Patel",
    role: "Founder, InnovateLabs",
    content: "Working with LayerNLooms was a game-changer. They delivered on time and exceeded our expectations.",
    avatar: "",
  },
  {
    name: "Neha Gupta",
    role: "Product Lead, CloudFirst",
    content: "The team went above and beyond to ensure our product was perfect. Highly recommended!",
    avatar: "",
  },
  {
    name: "Rajesh Kumar",
    role: "CTO, DigitalFlow Solutions",
    content: "Exceptional AI integration work. They understand both business and technology deeply.",
    avatar: "",
  },
  {
    name: "Deepika Singh",
    role: "Head of Product, FinTech Innovations",
    content: "Best software development partner we've worked with. Delivered a scalable mobile app in record time.",
    avatar: "",
  },
  {
    name: "Vikram Desai",
    role: "Founder, E-commerce Pro",
    content: "Their web development expertise helped us increase conversion by 40%. Outstanding results!",
    avatar: "",
  },
]

export default function Testimonials() {
  const ref = useInView()

  return (
    <section
      ref={ref}
      className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-label="Client testimonials and reviews"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Trusted by Leading Brands</h2>
          <p className="text-gray-600 text-lg">See what our clients say about their experience with LayerNLooms</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl" aria-hidden="true">
                  {testimonial.avatar}
                </span>
              </div>
              <p className="text-gray-600 mb-6 italic" itemProp="reviewBody">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-black" itemProp="author">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm" itemProp="jobTitle">
                  {testimonial.role}
                </p>
              </div>
              <div className="flex gap-1 mt-4" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400" aria-hidden="true">
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
